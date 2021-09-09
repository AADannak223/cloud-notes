const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../models/middleware/fetchuser')

const JWT_SECRET = 'helloworl@d';

//Create a user using: POST "/api/auth/createuser". Doesn't required auth
router.post('/createuser', [
    body('name', 'Enter valid name').isLength({ min: 3 }), //name validation
    body('email', 'Enter valid email').isEmail(), //email validation  
    body.apply('password').isLength({ min: 5 }) //password validation
], async(req, res) => {
    //If there are errors ruturn bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // check wheather the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "sorry a user with this email already exist" });
        }

        const salt = bcrypt.genSaltSync(10);
        const secpass = await bcrypt.hash(req.body.password, salt);

        const nuser = await User.create({ //Creating user
            name: req.body.name,
            email: req.body.email,
            password: secpass,
        })

        const data = {
            user: {
                id: nuser.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET); //creating auth token using id as a data

        res.json(authtoken)
    } catch (error) {
        console.error(error.massage);
        res.status(500).send("Internal server error");
    }
})



//Create a user using: POST "/api/auth/login". Doesn't required auth

router.post('/login', [
    body('email', 'Please enter valid email').isEmail(), //email validation  
    body.apply('password can not be blank').exists() //password validation
], async(req, res) => {

    //If there are errors ruturn bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body
        // check wheather the user with this email exists already
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ errors: "Please try to loin with correct credentials" });
        }

        const passcompare = await bcrypt.compare(password, user.password)
        if (!passcompare) {
            return res.status(400).json({ errors: "Please try to loin with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET); //creating auth token using id as a data
        res.json(authtoken)


    } catch (error) {
        console.error(error.massage);
        res.status(500).send("Internal server error");
    }
})


//Create a user using: POST "/api/auth/fetchuser". Doesn't required auth
router.post('/fetchuser', fetchuser, async(req, res) => {

    try {
        const userId = req.user.id
        const user = await User.findById(userId).select('-password')
        res.json(user)
    } catch (error) {
        console.error(error.massage);
        res.status(500).send("Internal server error")

    }
})
module.exports = router
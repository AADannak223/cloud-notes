const jwt = require('jsonwebtoken');
const JWT_SECRET = 'helloworl@d';

//Get the user from jwt token and add id to req obj
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET); //get data(id) from jwt using token & JWT_SECRET
        req.user = data.user
        next();

    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}
module.exports = fetchuser
import React, { useState } from 'react'
import { useHistory } from 'react-router';

const Signup = (props) => {
    const history = useHistory();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cPassword: "" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }
    const { name, email, password } = credentials
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json)

        if (json.success) {
            localStorage.setItem("tokan", json.authtoken)
            history.push("/");
            props.showAlert("Account created successfully", "success");
        }
        else {
            props.showAlert("Invalid details", "danger");
        }
    }
    return (

        <div className="container mt-3">
            <h2 className="my-3">Create an Account to use Cloudnotes</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input onChange={onChange} type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={onChange} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" minLength={5} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange} type="password" className="form-control" name="password" id="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input onChange={onChange} type="password" className="form-control" name="cpassword" id="cpassword" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>

    )
}

export default Signup

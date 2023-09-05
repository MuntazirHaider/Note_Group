const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const loggeduser = require('../middleware/loggeduser')

const JWT_SECRET = "GreatestOfAllTime";

// Route:1 - Create a new user "/auth/SignUp"    (No Login Required)
router.post('/SignUp', [
    // use express validator to check the correct input from new user
    body('userName', 'The Length of NAME must be atleast 2').isLength({ min: 2, max: 30 }),
    body('email', 'Please enter a valid Email').isEmail(),
    body('password', 'The Length of Password must be atleast 6').isLength({ min: 6, max: 20 })
], async (req, res) => {
    let success = false;
    // if input is not valid return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }

    try {
        // checking if same username or email is already exist
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            if (user.email === req.body.email) {
                return res.status(400).json({ success,error: "Sorry a user with this email is already exist" })
            }
        }
        user = await User.findOne({ userName: req.body.userName });
        if (user) {
            if (user.userName === req.body.userName) {
                return res.status(400).json({ success,error: "Sorry a user with this username is already exist" })
            }
        }
        // secure password by generating salt and hash of password
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
        // create a new user if every thing is good
        user = await User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: secPassword
        });
        // get user id to send to create auth token
        const data = {
            user: {
                id: user.id
            }
        }
        // sign the document by user id jwt secret key
        const authToken = jwt.sign(data, JWT_SECRET);
        let success = true;
        // send token to the user
        res.json({ success,authToken })
        // catch if some errors occured 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Error Occured")
    }
})


// Route:2 - Authenticate a user for login "/auth/LogIn"    (No Login Required)
router.post('/LogIn', [
    // use express validator to check the correct input user
    body('email', 'Please enter a valid Email').isEmail(),
    body('password', 'Password is required').exists()
], async (req, res) => {
    let success = false;
    // if input is not valid return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        // checking the user exist or not
        let user = await User.findOne({ email });
        // if user not found send bad request
        if (!user) {
            return res.status(400).json({ success,error: "Please try to login with correct credentials" });
        }
        // if user exist comapre store user password and input password
        const comparePassword = await bcrypt.compare(password, user.password);
        // if password not match send bad request
        if (!comparePassword) {
            return res.status(400).json({ success,error: "Please try to login with correct credentials" });
        }
        // get user id to send the auth token
        const data = {
            user: {
                id: user.id
            }
        }
        // sign the document by user id jwt secret key
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        // send token to the user
        res.json({ success,authToken })
        // catch if some errors occured 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Error Occured")
    }
})


// Route:3 - Get loged in user detail "/auth/getuser"    (Login Required)
router.get('/getuser',loggeduser,async (req, res) => {
    try {
        // middleware take req object and give user id 
        const userId = req.user.id;
        // find the user by id
        const user = await User.findById(userId).select("-password")
        // send the user detail expect password
        res.send(user)
        // catch if some errors occured 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Error Occured")
    }
})


module.exports = router
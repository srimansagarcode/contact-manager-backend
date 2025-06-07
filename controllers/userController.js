const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//@Dec register user
//@route /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are Mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }
    const hasPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hasPassword
    });
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({ message: "User Registered" })
});

//@Des login user
//@route /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    // username and password from req.body
    // check the values of username and password
    // check the username exists or not 
    // compare password with stored password and jwt.
    // 

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Fields are mandatory");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
            process.env.ACCESS_TOKEN_SECERT,
            {
                expiresIn: '10m'
            }
        )
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email or Pasword are not valid");
    }
})

//@Desc current user
//@route /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Current user Information" })
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}


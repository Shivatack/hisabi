require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const User = require("./model/user");

const app = express();

app.use(express.json());

app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌");
});

// Register
app.post("/register", async (req, res) => {
    try {
        // Get user input
        const { firstname, lastname, email, password, birthdate } = req.body;

        // Validate user input
        if (!(email && password && firstname && lastname && birthdate)) {
            return res.status(400).send(JSON.stringify({message: "All input is required!"}));
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send(JSON.stringify({message: "User Already Exist. Please Login!"}));
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            firstname,
            lastname,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            birthdate
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
            return res.status(400).send(JSON.stringify({message: "All input is required!"}));
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                { expiresIn: "2h" }
            );

            // save user token
            user.token = token;

            // user
            return res.status(200).json(user);
        } else {
            return res.status(400).send(JSON.stringify({message: "Invalid Credentials!"}));
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = app;
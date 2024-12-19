require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middleware");
const cors = require("cors")
const router = express.Router();

// USER SIGN UP
// USER SIGN UP
router.use(cors())
const signupBody = zod.object({
    username: zod.string(),
    email: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});


// User signup route
router.post('/signup', async (req, res) => {
    const { username, email, firstName, lastName, password } = req.body;

    try {
        console.log('Received signup request:', req.body);

        // Check if a user with the same email or username already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            console.log('User already exists:', existingUser);
            return res.status(409).json({
                message: 'User already exists with that email or username'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('Creating new user...');
        const newUser = await User.create({
            username,
            email,
            firstName,
            lastName,
            password: hashedPassword,
        });

        console.log('User created:', newUser);

        // Create a corresponding account
        const newAccount = await Account.create({
            userId: newUser._id,
            balance: Math.random() * 1000 + 1,
        });

        console.log('Account created with balance:', newAccount.balance);

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

        res.status(201).json({
            message: 'User created successfully',
            token,
        });
    } catch (err) {
        console.error('Signup Error:', err.message);
        res.status(500).json({
            message: 'Internal server error',
            error: err.message
        });
    }
});


// USER SIGN IN

const signinBody = zod.object({
    username: zod.string(),
    password: zod.string(),
});

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Incorrect input data",
        });
    }

    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(404).json("User not found!");
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(401).json("Wrong credentials!");
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET
        );

        res.status(200).json({
            token: token,
        });
    } catch (err) {
        console.error('Signin Error:', err.message);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// FOR UPDATING USER INFO

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Error while updating information",
        });
    }

    try {
        await User.updateOne({ _id: req.userId }, req.body);

        res.status(200).json({
            message: "Updated successfully",
        });
    } catch (err) {
        console.error('Update Error:', err.message);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// FOR GETTING USERS WITH FILTER QUERY

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    try {
        const users = await User.find({
            $or: [
                { firstName: { $regex: filter, $options: "i" } },
                { lastName: { $regex: filter, $options: "i" } },
            ],
        });

        res.status(200).json({
            users: users.map((user) => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id,
            })),
        });
    } catch (err) {
        console.error('Bulk Fetch Error:', err.message);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// FOR GETTING CURRENT USER INFO

// New Route for Fetching Authenticated User
router.get("/getUser", authMiddleware, async (req, res) => {
    const user = await User.findOne({
      _id: req.userId,
    });
    res.json(user);
  });
  

module.exports = router;

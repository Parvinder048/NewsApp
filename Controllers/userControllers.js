const Users = require("../models/userModel");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// let opt = null;

// const verifyOtp = ()=>{

// }

const sendmail = async(req,res)=>{
 
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "parvinder00031@gmail.com",
    pass: "phzd yvdw ukyn mhks",
  },
});

// Wrap in an async IIFE so we can use await.
(async () => {
  const info = await transporter.sendMail({
    from: '"Parvinder" <parvinder00031gmail.com>',
    to: req.body.email,
    subject: "Hello ✔",
    text: "otp is generated", // plain‑text body
    html: "<h1>249006</h1>", // HTML body
  });

  res.send("Message sent:",+ info.messageId);
})();

}


// ✅ GET all users
const getAllUsers = async (req, res) => {
    try {
        const data = await Users.find();
        return res.status(200).send(data); // 200 OK
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error" });
    }
};

const verifyToken = async (req, res) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).send({ message: "No token provided" });
    }

    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, "thisisyoursecuritykey");
    const user = await Users.findById(decoded.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // ✅ Return verified user
    return res.status(200).send(user);
  } catch (err) {
    console.error(err);
    return res.status(401).send({ message: "Invalid or expired token" });
  }
};


// ✅ ADD a new user (Register)
const addedUser = async (req, res, next) => {
    try {
        const result = validationResult(req);
        const errors = result.errors;
        const err = errors.map((ele) => ele.msg);


        if (errors.length > 0) {
            // return res.status(400).send({ message: "Validation failed", errors: err }); // 400 Bad Request
          return next(new Error[0]);
        }

        const data = req.body;

        // Check if user already exists
        const existingUser = await Users.findOne({ email: data.email });
        if (existingUser) {
            return next(new Error("User already registered, please login"));
                // .status(409) // 409 Conflict
                // .send({ message: "User already registered, please login" });
        }

        // Hash password
        const hashPassword = bcrypt.hashSync(data.password, 10);

        // Create new user
        const newUser = await Users.create({ ...data, password: hashPassword });

        return res.status(201).send({
            message: "User registered successfully",
            user: newUser,
        }); // 201 Created
    } catch (err) {
        next(new Error(err.message));
    }
};

// ✅ LOGIN user
const loginUser = async (req, res) => {
    try {
        const data = req.body;

        // Check if user exists
        const existingUser = await Users.findOne({ email: data.email });
        if (!existingUser) {
            return res.status(404).send({ message: "No user found with this email" }); // 404 Not Found
        }

        // Compare password
        const result = await bcrypt.compare(data.password, existingUser.password);
        if (!result) {
            return res.status(401).send({ message: "Wrong password" }); // 401 Unauthorized
        }

        // Generate JWT token
        const token = jwt.sign({ id: existingUser._id },"thisisyoursecuritykey");

        return res.send({
            message: "Login successful",
            user: existingUser,
            token:token
        }); // 200 OK
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Internal server error" });
    }
};

// ✅ UPDATE user
const updatedUser = async (req, res) => {
    try {
        const id = req.query.id;
        const data = req.body;

        const updatedUser = await Users.findByIdAndUpdate(id, data, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ message: "No user found to update" }); // 404 Not Found
        }

        return res.status(200).send({
            message: "User updated successfully",
            user: updatedUser,
        }); // 200 OK
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Internal server error" });
    }
};

// ✅ DELETE user
const deletedUser = async (req, res) => {
    try {
        const id = req.query.id;

        const deletedUser = await Users.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).send({ message: "No user found to delete" }); // 404 Not Found
        }

        return res.status(200).send({ message: "User deleted successfully" }); // 200 OK
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Internal server error" });
    }
};

module.exports = {
    getAllUsers,
    addedUser,
    loginUser,
    updatedUser,
    deletedUser,
    verifyToken,
    sendmail,
};

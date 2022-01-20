var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// Load User model
const User = require("../models/Users");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {

    const email = req.body.email;

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: "User already exists" });
            const newUser = new User({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                contact_number: req.body.contact_number,
                password: req.body.password,
                age: req.body.age,
                batch: req.body.batch,
                wallet_balance: req.body.wallet_balance
            });

            //create and salt hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { email: user.email },
                                config.get("jwtSecret"),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.status(200).json({
                                        token,
                                        user: {
                                            id: user.id,
                                            email: user.email
                                        }
                                    });

                                }
                            )


                            // res.send("Sign up successful");
                        })
                        .catch(err => {
                            res.status(400).send(err);
                        });
                })
            })

        })



    // console.log(req.body)



});

// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.send("Email Found");
            return user;
        }
    });
});

router.delete("/:id", (req, res) => {
    User.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;


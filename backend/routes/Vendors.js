var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const Vendor = require("../models/Vendors");
const auth = require("../middleware/auth");

// GET request 
// Getting all the vendors
router.get("/", function (req, res) {
    Vendor.find(function (err, vendors) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
    })
});

// POST request 
// Add a vendor to db
router.post("/register", (req, res) => {
    const email = req.body.email;

    Vendor.findOne({ email })
        .then(vendor => {
            if (vendor) return res.status(400).json({ msg: "Vendor already exists" });
            const newVendor = new Vendor({
                manager_fname: req.body.manager_fname,
                manager_lname: req.body.manager_lname,
                shop_name: req.body.shop_name,
                email: req.body.email,
                password: req.body.password,
                contact_number: req.body.contact_number,
                opening_time: req.body.opening_time,
                closing_time: req.body.closing_time
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newVendor.password, salt, (err, hash) => {
                    if (err) throw err;
                    newVendor.password = hash;
                    newVendor.save()
                        .then(vendor => {

                            jwt.sign(
                                { email: vendor.email },
                                config.get("jwtSecret"),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.status(200).json({
                                        token,
                                        vendor: {
                                            id: vendor.id,
                                            email: vendor.email
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

});

router.get("/vendordetails", auth, function (req, res) {
    const token = req.header("auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    email = decoded.email;
    Vendor.findOne({ email })
        .then(vendor => {
            if (!vendor) {
                return res.status(400).json({ msg: "Vendor doesn't exist" });
            }
            res.status(200).json(vendor)
        })
});

router.post("/update", auth, (req, res) => {

    const token = req.header("auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    email = decoded.email;

    Vendor.findOne({ email })
        .then(vendor => {
            if (!req.body.password) return res.status(400).json({ msg: "Invalid" });
            if (!vendor) return res.status(400).json({ msg: "Vendor doesn't exist" });
            var new_pass = req.body.password;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(new_pass, salt, (err, hash) => {
                    if (err) throw err;
                    console.log(new_pass);
                    new_pass = hash;
                    console.log("changed? : " + new_pass)
                    console.log("now : " + new_pass);

                    var myquery = { email: email };
                    var newvalues = {
                        $set: {
                            manager_fname: req.body.manager_fname,
                            manager_lname: req.body.manager_lname,
                            contact_number: req.body.contact_number,
                            password: new_pass,
                            shop_name: req.body.shop_name,
                            opening_time: req.body.opening_time,
                            closing_time: req.body.closing_time
                        }
                    };
                    Vendor.updateOne(myquery, newvalues, function (err, res) {
                        if (err) throw err;
                    })
                    res.status(200).json({ msg: "details updated" });
                    console.log("details updated");
                })

            })

        })



    // console.log(req.body)



});

router.delete("/:id", (req, res) => {
    Vendor.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
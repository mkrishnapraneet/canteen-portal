var express = require("express");
var router = express.Router();

const Vendor = require("../models/Vendors");

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
    const newVendor = new Vendor({
        manager_fname: req.body.manager_fname,
        manager_lname: req.body.manager_lname,
        shop_name: req.body.shop_name,
        email: req.body.email,
        contact_number: req.body.contact_number,
        opening_time: req.body.opening_time,
        closing_time: req.body.closing_time
    });

    newVendor.save()
        .then(vendor => {
            res.status(200).json(vendor);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    // Find vendor by email
    Vendor.findOne({ email }).then(vendor => {
        // Check if vendor email exists
        if (!vendor) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.send("Email Found");
            return vendor;
        }
    });
});

router.delete("/:id", (req, res) => {
    Vendor.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
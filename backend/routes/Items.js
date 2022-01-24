var express = require("express");
var router = express.Router();

const Item = require("../models/Items");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const Vendor = require("../models/Vendors");

// GET request 
// Getting all the items
router.get("/", auth, function (req, res) {
    Item.find(function (err, items) {
        if (err) {
            console.log(err);
        } else {
            res.json(items);
        }
    })
});

router.get("/shop_items", auth, function (req, res) {
    const token = req.header("auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    email = decoded.email;
    Vendor.findOne({ email })
        .then(vendor => {
            if (!vendor) {
                return res.status(400).json({ msg: "Vendor doesn't exist" });
            }
            // res.status(200).json(vendor)
            else {
                const sh_name = vendor.shop_name;
                console.log(sh_name);
                Item.find({ shop_name: sh_name })
                    .then(items => {
                        console.log(sh_name);

                        res.json(items);

                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send(err);
                    });

            }
        })

});

router.post("/delete_item", auth, function (req, res) {
    const token = req.header("auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    email = decoded.email;
    Vendor.findOne({ email })
        .then(vendor => {
            if (!vendor) {
                return res.status(400).json({ msg: "Vendor doesn't exist" });
            }
            // res.status(200).json(vendor)
            else {
                const sh_name = vendor.shop_name;
                console.log(sh_name);
                Item.findOne({
                    shop_name: sh_name,
                    item_name: req.body.item_name
                })
                    .then(item_to_delete => {
                        console.log(item_to_delete);
                        item_to_delete.remove()
                            .then(() => {
                                res.json({ success: true })
                            })
                        // res.json(items);


                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send(err);
                    });

            }
        })

});

router.post("/itemdetails", auth, function (req, res) {
    const token = req.header("auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    email = decoded.email;
    Vendor.findOne({ email })
        .then(vendor => {
            if (!vendor) {
                return res.status(400).json({ msg: "Vendor doesn't exist" });
            }
            // res.status(200).json(vendor)
            else {
                const sh_name = vendor.shop_name;
                console.log(sh_name);
                Item.findOne({
                    shop_name: sh_name,
                    item_name: req.body.item_name
                })
                    .then(item => {
                        console.log(item);
                        res.json(item);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send(err);
                    });

            }
        })

});

router.post("/update_item", auth, function (req, res) {
    const token = req.header("auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    email = decoded.email;
    Vendor.findOne({ email })
        .then(vendor => {
            if (!vendor) {
                return res.status(400).json({ msg: "Vendor doesn't exist" });
            }
            // res.status(200).json(vendor)
            else {
                const sh_name = vendor.shop_name;
                console.log(sh_name);

                var myquery = { shop_name: sh_name, item_name: req.body.old_item_name };
                var newvalues = {
                    $set: {
                        item_name: req.body.item_name,
                        price: req.body.price,
                        veg: req.body.veg,
                        tags: req.body.tags,
                        addons: req.body.addons
                    }
                }

                Item.updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                })
                res.status(200).json({ msg: "details updated" });
                console.log("details updated");

            }
        })

});

router.post("/update_item_forfav", auth, function (req, res) {

    const sh_name = req.body.shop_name;
    console.log(sh_name);

    var myquery = { shop_name: sh_name, item_name: req.body.item_name };
    var newvalues = {
        $set: {
            favourites: req.body.favourites
        }
    }

    Item.updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
    })
    res.status(200).json({ msg: "details updated" });
    console.log("details updated");



});

// POST request 
// Add a item to db
router.post("/register", (req, res) => {
    const newItem = new Item({

        shop_name: req.body.shop_name,
        item_name: req.body.item_name,
        price: req.body.price,
        // rating: req.body.rating,
        veg: req.body.veg,
        tags: req.body.tags,
        addons: req.body.addons
    });

    newItem.save()
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// // POST request 
// // Login
// router.post("/login", (req, res) => {
//     const email = req.body.email;
//     // Find item by email
//     Item.findOne({ email }).then(item => {
//         // Check if item email exists
//         if (!item) {
//             return res.status(404).json({
//                 error: "Email not found",
//             });
//         }
//         else {
//             res.send("Email Found");
//             return item;
//         }
//     });
// });

router.delete("/:id", (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
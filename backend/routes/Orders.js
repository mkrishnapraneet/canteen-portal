var express = require("express");
var router = express.Router();

const Item = require("../models/Items");
const Order = require("../models/Orders");
const Vendor = require("../models/Vendors");
const User = require("../models/Users");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

router.post("/register", auth, (req, res) => {
    const token = req.header("auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    user_email = decoded.email;

    User.findOne({ email: user_email })
        .then(user => {
            if (user.wallet_balance < req.body.cost) {
                return res.status(400).json({ msg: "Insufficient Balance" });
            }
            else {
                var prev_balance = user.wallet_balance;
                var final_balance = prev_balance - req.body.cost;
                var myquery = { email: user_email };
                var newvalues = {
                    wallet_balance: final_balance
                }
                User.updateOne(myquery, newvalues, function (err, response) {
                    if (err) throw err;
                    else {
                        const newOrder = new Order({

                            shop_name: req.body.shop_name,
                            item_name: req.body.item_name,
                            cost: req.body.cost,
                            user_email: user_email,
                            placed_time: req.body.placed_time,
                            quantity: req.body.quantity,
                            status: req.body.status,
                            rating: -1*1,
                            veg: req.body.veg,
                            tags: req.body.tags,
                            addons: req.body.addons
                        });

                        newOrder.save()
                            .then(order => {
                                res.status(200).json(order);
                            })
                            .catch(err => {
                                res.status(400).send(err);
                            });
                    }
                })

            }
        })


});

router.get("/user_orders", auth, function (req, res) {
    const token = req.header("auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    user_email = decoded.email;
    User.findOne({ email: user_email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ msg: "User doesn't exist" });
            }
            // res.status(200).json(vendor)
            else {
                // const sh_name = vendor.shop_name;
                console.log(user_email);
                Order.find({ user_email: user_email })
                    .then(orders => {
                        // console.log(sh_name);

                        res.json(orders);

                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send(err);
                    });

            }
        })

});

router.get("/vendor_orders", auth, function (req, res) {
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
                Order.find({ shop_name: sh_name })
                    .then(orders => {
                        // console.log(sh_name);

                        res.json(orders);

                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send(err);
                    });

            }
        })

});

router.post("/update_order_vendor", auth, function (req, res) {
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

                var myquery = { shop_name: sh_name, item_name: req.body.item_name, user_email: req.body.user_email, placed_time: req.body.placed_time };
                var newvalues = {
                    $set: {
                        status: req.body.status
                    }
                }

                Order.updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                })
                res.status(200).json({ msg: "details updated" });
                console.log("details updated");

            }
        })

});

router.post("/update_order_user", auth, function (req, res) {
    const token = req.header("auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    email = decoded.email;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ msg: "User doesn't exist" });
            }
            // res.status(200).json(vendor)
            else {
                // const sh_name = vendor.shop_name;
                // console.log(sh_name);

                var myquery = { shop_name: req.body.shop_name, item_name: req.body.item_name, user_email: email, placed_time: req.body.placed_time };
                var newvalues = {
                    $set: {
                        status: req.body.status
                    }
                }

                Order.updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                })
                res.status(200).json({ msg: "details updated" });
                console.log("details updated");

            }
        })

});



module.exports = router;

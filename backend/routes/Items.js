var express = require("express");
var router = express.Router();

const Item = require("../models/Items");
const auth = require("../middleware/auth");

// GET request 
// Getting all the items
router.get("/", function (req, res) {
    Item.find(function (err, items) {
        if (err) {
            console.log(err);
        } else {
            res.json(items);
        }
    })
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
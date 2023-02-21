const router = require("express").Router();
const User = require("../models/User.model");
const Warranty = require("../models/Warranty.model");
const Item = require("../models/Item.model");


router.get("/item/:itemId/create-warranty", async (req, res, next) => {
    try {
        const allWarranties = await Warranty.find();
        res.render("/:itemID", { allWarranties });
    } catch (error) {
        next(error);
    }
});

router.post("/item/:itemId/create-warranty", async (req, res, next) => {
    try {
        const { builderWarranty, sellerWarranty, paymentWarranty, insuranceWarranty } = req.body;

        await Warranty.create({ builderWarranty, sellerWarranty, paymentWarranty, insuranceWarranty });
        res.redirect("/:itemId");
    } catch (error) {
        next(error);
    }
});


router.get("/item/:itemId/edit-item/edit-warranty", async (req, res, next) => {
    try {
        const oneWarranty = await Warranty.findById(req.params.id);
        const allItems = await Item.find();

        // mongoose stores the actual document inside document._doc, and only allows us to access it through a getter function. this is a hacky way to retrieve the actual document and edit it
        const mappedCelebrities = allCelebrities.map(celeb => celeb._doc);

        mappedItems.forEach(purch => {
            oneWarranty.forEach(acqui => {
                if (purch._id.equals(acqui._id)) {
                    purch.isSelected = true;
                }
            });
        });
        res.render("/item/:itemId", { allItems: mappedItems, oneWarranty });
    } catch (error) {
        next(error);
    }
});

router.post("/item/:itemId/edit-item/edit-warranty", async (req, res, next) => {
    try {
        const { builderWarranty, sellerWarranty, paymentWarranty, insuranceWarranty } = req.body;

        await Warranty.findByIdAndUpdate(req.params.id, { builderWarranty, sellerWarranty, paymentWarranty, insuranceWarranty });
        res.redirect("/itemId");
    } catch (error) {
        next(error);
    }
});

router.post('/item/itemId/edit-item/edit-warranty', async (req, res, next) => {
    try {
        await Warranty.findByIdAndDelete(req.params.warrantyId)
        res.redirect('/item/:itemId/edit-item')
    } catch (error) {
        next(error)
    }
})


module.exports = router;
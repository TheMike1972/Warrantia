const router = require("express").Router();
const User = require("../models/User.model");
const Warranty = require("../models/Warranty.model");
const Item = require("../models/Item.model");
const warrantyExpirationDate = require('../public/js/expiration-date')

// to create

router.get("/:itemId/create-warranty", async (req, res, next) => {
    try {
        const oneItem = await Item.findOne({ _id: req.params.itemId, owner: req.session.currentUser._id });
        res.render("warranty/new-warranty", { oneItem });
    } catch (error) {
        next(error);
    }
});

router.post("/:itemId/create-warranty", async (req, res, next) => {
    const { warrantyType, durationInMonths, provider, policyImg } = req.body;
    try {
        await Warranty.create({ product: req.params.itemId, creator: req.session.currentUser._id, warrantyType, durationInMonths, provider, policyImg });
        // await warrantyExpirationDate(req.params.itemId)
        res.redirect(`/items/${req.params.itemId}`);
    } catch (error) {
        next(error);
    }
});

// to read
router.get('/:id', async (req, res, next) => {
    try {
        const warrantyDetails = await Warranty.findOne({ _id: req.params.id, creator: req.session.currentUser._id }).populate('product');
        res.render('warranty/warranty-details', { warrantyDetails });
    } catch (error) {
        next(error);
    }
});

// to modify warranty

router.get("/:warrantyId/edit-warranty", async (req, res, next) => {
    try {
        const oneWarranty = await Warranty.findOne({ _id: req.params.warrantyId, creator: req.session.currentUser._id }).populate('product');
        res.render('warranty/edit-warranty', { oneWarranty });
    } catch (error) {
        next(error);
    }
});

router.post("/:warrantyId/edit-warranty", async (req, res, next) => {
    try {
        const { warrantyType, durationInMonths, provider, policyImg } = req.body;

        const updatedItem = await Warranty.findOneAndUpdate({ _id: req.params.warrantyId, creator: req.session.currentUser._id }, { warrantyType, durationInMonths, provider, policyImg });
        res.redirect(`/items/${updatedItem._id}`);
    } catch (error) {
        next(error);
    }
});

// to delete

router.post('/:warrantyId/delete', async (req, res, next) => {
    try {
        await Warranty.findOneAndDelete({ _id: req.params.warrantyId, creator: req.session.currentUser._id })
        res.redirect('/items')
    } catch (error) {
        next(error)
    }
})

module.exports = router;
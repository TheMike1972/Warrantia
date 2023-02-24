const router = require("express").Router();
const User = require("../models/User.model");
const Warranty = require("../models/Warranty.model");
const Item = require("../models/Item.model");


// to create

router.get("/:itemId/create-warranty", async (req, res, next) => {
    try {
        const oneItem = await Item.findOne({ _id: req.params.itemId, owner: req.session.currentUser._id });
        const warranty = await Warranty.find({ product: oneItem._id })
        console.log(warranty)
        res.render("warranty/new-warranty", { oneItem, warranty });
    } catch (error) {
        next(error);
    }
});

router.post("/:itemId/create-warranty", async (req, res, next) => {
    const { warrantyType, durationInMonths, provider, policyImg } = req.body;
    try {
        await Warranty.create({ product: req.params.itemId, creator: req.session.currentUser._id, warrantyType, durationInMonths, provider, policyImg });
        res.redirect(`/warranty/${req.params.itemId}/create-warranty`);
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

router.get("/:itemId/edit-warranty", async (req, res, next) => {
    try {
        const warrantyToUpdate = await Warranty.find({ product: req.params.itemId, creator: req.session.currentUser._id })

        res.render('warranty/edit-warranty', { warranties: warrantyToUpdate });
    } catch (error) {
        next(error);
    }
});

router.post("/:warrantyId/edit", async (req, res, next) => {
    try {
        const { warrantyType, durationInMonths, provider, policyImg } = req.body;
        const updatedItem = await Warranty.findOneAndUpdate({ _id: req.params.warrantyId, creator: req.session.currentUser._id }, { warrantyType, durationInMonths, provider, policyImg });
        res.redirect(`/items/${updatedItem.product._id}`);
    } catch (error) {
        next(error);
    }
});

// to delete

router.post('/:warrantyId/delete', async (req, res, next) => {
    try {
        await Warranty.findOneAndDelete({ _id: req.params.warrantyId, creator: req.session.currentUser._id })
        res.render('items/items')
    } catch (error) {
        next(error)
    }
})

module.exports = router;
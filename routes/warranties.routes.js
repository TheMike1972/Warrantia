const router = require("express").Router();
const User = require("../models/User.model");
const Warranty = require("../models/Warranty.model");
const Item = require("../models/Item.model");
const warrantyExpirationDate = require('../public/js/expiration-date')

// to create

router.get("/:itemId/create-warranty", async (req, res, next) => {
    try {
        const allItems = await Item.find();
        res.render("/warranties/new-warranty", { allItems });
    } catch (error) {
        next(error);
    }
});

router.post("/:itemId/create-warranty", async (req, res, next) => {
    const { product, warrantyType, durationInMonths, provider, policyImg } = req.body;
    try {
        await Warranty.create({ product, warrantyType, durationInMonths, provider, policyImg });
        // await warrantyExpirationDate(req.params.itemId)
        res.redirect("/:itemId");
    } catch (error) {
        next(error);
    }
});

// to read
router.get('/:id', async (req, res, next) => {
    try {
        const warrantyDetails = await Warranty.findOne({ _id: req.params.id }).populate('product');
        res.render('/warranty/warranty-details', { warrantyDetails });
        //res.send({ movieDetails });
    } catch (error) {
        next(error);
    }
});

// pour l'édition

router.get("/items/:itemId/edit-item/edit-warranty", async (req, res, next) => {
    try {
        const oneWarranty = await Warranty.findById(req.params.id);
        const allItems = await Item.find();

        // mongoose stores the actual document inside document._doc, and only allows us to access it through a getter function. this is a hacky way to retrieve the actual document and edit it
        const mappedItems = allItemss.map(it => it._doc);

        mappedItems.forEach(it => {
            oneWarranty.forEach(acqui => {
                if (it._id.equals(acqui._id)) {
                    it.isSelected = true;
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
        const { product, warrantyType, durationInMonths, provider, policyImg } = req.body;

        await Warranty.findByIdAndUpdate(req.params.id, { product, warrantyType, durationInMonths, provider, policyImg });
        res.redirect("/item/itemId");
    } catch (error) {
        next(error);
    }
});

// to delete

router.post('/:itemId/edit-warranty', async (req, res, next) => {
    try {
        await Warranty.findByIdAndDelete(req.params.warrantyId)
        res.redirect('/:itemId/edit-item')
    } catch (error) {
        next(error)
    }
})

module.exports = router;
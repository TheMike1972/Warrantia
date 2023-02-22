const router = require('express').Router();
const Item = require('../models/Item.model');

router.get('/', async (req, res, next) => {
    try {
        const allItems = await Item.find({ owner: req.session.currentUser._id });
        res.render('items/items', { allItems });
    } catch (error) {
        next(error);
    }
});

router.get('/create', (req, res, next) => {
    try {
        res.render('items/new-item');
    } catch (error) {
        next(error);
    }
});

router.post('/create', async (req, res, next) => {
    try {
        const { category, brand, name, purchaseDate, price, invoiceImg } = req.body;
        const createdItem = await Item.create({ owner: req.session.currentUser._id, category, brand, name, purchaseDate, price, invoiceImg });
        // TODO redirect to warranties with the id of the created item
        res.redirect(`/${createdItem._id}/create-warranty`);
    } catch (error) {
        next(error)
    }
});


router.get('/:itemId', async (req, res, next) => {
    console.log('in that route')
    try {
        const oneItem = await Item.findOne({ _id: req.params.itemId, owner: req.session.currentUser._id });
        res.render('items/items-details', { items: oneItem });
    } catch (error) {
        next(error)
    }
});

router.get('/:itemId/edit', async (req, res, next) => {
    try {
        const itemToUpdate = await Item.findOne({_id: req.params.itemId, owner: req.session.currentUser._id});
        res.render('items/edit-items', { itemToUpdate })
    } catch (error) {
        next(error)
    }
})

router.post('/:itemId/edit', async (req, res, next) => {
    try {
        const { category, brand, name, purchaseDate, price, invoiceImg } = req.body;
        const updatedItem = await Item.findOneAndUpdate({ _id: req.params.itemId, owner: req.session.currentUser._id }, { category, brand, name, purchaseDate, price, invoiceImg });

        if (updatedItem) {
            res.redirect(`/items/${updatedItem.id}`);
        } else {
            res.redirect('/items')
        }
    } catch (error) {
        next(error);
    }
});

router.post('/:itemId/delete', async (req, res, next) => {
    try {
        const deletedItem = await Item.findOneAndDelete({ _id: req.params.itemId, owner: req.session.currentUser._id });
        res.redirect('/items');
    } catch (error) {
        next(error)
    }
})

module.exports = router;
const router = require('express').Router();
const Item = require('../models/Item.model');

router.get('/', async (req, res, next) => {
    try {
        const allItems = await Item.find();
        res.render('item/item', { allItems });
    } catch (error) {
        next(error);
    }
});

router.get('/item/:itemId/create', (req, res, next) => {
    try {
        res.render('item/new-item');
    } catch (error) {
        next(error);
    }
});

router.post('/item/:itemId/create', async (req, res, next) => {
    try {
        const { owner, category, brand, name, purchaseDate, price, invoiceImg } = req.body;
        await Item.create({ owner, category, brand, name, purchaseDate, price, invoiceImg });
        res.redirect('/item');
    } catch (error) {
        next(error)
    }
});

router.get('/:itemId', async (req, res, next) => {
    console.log('in that route')
    try {
        const oneItem = await Item.find({_id: req.params.id, owner: req.session.currentUser._id});
        res.render('item/item-details', {oneItem});
    } catch (error) {
        next(error)
    }
});

router.post('/:itemId/edit', async(req, res, next) => {
    try {
    const {owner, category, brand, name, purchaseDate, price, invoiceImg} = req.body;
    const updatedItem = await Item.findOneAndUpdate({_id: req.params.id, owner: req.session.currentUser._id}, {owner, category, brand, name, purchaseDate, price, invoiceImg});
    
    if (updatedItem) {
        res.redirect(`/${updatedItem.id}`);
    } else {
        res.redirect('/profile')
    }
    } catch (error) {
        next(error);
    }
});

router.post('/:itemId/delete', async (req, res, next) => {
    try {
        const deletedItem = await Item.findOneAndDelete({_id: req.params.id, owner: req.session.currentUser._id});
        res.redirect('/profile');
    } catch (error) {
        next(error)
    }
})

module.exports = router;
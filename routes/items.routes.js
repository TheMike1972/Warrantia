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

router.get('/create', (req, res, next) => {
    try {
        res.render('item/new-item');
    } catch (error) {
        next(error);
    }
});

router.post('/create', async (req, res, next) => {
    try {
        const { owner, category, brand, name, purchaseDate, price, invoiceImg } = req.body;
        await Item.create({ owner, category, brand, name, purchaseDate, price, invoiceImg });
        res.redirect('/item');
    } catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    console.log('in thqt route')
    try {
        const oneItem = await Item.find({_id: req.params.id, owner: req.session.currentUser._id});
        res.render('item/item-details', {oneItem});
    } catch (error) {
        next(error)
    }
});

router.post('/:id/edit', async(req, res, next) => {
    try {
    const {owner, category, brand, name, purchaseDate, price, invoiceImg} = req.body;
    await Item.findByIdAndUpdate(req.params.id, {owner, category, brand, name, purchaseDate, price, invoiceImg});
    res.redirect('/item');
    } catch (error) {
        next(error);
    }
});

router.post('/:id/delete', async (req, res, next) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.redirect('/item');
    } catch (error) {
        next(error)
    }
})

module.exports = router;
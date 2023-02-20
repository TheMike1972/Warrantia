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
        const { productType, productBrand, productName, purchaseDate, price, warranty, invoice } = req.body;
        await Item.create({ productType, productBrand, productName, purchaseDate, price, warranty, invoice });
        res.redirect('/item');
    } catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const oneItem = await Item.findById(req.params.id);
        res.render('item/item-details', {oneItem});
    } catch (error) {
        next(error)
    }
});

router.post('/:id/edit', async(req, res, next) => {
    try {
    const {productType, productBrand, productName, purchaseDate, price, warranty, invoice} = req.body;
    await Item.findByIdAndUpdate(req.params.id, {productType, productBrand, productName, purchaseDate, price, warranty, invoice});
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
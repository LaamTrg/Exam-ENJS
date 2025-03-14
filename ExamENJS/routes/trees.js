const express = require('express');
const router = express.Router();
const Tree = require('../models/tree');

router.get('/', async (req, res) => {
    const trees = await Tree.find({});
    res.render('index', {trees});
});

router.get('/add', (req, res) => {
    res.render('add');
});

router.post('/add', async (req, res) => {
    const {treename, description, image} = req.body;
    if(!treename || !description) {
        return res.render('add', {error: 'Tree Name and Description are required'});
    }
    const newTree = new Tree({treename, description, image});
    await newTree.save();
    res.redirect('/');
});

router.post('/reset', async (req, res) => {
    await Tree.deleteMany({});
    res.redirect('/');
});

module.exports = router;
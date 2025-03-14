const express = require('express');
const router = express.Router();
const Tree = require('../models/tree');

router.get('/', async (req, res) => {
    const trees = await Tree.find({});
    res.json(trees);
});

router.post('/', async (req, res) => {
    const { treename, description, image } = req.body;
    const newTree = new Tree({ treename, description, image });
    await newTree.save();
    console.log('Tree added:', newTree);
    res.status(201).json(newTree);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { treename, description, image } = req.body;
    const updatedTree = await Tree.findByIdAndUpdate(id, { treename, description, image }, { new: true });
    res.json(updatedTree);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Tree.findByIdAndDelete(id);
    res.status(204).send();
});

router.delete('/', async (req, res) => {
    await Tree.deleteMany({});
    res.status(204).send();
});

module.exports = router;
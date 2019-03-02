const express = require("express");
const router = express.Router();
const Location = require ("../models/Location")

router.get('/', (req, res, next) =>{
    Location.find({})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(404).json({message: "Location don't found"})
    })
});

router.get('/:id', (req, res, next) =>{
    Location.findById(req.params.id)
    .populate("comments")
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(404).json({message: "Location don't found"})
    })
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Movieshow = require ("../models/Movieshow")

router.get('/', (req, res, next) =>{
    Movieshow.find({})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(404).json({message: "Movieshow don't found"})
    })
});

router.get('/:id', (req, res, next) =>{
    Movieshow.findById(req.params.id)
    .populate("locations")
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(404).json({message: "Movieshow don't found"})
    })
});



module.exports = router;
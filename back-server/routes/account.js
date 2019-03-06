const express = require("express");
const router = express.Router();
const User = require("../models/User")
const Location = require("../models/Location")

router.get('/me/favorite', (req, res, next) => {
  if (req.isAuthenticated()) {
    const userId = req.user._id;
    User.findById(userId)
      .populate("favorites")
      .then(response => {
        res.status(200).json(response.favorites)
      })
      .catch(err => {
        res.status(404).json({ message: "no user logged" })
      })
  }
})

router.post('/me/favorite', (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findByIdAndUpdate(req.user._id,
      { $push: { favorites: req.body.locationId } }
    ).then(() => {
      User.findById(req.user._id)
        .then(user => {
          res.status(200).json(user);
        })
    }).catch(err => {
      console.log(err)
      res.status(404).json({ message: "User no update" });
    });
  }
})

router.delete('/me/favorite/:id', (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findByIdAndUpdate(req.user._id,
      { $pull: { favorites: req.params.id } })
      .then(() => {
        User.findById(req.user._id)
        .then(user => {
          res.status(200).json(user);
        })
      })
      .catch(err => {
        console.log(err)
        res.status(404).json({ message: "User no update" });
      });
  }
})

module.exports = router;


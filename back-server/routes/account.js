const express = require("express");
const router = express.Router();
const User = require("../models/User")
const Location = require("../models/Location")

router.get('/me/favorite', (req, res, next) => {
  if (req.isAuthenticated()) {
    const userId = req.user._id;
    User.findById(userId)
      .then(response => {
        res.status(200).json(response.favorites)
      })
      .catch(err => {
        res.status(404).json({ message: "no user logged" })
      })
  }
})



module.exports = router;
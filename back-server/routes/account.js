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

router.post('/me/favorite', (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findByIdAndUpdate(req.user._id,
      {$push: {favorites: req.body.locationId }}
      ).then((favorites) => {
        res.status(200).json(favorites);
      }).catch(err => {
        console.log(err)
        res.status(404).json({ message: "User no update" });
      });
  }

  router.post('/me/favorite/:id', (req, res, next) => {
    if (req.isAuthenticated()) {
      const favoriteId = req.body._id;
      console.log(req.body.id)
      User.findByIdAndRemove(req.user._id, 
        {$pull: {favorites: req.body.locationId}})

    }
  })
})

module.exports = router;


// router.get("/favorite/remove/:id", (req, res, next) => {
//   const id = req.params.id;
//   Product.findById(id)
//     .then(product => {
//       User.update( {_id: req.user._id}, 
//       {$pull: {favorites: product} })
//       .then(() => {
//         res.redirect(req.headers.referer) //actualiza la url de donde vienes.
//       })
//       .catch(err => {
//         console.log("The error has occurred", err);
//       });
//     })
//     .catch(err => {
//       console.log("The error has occurred", err);
//     });
// });
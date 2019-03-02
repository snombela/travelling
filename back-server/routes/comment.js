const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Location = require("../models/Location");

router.post("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.create({ content: req.body.content, title: req.body.title, authorId: req.user._id })
      .then(comment => {
          Location.findByIdAndUpdate(req.body.locationId,
            {$push: {comments: comment._id}}
            ).then(newLocation => {
                res.status(200).json(comment);
            }).catch(err => {
                console.log(err)
                res.status(404).json({ message: "Location no update" });
              });
      })
      .catch(err => {
          console.log(err)
        res.status(404).json({ message: "Comment doesn't create" });
      });
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
});

module.exports = router;

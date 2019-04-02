const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Location = require("../models/Location")

router.post("/comment", (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.create({ content: req.body.content, title: req.body.title, userId: req.user._id })
      .then(comment => {
        Location.findByIdAndUpdate(req.body.locationId,
          { $push: { comments: comment._id } }
        ).then(() => {
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

router.delete("/comment/:commentId", (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.commentId)
      .then(comment => {
        if (comment.userId.equals(req.user._id)) {
          Comment.findByIdAndDelete(req.params.commentId)
            .then(() => {
              res.status(200).json({ message: "The comment has deleted successfully!" });
            }).catch(err => {
              console.log(err)
              res.status(404).json({ message: "An error has occurred!" });
            });
        } else {
          res.status(403).json({ message: "This user isn't authorized" });
        }
      })
      .catch(err => {
        console.log(err)
        res.status(404).json({ message: "Comment doesn't exists" });
      })
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
});

//devuelve los comentarios de una localización

router.get("/location/:locationId/comments", (req, res, next) => {
  Location.findById(req.params.locationId)
    .populate({ path: "comments", populate: { path: "userId" } })
    .then(response => {
      res.status(200).json(response.comments);
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: "Location doesn't found" });
    });
})

module.exports = router;

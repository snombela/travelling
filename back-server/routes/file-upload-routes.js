const express = require('express');
const router  = express.Router();
const uploader = require('../configs/cloudinary-setup');

router.post('/auth/upload', uploader.single("imageUrl"), (req, res, next) => {
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    res.json({ imageUrl: req.file.secure_url });
})

module.exports = router;
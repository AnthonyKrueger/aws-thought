const express = require('express');
const router = express.Router();
const userRoutes = require('./user-routes')
const imageRoutes = require('./image-upload');

router.use("/users", userRoutes)
router.use("/images", imageRoutes)

module.exports = router;
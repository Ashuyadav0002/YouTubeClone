const express = require('express')
const router = express.Router();
const videoController = require('../Controllers/video')
const auth = require('../Middleware/authentication')



// Video Upload
router.post('/video', auth, videoController.uploadVideo)

// Get Video
router.get('/getAllVideo', videoController.getAllVideo)

// getVideoById
router.get('/getVideoById/:id', videoController.getVideoById)

// GetAllVideosByUserId
router.get('/:userId/channel', videoController.getAllVideoByUserId)




// Export
module.exports = router
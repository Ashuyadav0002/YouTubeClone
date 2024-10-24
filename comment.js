const express = require('express')
const router = express.Router();
const CommentController = require('../Controllers/comment')
const auth = require('../Middleware/authentication')


// Comment
router.post('/comment', auth, CommentController.addComment)

router.get('/comment/:videoId', CommentController.getCommentByVideoId)



// Export
module.exports = router
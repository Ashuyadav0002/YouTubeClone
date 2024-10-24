const express = require('express')
const router = express.Router();
const userController = require('../Controllers/user')

// User Routes
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.post('/logout', userController.logOut)





// Export
module.exports = router
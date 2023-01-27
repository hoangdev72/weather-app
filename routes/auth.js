const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.post('/login', authController.create)

router.post('/logout', authController.destroy)

router.post('/signup', authController.signUp)

module.exports = router

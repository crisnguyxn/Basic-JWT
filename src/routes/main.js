const express = require('express')
const { login, dashboard } = require('../controllers/main')
const authorMiddleware = require('../middlewares/auth')
const router = express.Router()

router.route('/login').post(login)
router.route('/dashboard').get(authorMiddleware,dashboard)

module.exports = router
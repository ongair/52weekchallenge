const express = require('express')
const router = express.Router()
const botkit = require('ongair-botkit')
const { version } = botkit
// const { respond, version } = require('./bot')

// router.post('/api/bot/respond', respond)
router.get('/api/version', (req, res) => {
  version(req, res, '1.1')
})

module.exports = router;

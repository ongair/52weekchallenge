const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const botkit = require('ongair-botkit')
const { version, User, Request } = botkit

class Server {

  constructor(ver, wizard) {
    this.version = ver
    this.wizard = wizard
    this.app = express()
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({extended: true}))
    let router = express.Router()

    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGODB_URI, (err) => {
      if (err)
        console.log('Error connecting to ', db, err)
    })

    router.post('/api/bot/respond', (req, res) => { this.handlePost(req, res) })
    router.post('/api/worker', (req, res) => { this.handleWorker(req, res) })
    router.get('/api/version', (req, res) => { this.handleVersion(req, res) })

    let port = process.env.PORT || 3000
    this.app.use('/', router)
    this.app.set('port', port)

    this.app.listen(port, function() {
      console.log('Express server listening on port ' + port)
    })
  }

  handlePost(req, res) {
    const request = new Request(req)
    if (request.isIncomingMessage()) {

      let user = new User(request)
      user.load()
        .then(usr => {

          // now to progress the wizard
          this.wizard.load(usr)
          this.wizard.progress(request.text)
            .then(result => {
              res.json({ success: true, user: usr, query: request, responses: result.messages })
            })
        })
        .catch(ex => {
          res.sendStatusCode(500)
            .send(ex)
        })
    }
    else {
      res.json({ success: true, ignored: true })
    }
  }

  handleWorker(req, res) {
    console.log('Calling worker')
    res.json({ success: true })
  }

  handleVersion(req, res) {
    version(req, res, this.version)
  }

  getApp() {
    return this.app
  }
}

module.exports = Server

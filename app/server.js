const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

class Server {

  constructor() {
    this.app = express()
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({extended: true}))

    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGODB_URI, (err) => {
      if (err)
        console.log('Error connecting to ', db, err)
    })

    let port = process.env.PORT || 3000
    this.app.use('/', require('./routes'))
    this.app.set('port', port)

    this.app.listen(port, function() {
      console.log('Express server listening on port ' + port)
    })
  }

  getApp() {
    return this.app
  }
}

module.exports = Server

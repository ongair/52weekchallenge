const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err)
    console.log('Error connecting to ', db, err)
})

app.use('/', require('./routes'))
app.set('port', process.env.PORT || 3000)

const server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port)
})

module.exports = app

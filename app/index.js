const Server = require('./server')

const app = new Server('1.1')
module.exports = app.getApp()

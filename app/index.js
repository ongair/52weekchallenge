const Server = require('./server')

const app = new Server()
module.exports = app.getApp()

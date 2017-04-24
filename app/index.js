const Server = require('./server')
const Wizard = require('./wizard')

const app = new Server('1.1', new Wizard())
module.exports = app.getApp()

const botkit = require('ongair-botkit')
const { User, findOrCreate } = require('./user')
const ProductWizard = require('./product')
const { Request } = botkit

module.exports = {

  respond: (req, res) => {

    const request = new Request(req)

    if (process.env.NODE_ENV == 'production')
      console.log('Request', request)

    if (request.isIncomingMessage())
      findOrCreate(request)
        .then((user) => {
          const wizard = new ProductWizard(user)
          wizard.progress(request.text)
            .then(result => {
              res.json({
                success: true,
                query: request,
                user: user,
                responses: result.messages
              })
            })
        })
        .catch((err) => {
          res.status(500).send('Error:' + err)
        })
    else
      res.json({ success: true, ignored: true })
  },

  version: (req, res) => {
    res.json({ version: '1.1' })
  }
}

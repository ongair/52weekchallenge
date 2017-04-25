const botkit = require('ongair-botkit')
const { Step, Message } = botkit
const fuzzy = require('fuzzy')

class Demo extends Step {

  constructor() {
    super('intro')
  }

  getDemo(input) {
    return fuzzy.filter(input, ['Show me', 'Demo']).length > 0
  }

  onEnter(user, input) {
    return new Promise((resolve, reject) => {
      super.enter(user, input)

      let key, messages

      if (this.getDemo(input)) {
        key = 'demo'
        messages = [
          new Message(user, "Ok. How much you would like to start with?", ["50", "100"])
        ]
      }

      resolve({ key: key, messages: messages })
    })
  }
}

module.exports = Demo

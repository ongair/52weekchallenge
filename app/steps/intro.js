const botkit = require('ongair-botkit')
const { Step, Message } = botkit
const fuzzy = require('fuzzy')

class Intro extends Step {

  constructor() {
    super('intro')
  }

  getDemo(input) {
    return fuzzy.filter(input, ['Show me', 'Demo']).length > 0
  }

  getBegin(input) {
    return fuzzy.filter(input, ["Let's go"]).length > 0
  }

  onEnter(user, input) {
    return new Promise((resolve, reject) => {
      super.enter(user, input)

      let key, messages = [
        new Message(user, "Ok. How much you would like to start with?", ["50", "100"])
      ]

      if (this.getDemo(input)) {
        key = 'demo'
      }
      else {
        key = 'begin'
      }

      resolve({ key: key, messages: messages })
    })
  }
}

module.exports = Intro

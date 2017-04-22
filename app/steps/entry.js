const botkit = require('ongair-botkit')
const fuzzy = require('fuzzy')
const { Step, Message } = botkit

class EntryStep extends Step {
  constructor() {
    super('new')
  }

  onEnter(user, input) {
    return new Promise((resolve, reject)  => {
      super.enter(user, input)

      let messages = [
        new Message(user, "Hi {{first_name}}. Welcome to the 52 week challenge."),
        new Message(user, "I'm here to help you save a little amount every week and watch it grow. Are you interested?", ["Yes", "No"])
      ]
      resolve({ messages: messages, key: 'optin' })
    })
  }
}

module.exports = EntryStep

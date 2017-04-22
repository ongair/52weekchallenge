const botkit = require('ongair-botkit')
const { YesNoStep, Message } = botkit

class OptIn extends YesNoStep {
  constructor() {
    super('optin')
  }

  onEnter(user, input) {
    return new Promise((resolve, reject) => {
      this.enter(user, input)

      let key='new', messages=[], metadata
      let yes = this.yes(input)

      if (yes) {
        key = 'intro'
        messages.push(new Message(user, "Great! Here's the gist of the challenge."))
        messages.push(new Message(user, "Start with a small amount to save at the start of the year then double this amount each week"))
      }

      resolve({ key: key, messages: messages })
    });
  }
}

module.exports = OptIn

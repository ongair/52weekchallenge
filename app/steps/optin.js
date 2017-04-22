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
        messages.push(new Message(user, "Great! Let me show you how."))
        messages.push(new Message(user, "First start with a small amount, like Ksh. 50. Then each week increase the amount you save by this same amount."))
        messages.push(new Message(user, "So you save 100 in week 2, 150 in week 3 and so on until 2,600 in the last week of the year."))
        messages.push(new Message(user, "By then you will have saved Ksh. 68,900!", ["Huh?", "Let's do this"]))
      }
      else {
        key = 'new'
        messages.push(new Message(user, "No worries. Should you change your mind let me know", ["Save"]))
      }

      resolve({ key: key, messages: messages })
    });
  }
}

module.exports = OptIn

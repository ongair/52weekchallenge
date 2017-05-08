const fuzzy = require('fuzzy')
const Calculator = require('../lib/calculator')
const botkit = require('ongair-botkit')
const { Message, YesNoStep } = botkit
const Plan = require('../lib/models/plan')

class Reminder extends YesNoStep {
  constructor() {
    super('reminder')
  }

  onEnter(user, input) {
    return new Promise((resolve, reject) => {
      super.enter(user, input)
      let key='complete', metadata, messages

      if (this.positive(input)) {
        let next = Calculator.addDays(new Date(), 8)

        metadata = [
          { key: 'reminder', value: 'weekly' },
          { key: 'next', value: next }
        ]

        messages = [
          new Message(user, "No worries. I'll remind you next week."),
          new Message(user, "And remember, 'A bargain isn't a bargain unless it's something you need'")
        ]
      }
      resolve({ key: key, metadata: metadata, messages: messages })
    })
  }

  onExit(user, key) {
    return new Promise((resolve, reject) => {
      super.onExit(user, key)
      if(key == 'complete') {
        // we should save the plan
        let week = user.get('week'),
            amount = user.get('amount'),
            mode = user.get('mode'),
            interval = user.get('interval'),
            id = user._id

        let next = Calculator.addDays(new Date(), 8)

        let plan = new Plan({ week: week, amount: amount, mode: mode, interval: interval, status: 'new', remind: true, reminderDate: next, contactId: user.contactId })
        plan.save()
        resolve({ plan: plan })
      }
    })
  }
}

module.exports = Reminder

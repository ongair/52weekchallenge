const fuzzy = require('fuzzy')
const botkit = require('ongair-botkit')
const Calculator = require('../lib/calculator')
const { Message, Step } = botkit

class Setup extends Step {

  constructor() {
    super('setup')
  }

  isStart(input) {
    return fuzzy.filter(input, ['Start']).length > 0
  }

  onEnter(user, input) {
    return new Promise((resolve, reject) => {
      super.enter(user, input)
      let key, messages, metadata

      let start = this.isStart(input)
      if (start) {
        key = 'frequency'
        let week = Calculator.weekFromDate(new Date())

        metadata = [
          { key: 'mode', value: 'start' },
          { key: 'week', value: week }
        ]


        let amount = user.get('amount')
        let calc = new Calculator(amount, week)
        let total = calc.total()

        messages = [
          new Message(user, "No worries. Just so you know the total amount you'll save this year will be " + total),
          new Message(user, "How would you like to be making your payments?", ["Weekly", "Monthly"])
        ]
      }

      resolve({ key: key, messages: messages, metadata: metadata })
    })
  }
}

module.exports = Setup

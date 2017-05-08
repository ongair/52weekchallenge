const fuzzy = require('fuzzy')
const botkit = require('ongair-botkit')
const Calculator = require('../lib/calculator')
const { Message, Step } = botkit
const numeral = require('numeral')

class Frequency extends Step {

  constructor() {
    super('frequency')
  }

  isWeekly(input) {
    return fuzzy.filter(input, ['Weekly']).length > 0
  }

  isMonthly(input) {
    return fuzzy.filter(input, ['Monthly']).length > 0
  }

  onEnter(user, input) {
    return new Promise((resolve, reject) => {
      super.enter(user, input)
      let key='reminder', metadata, messages

      let week = Calculator.weekFromDate(new Date())
      let amount = user.get('amount')
      let calc = new Calculator(amount)
      let installment = calc.installment(week)

      if (this.isWeekly(input)) {
        metadata = [{ key: 'interval', value: 'weekly'}]
        messages = [
          new Message(user, "Cool. Your first installment due for this week is " + numeral(installment).format('0,0.00')),
          new Message(user, "Would you like me to send you reminders every week?", ["Yes", "No"])
        ]
      }
      else if (this.isMonthly(input)) {
        metadata = [{ key: 'interval', value: 'monthly'}]
      }

      resolve({ key: key, metadata: metadata, messages: messages })
    })
  }
}

module.exports = Frequency

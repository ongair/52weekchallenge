const botkit = require('ongair-botkit')
const { Message, Step } = botkit
const nlp = require('compromise')
const Calculator = require('../lib/calculator')

class Begin extends Step {

  constructor() {
    super('begin')
  }

  onEnter(user, input) {
    return new Promise((resolve, reject) => {
      super.enter(user, input)

      let key='begin', messages=[], metadata=[]
      let amount = nlp(input).values().toNumber().out('text')

      if (amount) {
        key = 'setup'

        let calc = new Calculator(amount)
        let yearBalance = calc.total()
        let week = Calculator.weekFromDate(new Date())
        let progress = Math.ceil(week / 52 * 100)
        let current = calc.balance(week)

        messages = [
         new Message(user, "Great choice. You stand to save upto " + yearBalance + " by the end of the year!"),
         new Message(user, "We're now " + progress + "% through the year, meaning you should have " + current + " already saved."),
         new Message(user, "Here's how I can help. If you have been saving elsewhere, you can transfer your progress here. Otherwise, you can start from this weeks installment."),
         new Message(user, "How would you like to progress?", ["Catch up", "Start"])
       ]

        metadata.push({ key: 'amount', value: amount })
      } else {
        messages.push(new Message(user, "Sorry I didn't get that amount. Please enter a number or pick one of these popular options.", ["50", "100"]))
      }

      resolve({ key: key, messages: messages, metadata: metadata })
    })
  }
}

module.exports = Begin

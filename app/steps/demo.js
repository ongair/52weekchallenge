const botkit = require('ongair-botkit')
const { Step, Message } = botkit
const nlp = require('compromise')
const Calculator = require('../lib/calculator')

class Demo extends Step {

  constructor() {
    super('demo')
  }

  onEnter(user, input) {
    return new Promise((resolve, reject) => {
      super.enter(user, input)

      let key='intro', messages

      let amount = nlp(input).values().toNumber().out('text')
      if (amount) {
        // calculate the total amount
        let calc = new Calculator(amount)
      }

      resolve({ key: key, messages: messages })
    })
  }
}

module.exports = Demo

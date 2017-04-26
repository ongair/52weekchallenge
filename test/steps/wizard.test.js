const botkit = require('ongair-botkit')
const { Message } = botkit
const Begin = require('../../app/steps/begin')
const Setup = require('../../app/steps/setup')
const Frequency = require('../../app/steps/frequency')
const chai = require('chai')
const { expect } = chai
const Calculator = require('../../app/lib/calculator')

describe('The wizard configuration steps', () => {

  let user = { accountType: 'MessengerV2', state: 'optin', name: 'Alex', contactId: '2' }


  describe('The begin step', () => {
    let step = new Begin()
    it('Can handle a correct amount', (done) => {

      step.onEnter(user, '50')
        .then(response => {
          let { key, metadata, messages } = response
          let calc = new Calculator(50)
          let yearBalance = calc.total()
          let week = Calculator.weekFromDate(new Date())
          let current = calc.balance(week)
          let progress = Math.ceil(week / 52)

          let expected = [
            new Message(user, "Great choice. You stand to save upto " + yearBalance + " by the end of the year!"),
            new Message(user, "We're now " + progress + "% through the year, meaning you should have " + current + " already saved."),
            new Message(user, "Here's how I can help. If you have been saving elsewhere, you can transfer your progress here. Otherwise, you can start from this weeks installment."),
            new Message(user, "How would you like to progress?", ["Catch up", "Start"])
          ]

          expect(messages).to.be.eql(expected)
          expect(key).to.be.equal('setup')
          expect(metadata).to.be.eql([{ key: 'amount', value: '50' }])
          done()
        })
    })

    it('Can handle an incorrect amount', (done) => {

      step.onEnter(user, 'NaN')
        .then(response => {
          let { key, messages, metadata } = response
          let expected = [new Message(user, "Sorry I didn't get that amount. Please enter a number or pick one of these popular options.", ["50", "100"])]

          expect(key).to.be.equal('begin')
          expect(messages).to.be.eql(expected)
          done()
        })
    })

  })

  describe('The Setup step', () => {

    let step = new Setup()

    user.get = (key) => {
      if (key == 'amount')
        return 50
    }

    it('Can handle a catch up option', (done) => {
      step.onEnter(user, 'Start')
        .then(response => {
          let { key, messages, metadata } = response

          let week = Calculator.weekFromDate(new Date())
          let calc = new Calculator(50, week)
          let total = calc.total()

          let expected = [
            new Message(user, "No worries. Just so you know the total amount you'll save this year will be " + total),
            new Message(user, "How would you like to be making your payments?", ["Weekly", "Monthly"])
          ]

          expect(key).to.be.equal('frequency')
          expect(metadata).to.be.eql([ { key: 'mode', value: 'start' } ])
          expect(messages).to.be.eql(expected)
          done()
        })
    })
  })


  describe('The frequency step', () => {
    let step = new Frequency()
    user.get = (key) => {
      if (key == 'amount')
        return 50
    }

    it('Can handle a weekly frequency', (done) => {

      step.onEnter(user, 'Weekly')
        .then(response => {
          let { key, messages, metadata } = response

          let week = Calculator.weekFromDate(new Date())
          let amount = 50
          let calc = new Calculator(amount)
          let installment = calc.installment(week)

          let expected = [
            new Message(user, "Cool. Your first installment due for this week is " + installment),
            new Message(user, "Would you like me to send you reminders every week?", ["Yes", "No"])
          ]

          expect(key).to.be.equal('reminder')
          expect(metadata).to.be.eql([ { key: 'interval', value: 'weekly' }])
          expect(messages).to.be.eql(expected)
          done()
        })
    })
  })
})
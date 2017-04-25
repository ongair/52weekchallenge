const botkit = require('ongair-botkit')
const { Message } = botkit
const Intro = require('../../app/steps/intro')
const chai = require('chai')
const { expect } = chai

describe('The intro step', () => {

  let user = { accountType: 'MessengerV2', state: 'intro', name: 'Alex', contactId: '2' }
  let step = new Intro()

  it('Can ask for a demo', (done) => {

    step.onEnter(user, 'Show me')
      .then(response => {
        let { key, messages } = response

        expect(key).to.be.equal('demo')
        expect(messages).to.be.eql([ new Message(user, "Ok. How much you would like to start with?", ["50", "100"]) ])
        done()
      })

  })
})

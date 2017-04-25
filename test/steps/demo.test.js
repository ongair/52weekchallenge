const botkit = require('ongair-botkit')
const { Message } = botkit
const Demo = require('../../app/steps/demo')
const chai = require('chai')
const { expect } = chai

describe('The demo step', () => {

  let user = { accountType: 'MessengerV2', state: 'optin', name: 'Alex', contactId: '2' }
  let step = new Demo()

  it('Can handle an amount', (done) => {

    step.onEnter(user, '50')
      .then(response => {
        let { key, messages } = response

        expect(key).to.be.equal('intro')
        done()
      })
  })
})

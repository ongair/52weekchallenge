const botkit = require('ongair-botkit')
const { Message } = botkit
const OptIn = require('../../app/steps/optin')
const chai = require('chai')
const { expect } = chai

describe('The optin step', () => {

  let user = { accountType: 'MessengerV2', state: 'optin', name: 'Alex', contactId: '2' }
  let step = new OptIn()

  it('Can handle a valid optin', (done) => {

    step.onEnter(user, 'Yes')
      .then(response => {
        let { key, messages } = response

        expect(key).to.be.equal('intro')
        done()
      })
  })

  it('Can handle a declined optin', (done) => {

    step.onEnter(user, 'Nope')
      .then(response => {
        let { key, messages } = response

        expect(key).to.be.equal('new')
        done()
      })
  })
})

const EntryStep = require('./steps/entry')
const OptinStep = require('./steps/optin')
const botkit = require('ongair-botkit')
const { Wizard } = botkit

class SaverWizard extends Wizard {
  constructor() {
    super(null,
      [
        new EntryStep(),
        new OptinStep()
      ]
    )
  }
}

module.exports = SaverWizard

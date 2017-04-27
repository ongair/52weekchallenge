const EntryStep = require('./steps/entry')
const OptinStep = require('./steps/optin')
const Begin = require('./steps/begin')
const Demo = require('./steps/demo')
const Frequency = require('./steps/frequency')
const Intro = require('./steps/intro')
const OptIn = require('./steps/optin')
const Reminder = require('./steps/reminder')
const botkit = require('ongair-botkit')
const { Wizard } = botkit

class SaverWizard extends Wizard {
  constructor() {
    super(null,
      [
        new EntryStep(),
        new OptinStep(),
        new Begin(),
        new Demo(),
        new Frequency(),
        new Intro(),
        new OptIn(),
        new Reminder()
      ]
    )
  }
}

module.exports = SaverWizard

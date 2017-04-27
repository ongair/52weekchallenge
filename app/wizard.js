const EntryStep = require('./steps/entry')
const Begin = require('./steps/begin')
const Demo = require('./steps/demo')
const Frequency = require('./steps/frequency')
const Intro = require('./steps/intro')
const OptIn = require('./steps/optin')
const Reminder = require('./steps/reminder')
const Setup = require('./steps/setup')
const botkit = require('ongair-botkit')
const { Wizard } = botkit

class SaverWizard extends Wizard {
  constructor() {
    super(null,
      [
        new EntryStep(),
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

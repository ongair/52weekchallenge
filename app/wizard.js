const EntryStep = require('./steps/entry')
const OptinStep = require('./steps/optin')

class SaverWizard extends Wizard {
  constructor(user) {
    super(user,
      [
        new EntryStep(),
        new OptinStep()
      ]
    )
  }
}

module.exports = ProductWizard

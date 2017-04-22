const chai = require('chai')
const { expect } = chai
const Calculator = require('../../app/lib/calculator')

describe('The calculator', () => {

  it('Can get the week of the year from the date', () => {
    // 22nd Apr 2017
    let date = new Date(2017, 3, 22)

    let week = Calculator.weekFromDate(date)
    expect(week).to.be.equal(16)

    // 1st of jan
    date = new Date(2017, 0, 1)
    week = Calculator.weekFromDate(date)

    expect(week).to.be.equal(1)

    // end of year
    date = new Date(2017, 11, 31)
    week = Calculator.weekFromDate(date)
    expect(week).to.be.equal(53) //next year for 2017
  })
})

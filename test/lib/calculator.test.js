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

  it('Can the installment for a particular week', () => {

    let calc = new Calculator(50)

    let amount = calc.installment(1)
    expect(amount).to.be.equal(50)

    amount = calc.installment(2)
    expect(amount).to.be.equal(100)

    amount = calc.installment(3)
    expect(amount).to.be.equal(150)

    amount = calc.installment(52)
    expect(amount).to.be.equal(2600)
  })

  it('Can get the balance for a particular week', () => {

    let calc = new Calculator(50)

    let balance = calc.balance(1)
    expect(balance).to.be.equal(50)

    balance = calc.balance(2)
    expect(balance).to.be.equal(150)

    balance = calc.balance(52)
    expect(balance).to.be.equal(68900)
  })

  it('Can get the total for a year', () => {
    let calc = new Calculator(50)
    expect(calc.total()).to.be.equal(68900)
  })

  it('Can get the balance for part of the year', () => {
    let calc = new Calculator(50, 17)
    expect(calc.total()).to.be.equal(33300)
  })

  it('Can add days to a date', () => {
    let date = new Date(2017, 4, 26)

    let expected = new Date(2017, 5, 2)
    let future = Calculator.addDays(date, 7)
    expect(future).to.be.eql(expected)
  })
})

class Calculator {

  constructor(seed=100, start=1) {
    this.seed = seed
    this.start = start
  }

  balance(week) {
    let total = 0
    for(let idx=1; idx <= week; idx++)
      total += this.installment(idx)
    return total
  }

  installment(week) {
    return week * this.seed
  }

  static weekFromDate(date) {
    let firstJanOfYear = new Date(date.getFullYear(),0,1)
    let millisecsInDay = 86400000

    return Math.ceil(((( date - firstJanOfYear ) / millisecsInDay ) + firstJanOfYear.getDay() + 1 ) / 7)
  }
}

module.exports = Calculator

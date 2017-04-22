class Calculator {

  constructor(installment=100, start=0) {
    this.installment = installment
    this.start = start
  }

  static weekFromDate(date) {
    let firstJanOfYear = new Date(date.getFullYear(),0,1)
    let millisecsInDay = 86400000

    return Math.ceil(((( date - firstJanOfYear ) / millisecsInDay ) + firstJanOfYear.getDay() + 1 ) / 7)    
  }
}

module.exports = Calculator

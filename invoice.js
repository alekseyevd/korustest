function calcCost(play) {
  const TRAGEDY_DEFAULT_COST = 40000
  const COMEDY_DEFAULT_COST = 30000
  let sum = 0
  switch (play.type) {
    case "tragedy":
      sum = TRAGEDY_DEFAULT_COST;
      if (play.audience > 30) {
        sum += 1000 * (play.audience - 30);
      }
      break;
    case "comedy":
      sum = COMEDY_DEFAULT_COST;
      if (play.audience > 20) {
        sum += 10000 + 500 * (play.audience - 20);
      }
      sum += 300 * play.audience;
      break;
    default:
      throw new Error(`неизвестный тип: ${play.type}`)
  }
  return sum  
}

function calcCredits(play) {
  let credits = 0
  if (play.type === "comedy") credits += Math.floor(play.audience / 10)
  credits += Math.max(play.audience - 30, 0)
  return credits
}

module.exports = class Invoice {
  constructor(data) {
    this.customer = data.customer
    this.performance = data.performance
    this.totalAmount = 0
    this.volumeCredits = 0
    this.init()
  }

  format(value) {
    return new Intl.NumberFormat("ru-RU",  { style: "currency", currency: "RUB",  minimumFractionDigits: 2 }).format(value)
  }

  init() {
    for (let play of this.performance) {
      play.sum = calcCost(play)
      this.totalAmount += play.sum
      this.volumeCredits += calcCredits(play)
    }
  }

  toString() {
    let result = `Счет для ${this.customer}\n`
    this.performance.forEach(play => {
      result += ` ${play.playId}: ${this.format(play.sum)}`;
      result += ` (${play.audience} мест)\n`;      
    });
    result += `Итого с вас ${this.format(this.totalAmount)}\n`;
    result += `Вы заработали ${this.volumeCredits} бонусов\n`;
    return result;    
  }
}
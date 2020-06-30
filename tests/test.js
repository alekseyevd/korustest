const fs = require('fs')
const Invoice = require('../invoice')

try {
  const invoices = JSON.parse(fs.readFileSync('../invoices.json', 'utf8'))
  invoices.map(invoice => {
    let statement = new Invoice(invoice)
    console.log(statement.toString())
  })
} catch (error) {
  console.log(error)
}  





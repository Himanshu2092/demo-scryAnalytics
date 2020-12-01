const csv = require('csv-parser')
const fs = require('fs')
const stock  = require('./models')

const load = function () {
    const rows = []
    const readStream = fs.createReadStream('src/data.csv')
    readStream.pipe(csv()).on('data', (row) => {
        const {Date: date, Open: open, High: high, Low: low, Close: close} = row
        rows.push({date, open, close})
    }).on('end', () => {
        stock.deleteMany({}, (err, data) => {
            if(err) console.log('error in deletion docs')
        })
        stock.insertMany(rows, (err, data) => {
            if(err) console.log('error in uploading data to database', err) 
            else
            console.log('csv loaded succesfully to database')
        })
    })
}


module.exports = {
    load
}
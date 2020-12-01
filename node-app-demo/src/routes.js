const express = require('express')
const router = express.Router()
const {getStocks, addStock} = require('./controller')

router.get('/', getStocks)

router.post('/add', addStock)

module.exports = router
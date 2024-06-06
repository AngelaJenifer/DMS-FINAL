const mongoose = require('mongoose')

const CurrencySchema = new mongoose.Schema(
    {
        country : String,
        currency: String,
        Active: String,
    }
)

const CurrencyModel = mongoose.model("currency", CurrencySchema)

module.exports = CurrencyModel

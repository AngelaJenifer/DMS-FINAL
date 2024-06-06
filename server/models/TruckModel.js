const mongoose = require('mongoose')

const TruckSchema = new mongoose.Schema(
    {
        truckname : String,
        truckcode: String,
        Active: String,
    }
)

const TruckModel = mongoose.model("truck", TruckSchema)

module.exports = TruckModel

const mongoose = require('mongoose')

const CommoditySchema = new mongoose.Schema(
    {
        commodityname : String,
        commoditycode: String,
        Active: String,
    }
)

const CommodityModel = mongoose.model("commodity", CommoditySchema)

module.exports = CommodityModel

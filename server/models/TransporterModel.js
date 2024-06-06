const mongoose = require('mongoose')

const TransporterSchema = new mongoose.Schema(
    {
        Trname: String,
        country:String,
        Cnumber:String,
        remarks: String,
        Trcode: String,
        province: String,
        Cperson: String,
        Active: String,
        address: String,
        city: String,
        email:String,
    }
)

const TransporterModel = mongoose.model("Transporter", TransporterSchema)

module.exports = TransporterModel

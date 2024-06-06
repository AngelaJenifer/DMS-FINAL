const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema(
    {
        Lcode : String,
        country: String,
        subdistrict : String,
        Cnumber: String,
        remarks: String,
        Lname: String,
        province: String,
        Pcode: String,
        fax: String,
        Active: String,
        address: String,
        city: String,
        Cperson: String,
        email: String,
        
    }
)

const LocationModel = mongoose.model("location", LocationSchema)

module.exports = LocationModel

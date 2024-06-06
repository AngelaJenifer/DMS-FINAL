const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema(
    {
        Cname : String,
        country: String,
        subdistrict : String,
        cperson: String,
        Active: String,
        Ccode: String,
        province: String,
        taxid: String,
        phone: String,
        city: String,
        district: String,
        email: String,
        currency: String,
    }
)

const CompanyModel = mongoose.model("company", CompanySchema)

module.exports = CompanyModel

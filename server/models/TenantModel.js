

const mongoose = require('mongoose')

const TenantSchema = new mongoose.Schema(
    {
        Tcode: String,
        Tname:String,
        address: String,
        Cperson:String,
        email: String,
        Cnumber: String,
    }
)

const TenantModel = mongoose.model("tenant", TenantSchema)

module.exports = TenantModel

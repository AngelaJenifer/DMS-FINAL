const mongoose = require('mongoose')

const DockSchema = new mongoose.Schema(
    {
        locationname : String,
        Nodocks: String,
        Active: String,
        remarks: String,
    }
)

const DockModel = mongoose.model("Dock", DockSchema)

module.exports = DockModel

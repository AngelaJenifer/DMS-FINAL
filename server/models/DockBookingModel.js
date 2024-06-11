

const mongoose = require('mongoose')

const DockBookingSchema = new mongoose.Schema(
    {
        Bno: String,
        DBstatus: String,
        Reject: String,
        OType: String,
        CType: String,
        Lname: String,
        Dname: String,
        DinOut: String,
        Tname: String,
        TType:String,
        Tno:String,
        driver: String,
        Oremark:String,
        Tremark: String,
        RBdock: String,
    }
)

const DockBookingModel = mongoose.model("dockbooking", DockBookingSchema)

module.exports = DockBookingModel

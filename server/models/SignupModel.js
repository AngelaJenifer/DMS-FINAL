const mongoose = require('mongoose')

const SignupSchema = new mongoose.Schema(
    {
        userid : String,
        password: String,
        cpassword : String
    }
)

const SignupModel = mongoose.model("signup", SignupSchema)

module.exports = SignupModel

const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        maxLength: 32,
        unique: true,
    },
    password:{
        type: String,
        required : true,
        maxLength: 16,

    }
})

module.exports = mongoose.model("User", userSchema)
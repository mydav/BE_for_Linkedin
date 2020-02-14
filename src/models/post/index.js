const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    text: {
        type:String,
        required: true
    },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
}, { timestamps: true })

module.exports = mongoose.model("Posts", postSchema)


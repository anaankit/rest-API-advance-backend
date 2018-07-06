//module depencencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    message: {
        type: String,
        default: ''
    },
    sender: {
        type: String,
        default: ''
    },
    roomName: {
        type: String,
        default: ''

    },
    createdON:{
        type:Date,
        default:Date.now()
    }
})

mongoose.model('Chat',chatSchema)
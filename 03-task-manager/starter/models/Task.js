const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is must"],
        trim: true,
        maxlength: [20, "Name should not be more than 20 characters"]
    }, 
    completed: Boolean
})

module.exports = mongoose.model('Task', TaskSchema)
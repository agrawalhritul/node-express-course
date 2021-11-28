const { findOneAndUpdate } = require('../models/Task')
const Task = require('../models/Task')

const getAllTasks =  async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    }
    catch (error) {
        res.status(500).json( {msg: error})
    }
}

const createTask =  async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    }
    catch (error) {
        res.status(500).json( { msg: error })
    }
    res.status(201).json({task})
}

const getTask =  async (req, res) => {
    try {
        const {id: taskID} = req.params
        const task = await Task.findOne({_id: taskID})
        if (!task) return res.status(404).json({msg: "No task with id: ${taskID}"})
        res.status(200).json({task})
    }
    catch(error) {
        res.status(500).json({msg: error})
    }
}

const deleteTask = async (req, res) => {
    try {
        const {id: taskID} = req.params
        const task = await Task.findOneAndDelete({__id: taskID})
        if (!task) return res.status(404).json({msg: `No task with ID: ${taskID}`})
        return res.status(200).json({task})
    }
    catch(error) {
        res.status(500).json( {msg: error})
    }
}

const updateTask =  async (req, res) => {
    try {
        const { id: taskID} = req.params
        const task = await findOneAndUpdate({_id: taskID}, req.body, {
            new: true, runValidators:true,
        })
        if (!task) return res.status(404).json({msg: `No taks with id: ${taskID}`})
        return task.status(200).json({task})
    }
    catch(error) {
        return  res.status(500).json({msg: error})
    }

}


module.exports = {
    getAllTasks, getTask, createTask, updateTask, deleteTask
}
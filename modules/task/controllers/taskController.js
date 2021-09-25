const path = require('path'),
    Validator = require('validatorjs'),
    ValidationRules = require(path.resolve('./lib/validationRules')),
    Task = require(path.resolve('./models/task.model')),
    User = require(path.resolve('./models/user.model'));

var TaskController = {

    getUser: async (req, res) => {
        let returnData = {};
        try {
            const userId = req.user._id;
            returnData.user = await User.findOne({ _id: userId }, { email: 1 }).lean().exec();
            return res.status(200).json({ status: true, message: "Successful", response: returnData });
        } catch (error) {
            return res.status(400).json({ status: false, errorCode: -1, message: error.message });
        }

    },
    createTask: async (req, res) => {
        let returnData = {};
        try {
            const bodyData = req.body;
            const userId = req.user._id;

            let validation = new Validator(bodyData, ValidationRules.creatTasK);
            if (validation.fails()) {
                return res.status(400).json({ status: false, message: 'Validation failed', response: validation.errors.all(), errorCode: -2 });
            }

            let task = {};
            task.userId = userId;
            task.name = bodyData.name;
            const taskObject = new Task(task);
            returnData.task = await taskObject.save();

            return res.status(200).json({ status: true, message: "Successful", response: returnData });

        } catch (error) {
            return res.status(400).json({ status: false, errorCode: -1, message: error.message });
        }
    },

    getTaskList: async (req, res) => {
        let returnData = {};
        try {
            const userId = req.user._id;
            returnData.tasks = await Task.find({ userId: userId }).lean().exec();
            return res.status(200).json({ status: true, message: "Successful", response: returnData });
        } catch (error) {
            return res.status(400).json({ status: false, errorCode: -1, message: error.message });
        }
    }
}

module.exports = TaskController;

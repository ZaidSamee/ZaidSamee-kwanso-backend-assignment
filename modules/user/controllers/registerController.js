const path = require('path'),
    Validator = require('validatorjs'),
    ValidationRules = require(path.resolve('./lib/validationRules')),
    jwt = require("jsonwebtoken"),
    User = require(path.resolve('./models/user.model'));

var RegisterController = {

    register: async (req, res) => {
        let returnData = {};
        try {
            let bodyData = req.body;
            let validation = new Validator(bodyData, ValidationRules.register);
            if (validation.fails()) {
                return res.status(400).json({ status: false, message: 'Validation failed', response: validation.errors.all(), errorCode: -2 });
            }

            let existEmail = await User.findOne({ email: bodyData.email }).exec();
            if (existEmail) {
                return res.status(400).json({ status: false, message: 'The email already exists' });
            }

            const userData = new User(bodyData);
            let userObj = await userData.save();
            delete userObj.password;
            returnData.user = userObj;

            return res.status(200).json({ status: true, message: "Successfully record", response: returnData });
        } catch (error) {
            return res.status(400).json({ status: false, errorCode: -1, message: error.message });
        }
    },

    login: async (req, res) => {
        let returnData = {};
        try {
            let bodyData = req.body;

            let validation = new Validator(bodyData, ValidationRules.login);
            if (validation.fails()) {
                return res.status(400).json({ status: false, message: 'Validation failed', response: validation.errors.all(), errorCode: -2 });
            }

            let user = await User.findOne({ email: bodyData.email }).exec();
            if (!user) {
                return res.status(400).json({ status: false, message: 'No record found.', response: returnData });
            }
            else if (user.password !== bodyData.password) {
                return res.status(400).json({ status: false, message: 'Wrong password.', response: returnData });
            }

            const payLoad = { _id: user._id, email: user.email };
            returnData.token = jwt.sign(payLoad, 'privateKey');;

            return res.status(200).json({ status: true, message: "Successful", response: returnData });
        } catch (error) {
            return res.status(400).json({ status: false, errorCode: -1, message: error.message });
        }
    },
}

module.exports = RegisterController;

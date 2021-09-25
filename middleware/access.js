const path = require('path'),
    jwt = require("jsonwebtoken"),
    User = require(path.resolve('./models/user.model'));

module.exports = {

    verifyUser: async function (req, res, next) {
        try {
            let token = req.headers ? req.headers.token : null;

            if (token) {
                var decoded = jwt.verify(token, 'privateKey');
                let user = await User.findOne({ _id: decoded._id }).lean().exec();
                if (user) {
                    req.user = user;
                    next();
                } else {
                    return res.status(400).json({ status: false, message: "Invalid Token" })
                }
            } else {
                return res.status(400).json({ status: false, message: "Token missing" })
            }
        } catch (err) {
            return res.status(400).json({ status: false, message: err })
        }
    },

}

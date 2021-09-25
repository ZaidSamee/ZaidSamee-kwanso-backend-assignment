const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = Schema(
    {
        email: { type: String, lowercase: true, trim: true, required: true, unique: true, index: true },
        password: { type: String, trim: true, required: true },
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);


module.exports = mongoose.model('User', UserSchema, 'Users');

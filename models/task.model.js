const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = Schema(
    {
        userId: { type: Schema.ObjectId, ref: 'User', required: true, index: true },
        name: { type: String, required: true },
        details: { type: String, default: "" },
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);


module.exports = mongoose.model('Task', TaskSchema, 'Tasks');

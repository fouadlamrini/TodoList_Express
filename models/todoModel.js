const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoModelSchema = new Schema({
    title: {
        type: String,
        match: /[\p{Letter}\p{Mark}]+/gu,
        unique: true,
    },
    description: {
        type: String,
        match: /[\p{Letter}\p{Mark}]+/gu,
    },
    status: {
        type: String,
        enum: ['pending', 'done'],
        default: 'pending',
    },
});

module.exports = mongoose.model('TodoModel', TodoModelSchema);

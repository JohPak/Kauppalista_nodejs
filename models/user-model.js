const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'note',
        req: true
    }],
    shoppinglist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shoppinglist',
        req: true
    }]
});
const user_model = mongoose.model('user', user_schema);

module.exports = user_model;
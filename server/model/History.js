const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    cycleid:{
        type: String,
        required: true
    },
    ownerid: {
        type: String,
        required: true
    },
    renterid: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
    },
    date: {
        type: Date
    }    
});

module.exports = mongoose.model('History', historySchema);
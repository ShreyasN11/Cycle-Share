const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listedCycleSchema = new Schema({
    cycleid:{
        type: String,
        required: true
    },
    ownerid: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    pickup: {
        type: String
    },
    drop: {
        type: String
    },
    cost: {
        type: Number
    },
    total: {
        type: Number
    },
    count: {
        type: Number
    }
});

module.exports = mongoose.model('ListedCycle', listedCycleSchema);
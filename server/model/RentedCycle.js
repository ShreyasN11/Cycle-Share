const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentedCycleSchema = new Schema({
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
    starttime: {
        type: TimeRanges,
    },
    endtime: {
        type: TimeRanges,
    },
    date: {
        type: Date
    }
});

module.exports = mongoose.model('RentedCycle', rentedCycleSchema);
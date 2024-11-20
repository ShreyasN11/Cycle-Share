const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const earningSchema = new Schema({
    ownerid: {
        type: String,
        required: true
    },
    earnings: {
        type:Number
    },
    expense:{
        type:Number
    },
    countrental: {
        type:Number
    },
    countlist:{
        type:Number
    }  
});

module.exports = mongoose.model('Earning', earningSchema);
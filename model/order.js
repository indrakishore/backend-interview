const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    dateTime : {  
        type: Date,
        default : Date.now    
    },
    totalFee : {
        type : String,
        required : true
    },
    // services : [{
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'Service'
    // }]
    services : {
        type : []
        // type : mongoose.Schema.Types.ObjectId,
        // ref : 'Service'
    }
});

const order = mongoose.model('order', orderSchema);
module.exports = order;
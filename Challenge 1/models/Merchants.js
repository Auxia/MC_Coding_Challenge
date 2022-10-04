const mongoose = require('mongoose')

const MerchantSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: [true, 'Please add a latitude'],
        maxlength: [10, 'Latitude cannot be more than 10 characters'],
    },
    longitude: {
        type: Number,
        required: [true, 'Please add a longitude'],
        maxlength: [10, 'Longitude cannot be more than 10 characters'],
    },
    merchantName: {
        type: String,
        required: [true, 'Please add a merchant name'],
        maxlength: [50, 'Merchant name cannot be more than 50 characters'],
    },
    merchantId: {
        type: Number,
        required: [true, 'Please add a merchant id'],
        maxlength: [10, 'Merchant id cannot be more than 10 characters'],
    },
})

module.exports = mongoose.model('Merchant', MerchantSchema)
const Merchants = require('../models/Merchants');
const asyncWrapper = require('../middleware/async');

// Getting distance using haversine formula
const getDistance = (point1, point2) => {
    const R = 6371e3; // metres
    const latitudePoint1 = point1.latitude * Math.PI/180; // φ, λ in radians
    const latitudePoint2 = point2.latitude * Math.PI/180;
    const diffLatitude = (point2.latitude-point1.latitude) * Math.PI/180;
    const diffLongitude = (point2.longitude-point1.longitude) * Math.PI/180;

    const a = Math.sin(diffLatitude/2) * Math.sin(diffLatitude/2) +
                Math.cos(latitudePoint1) * Math.cos(latitudePoint2) *
                Math.sin(diffLongitude/2) * Math.sin(diffLongitude/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d;
};

const getMerchant = asyncWrapper(async (req, res) => {
    const { id: merchantId } = req.params;
    const merchant = await Merchants.findOne({ merchantId: merchantId });
    if (!merchant) {
        return next(new ErrorResponse(`Merchant not found with id of ${merchantId}`, 404));
    }
    res.status(200).json({ merchant });
});

const createMerchant = asyncWrapper(async (req, res) => {
    const merchant = await Merchants.create(req.body);
    res.status(201).json({ merchant });
});

const updateMerchant = asyncWrapper(async (req, res) => {
    const { id: merchantId } = req.params;
    const merchant = await Merchants.findOneAndUpdate({ merchantId: merchantId }, req.body, {
        new: true,
        runValidators: true
    });
    if (!merchant) {
        return next(new ErrorResponse(`Merchant not found with id of ${merchantId}`, 404));
    }
    res.status(200).json({ merchant });
});

const deleteMerchant = asyncWrapper(async (req, res) => {
    const { id: merchantId } = req.params;
    const merchant = await Merchants.findOneAndDelete({ merchantId: merchantId });
    if (!merchant) {
        return next(new ErrorResponse(`Merchant not found with id of ${merchantId}`, 404));
    }
    res.status(200).json({ merchant });
});

const getNearestMerchants = asyncWrapper(async (req, res) => {
    const { latitude: latitude, longitude: longitude, limit: limit } = req.body;
    const merchants = await Merchants.find();
    const distances = merchants.map(merchant => {
        const distance = getDistance(
            {latitude, longitude},
            {latitude: merchant.latitude, longitude: merchant.longitude}
        );
        console.log(merchant, distance);
        return { ...merchant, distance };
    });
    const sorted = distances.sort((a, b) => a.distance - b.distance);
    const nearestMerchants = sorted.slice(0, limit);
    res.status(200).json({ nearestMerchants });
});

module.exports = {
    getNearestMerchants,
    getMerchant,
    createMerchant,
    updateMerchant,
    deleteMerchant,
};
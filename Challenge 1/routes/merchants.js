const express = require('express');
const router = express.Router();

const {
    getNearestMerchants,
    getMerchant,
    createMerchant,
    updateMerchant,
    deleteMerchant,
} = require('../controllers/merchants');

router.route('/').get(getNearestMerchants).post(createMerchant);
router.route('/:id').get(getMerchant).patch(updateMerchant).delete(deleteMerchant);

module.exports = router;
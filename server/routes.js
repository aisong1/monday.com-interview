const controller = require('./controllers');
const express = require('express');
const router = express.Router();

// Connect controller methods to their corresponding routes
// api/fragrances
router.get('/fragrances', controller.fragrances.get);

router.post('/fragrances', controller.fragrances.post);

router.put('/fragrances', controller.fragrances.put);

router.delete('/fragrances', controller.fragrances.delete);

// api/orders
router.get('/orders', controller.orders.get);

router.post('/orders', controller.orders.post);

router.put('/orders', controller.orders.put);

router.delete('/orders', controller.orders.delete);

module.exports = router;

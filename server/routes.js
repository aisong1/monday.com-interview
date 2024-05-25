const controller = require('./controllers');
const express = require('express');
const router = express.Router();

// Connect controller methods to their corresponding routes
router.get('/fragrances', controller.fragrances.get);

router.post('/fragrances', controller.fragrances.post);

router.put('/fragrances', controller.fragrances.put);

router.delete('/fragrances', controller.fragrances.delete);

module.exports = router;

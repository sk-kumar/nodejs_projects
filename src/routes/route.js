const express = require('express');
const urlController = require('../controllers/urlController');
const router = express.Router();

router.post('/url/shortner', urlController.createShortURL);
router.get('/', urlController.getShortUrl);
router.get('/:urlCode', urlController.redirectOriginalUrl);

module.exports = router;
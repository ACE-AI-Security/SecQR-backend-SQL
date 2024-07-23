const express = require('express');
const { checkUrl, blockUrl, checkBlockedUrl } = require('../controllers/urlController');

const router = express.Router();

router.post('/check', checkUrl);
router.post('/block', blockUrl);
router.get('/check-blocked', checkBlockedUrl);

module.exports = router;

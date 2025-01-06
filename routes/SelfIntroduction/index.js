const express = require('express');
const router = express.Router();

const { validateToken } = require('../../middlewares/AuthMiddleware.js');

const GetIntroduction = require('./GetIntroduction.js');
router.post('/', validateToken, GetIntroduction);

const GetUserIntroduction = require('./GetUserIntroduction.js');
router.get('/', validateToken, GetUserIntroduction);

const UpdateIntroduction = require('./UpdateIntroduction.js');
router.put('/update/:id', validateToken, UpdateIntroduction);

module.exports = router;

const express = require('express');
const router = express.Router();
const { validateToken } = require('../../middlewares/AuthMiddleware.js');

const CreateCard = require('./CreateCard.js');
router.post('/', validateToken, CreateCard);

const GetAllCard = require('./GetAllCard.js');
router.get('/', validateToken, GetAllCard);

module.exports = router;

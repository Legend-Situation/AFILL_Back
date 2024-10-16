const express = require('express');
const router = express.Router();

// 유저 관련 라우터
const userRouter = require('./Auth')
router.use('/auth', userRouter)

// JWT 인증 라우터
const jwtRouter = require('./Jwt');
router.use('/jwt', jwtRouter);

// 이미지 업로드 라우터
const uploadRouter = require('./Upload');
router.use('/upload', uploadRouter);

// 카드 생성 라우터
const cardRouter = require('./Cards');
router.use('/cards', cardRouter);

module.exports = router;

// const { verify } = require('jsonwebtoken');
const { postMessage } = require('./../controllers/message.controller.js');

const verifyJWT = require('./../middlewares/auth.middleware.js');

const { Router} = require('express');
const router = Router();

router.route("/post").post(
    verifyJWT,
    postMessage
);

module.exports = router;
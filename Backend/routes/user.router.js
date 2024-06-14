const { Router } = require('express');
const { getUserData,
    postRegisterUser,
    putChangeUserInfo,
    deleteUserProfile } = require('../controllers/user.controller.js');
    
const router = Router();

router.get("/get", getUserData);
router.post("/post", postRegisterUser);
router.put("/put", putChangeUserInfo);
router.delete("/delete", deleteUserProfile);

module.exports = router;
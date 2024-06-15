const { Router } = require('express');
const { getUserData,
    postRegisterUser,
    putChangeUserInfo,
    deleteUserProfile 
} = require('../controllers/user.controller.js');

const upload = require('./../middlewares/multer.middleware.js');

const router = Router();

router.get("/get", getUserData);
router.post(
    "/post",
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
        // {
        //     name: "coverImage",
        //     maxCount: 1
        // }
    ]),
    postRegisterUser
);
router.put("/put", putChangeUserInfo);
router.delete("/delete", deleteUserProfile);

module.exports = router;
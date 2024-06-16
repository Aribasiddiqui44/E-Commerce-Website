const { Router } = require('express');
const { getUserData,
    postLoginUser,
    logoutUser,
    postRegisterUser,
    patchChangeUserInfo,
    deleteUserProfile 
} = require('../controllers/user.controller.js');

const verifyJWT = require('./../middlewares/auth.middleware.js');

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
// router.post("/login", postLoginUser);
router.route("/login").post(postLoginUser);
router.route("/logout", 
    verifyJWT,
    logoutUser
);

router.patch("/put", patchChangeUserInfo);
router.delete("/delete", deleteUserProfile);

module.exports = router;
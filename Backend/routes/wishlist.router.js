const { Router } = require('express');
const {
    getWishlistOfUser,
    postAddWishlistOfUser,
    patchWishlist,
    patchRemoveProduct,
    deleteWishlistProduct
    } = require('./../controllers/wishlist.controller.js');

const verifyJWT = require('./../middlewares/auth.middleware.js');
const router = Router();

router.get("/get", verifyJWT, getWishlistOfUser);
router.post("/post", verifyJWT, postAddWishlistOfUser);
router.patch(
    "/patch",
    verifyJWT,
    patchWishlist
);
router.route("/patch/remove").patch(
    verifyJWT,
    patchRemoveProduct
)
router.delete("/delete", verifyJWT, deleteWishlistProduct);

module.exports = router;
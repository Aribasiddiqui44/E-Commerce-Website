const { Router } = require('express');
const {
    getWishlistOfUser,
    postAddWishlistOfUser,
    patchWishlist,
    deleteWishlistProduct
    } = require('./../controllers/wishlist.controller');

const router = Router();

router.get("/get", getWishlistOfUser);
router.post("/post", postAddWishlistOfUser);
router.patch(
    "/patch",
    patchWishlist
);
router.delete("/delete", deleteWishlistProduct);

module.exports = router;
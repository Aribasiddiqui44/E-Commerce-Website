const Wishlist = require('./../models/wishlist.model.js');
const User = require('./../models/user.model.js');
const Product = require('./../models/product.model.js');

const ApiError = require('./../utils/ApiError.js');
const ApiResponse = require('./../utils/ApiResponse.js');
const asyncHandler = require('./../utils/asyncHandler.js');

const getWishlistOfUser = asyncHandler( async (req, res) => {
    // const wishlist = await Wishlist.findOne({userId: req.user._id});
    let checkWish = await Wishlist.findOne({userId: req.user._id});
    // console.log(checkWish);


    // const wishlistWithProducts = await Wishlist.aggregate([
    //     { $match:
    //         { userId: req.user._id } 
    //     }, // Match the specific wishlist
    //     { $unwind: "$products" }, // Deconstruct the products array
    //     {
    //         $lookup: {
    //             from: "products", // The collection to join
    //             localField: "products", // Field from the wishlist collection
    //             foreignField: "_id", // Field from the products collection
    //             as: "productDetails" // Output array field
    //         }
    //     },
    //     { $unwind: "$productDetails" }, // Unwind the productDetails array
    //     {
    //         $group: {
    //             _id: "$_id",
    //             userId: { $first: "$userId" },
    //             createdAt: { $first: "$createdAt" },
    //             updatedAt: { $first: "$updatedAt" },
    //             products: {
    //                 $push: "$productDetails"
    //             }
    //         }
    //     }
    // ]);


    const wishlistWithProducts = await Wishlist.aggregate([
        {
          $match: {
            userId: req.user._id
          }
        },
        { $unwind: "$products" },
        {
          $lookup: {
            from: "products",
            localField: "products",
            foreignField: "_id",
            as: "productDetails"
          }
        },
        { $unwind: "$productDetails" },
        {
          $group: {
            _id: "$_id",
            userId: { $first: "$userId" },
            createdAt: { $first: "$createdAt" },
            updatedAt: { $first: "$updatedAt" },
            products: {
              $push: "$productDetails"
            }
          }
        }
      ]);

    res.status(200).json(
        new ApiResponse(
            200,
            (wishlistWithProducts.length === 0) ? [] : wishlistWithProducts[0],
            (wishlistWithProducts.length === 0) ? "User do not currently have a wishlist" : "Success"      
        )
    )
});

const postAddWishlistOfUser = asyncHandler( async(req, res) => {
    const { productId } = req.body;
    let checkWishlist = await Wishlist.findOne({
        userId: req.user._id
    });
    if ( checkWishlist ){
        throw new ApiError(
            400,
            "Bad Request! User already has a wishlist"
        )
    }

    let wishlistCreate = await Wishlist.create(
        {
            userId: req.user._id,
            products: [
                productId
            ]
        }
    );

    let checkWishlistCreated = await Wishlist.findById(wishlistCreate._id);

    if( !checkWishlistCreated ){
        throw new ApiError(
            500,
            "Internal Server Error! Something went wrong when creating wishlist"
        )
    };

    res.status(201).json(
        new ApiResponse(
            200,
            "Wishlist Created Successfully"
        )
    );
}
);

const patchWishlist = asyncHandler( async (req, res) => {
    // for adding roducts into wishlist.
    const { productId } = req.body;
    if ( productId.trim() === 0 ){
        throw new ApiError(
            400,
            "The product should be provided"
        )
    };

    // let wishlist = await Wishlist.findOne({userId: req.user._id});
    // if( !wishlist ){
    //     throw new ApiError(
    //         400,
    //         "Bad Request, user do not have a wishlist"
    //     )
    // };

    // wishlist.products.push(productId);
    // await wishlist.save();

    let wishlist = await Wishlist.findOneAndUpdate(
        {userId: req.user._id},
        {
            '$push': {
                products: productId
            }
        },
        {
            new: true
        }
    );

    if ( !wishlist ){
        throw new ApiError(
            400,
            "Bad Request, No wishlist found for user"
        )
    };

    res.status(200).json(
        new ApiResponse(
            200,
            "Product added to wishlist successfully"
        )
    );

});

const patchRemoveProduct = asyncHandler( async (req, res) => {
    const { productId } = req.body;

    let updatedWishlist = await Wishlist.findOneAndUpdate(
        { userId: req.user._id },
        {
            '$pull': {
                products: productId
            }
        },
        {
            new: true
        }
    );

    if ( !updatedWishlist ){
        throw new ApiError(
            400,
            "Bad Request, No wishlist found for user"
        )
    };

    res.status(200).json(
        new ApiResponse(
            200,
            [],
            "product removed from cart successfully"
        )
    );

});
const deleteWishlistProduct = asyncHandler( async (req, res) => {
    let updatedWishlist = await Wishlist.findOneAndUpdate(
        {userId: req.user._id},
        {
            '$set': {
                products: []
            }
        },
        {
            new: true
        }
    );

    if( !updatedWishlist ){
        throw new ApiError(
            400,
            "Bad Request, No wishlist found for user"
        )
    };

    res.status(204).json(
        new ApiResponse(
            204,
            [],
            "Wishlist emptied successfully"
        )
    )
});

module.exports = {
    getWishlistOfUser,
    postAddWishlistOfUser,
    patchWishlist,
    patchRemoveProduct,
    deleteWishlistProduct
};
const mongoose = require('mongoose');

const Product = require('./../models/product.model.js');
const User = require('./../models/user.model.js');

const asyncHandler = require('./../utils/asyncHandler.js');

const ApiError = require('./../utils/ApiError.js');
const ApiResponse = require('./../utils/ApiResponse.js');

// cloudinary service
const uploadOnCloudinary = require('./../services/cloudinary.service.js');

const getProducts = asyncHandler( async (req, res) => {
    // get all products
    // no verificatin required -> like user donot have to login.
    // check that the product is available.

    // send all available products in response.
    // console.log(req.cookies.accessToken);
    // console.log(req.cookies.refreshToken);
    const { page, limit } = req.body;

    const products = await Product.find({
        isAvailable: true
    });

    
    // Pagination can be done in future, so that specific quantity of data provided in one page.
    //options for pagination
    // const options = {
    //     page: parseInt(page, 10) || 1,
    //     limit: parseInt(limit, 10) || 10,
    // };
    // const result = await Product.aggregatePaginate(products, options);


    res.status(200).json(
        new ApiResponse(
            200,
            products,
            "Products fetched successfully"
        )
    );
}
);

const postProductSearch = asyncHandler( async (req, res) => {
    // take search keyword -> req.body
    // search for those keywords, do a full search , like done in Safwaat, check Safwaat repo for reference.
    // take the objects and send them in response, 
    const { keyword } = req.body;
    const searchedProducts = await Product.find({
        $or: [
            { title: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
            { brand: { $regex: keyword, $options: 'i' } },
        ],
        isAvailable: true
    });
    // }).sort(
    //     {title: 1},
    //     {brand: 1},
    //     {description: 1}
    // );
    res.status(200).json(
        new ApiResponse(
            200,
            searchedProducts,
            (searchedProducts.length == 0) ? "No matching products" : "Success"
        )
    )
});

const getProductInfo = asyncHandler( async (req, res) => {
    // take product id as input
    // search for that product in Product collection
    // check if that product exists.
    // then send the information of that product in response.
    // hiding some information, such as seller id, etc and other fields.
    // const { _id}
    const { productId } = req.body;
    // let product = await Product.findById(productId);
    // let user = await User.findById(product.productSeller);
    const productWithCustomerInfo = await Product.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(productId)
            }
        },
        {
            $lookup: {
                from: 'users',           // The collection to join
                localField: 'productSeller',    // Field from the orders collection
                foreignField: '_id',         // Field from the customers collection
                as: 'sellerInfo'           // Output array field
            }
        },
        {
            $unwind: '$sellerInfo'        // Deconstructs the customerInfo array
        },
        {
            $project: {
                'sellerInfo.password': 0,
                'sellerInfo.refreshToken': 0
            }
        }
    ]);

    // console.log(productWithCustomerInfo);
    if ( productWithCustomerInfo.length == 0 ){
        throw new ApiError(401, "Invalid Product Id");
    };
    
    res.status(200).json(
        new ApiResponse(
            200,
            productWithCustomerInfo
        )
    )

})

const getNewProducts = asyncHandler( async(req, res) => {
    let currentDate = new Date();
    let newProducts = await Product.find({
        // {createdAt: {
        //     $gt: currentDate.setDate(currentDate.getDate() - 10)
        // },
        isAvailable: true
    }  
    ).sort({createdAt: -1  })
    if ( newProducts.length === 0 ) {
        return res.status(200).json(
            new ApiResponse(
                200,
                [],
                "No New Arrivals"
            )
        )
    };
    return res.status(200).json(
        new ApiResponse(
            200,
            newProducts
        )
    )
});


const postAddProduct = asyncHandler( async (req, res) => {
    // take info -> req.body
    // for picture use middleware multer for uploading picture to backend,
    // then use cloudinary service for uploading on cloud.
    // check every required field presence.
    // create a user object with these fields, Product.create()
    // check the creation of the product document .
    // send the product object in the response.
    const {
        title, 
        description,
        brand,
        price,
        quantity
    } = req.body;

    if (
        [title, description, brand, price, quantity].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(
            400,
            "All fields are required"
        );
    };

    const existedProduct = await Product.findOne(
        {
            title
        }
    );

    if ( existedProduct ){
        throw new ApiError(
            409,
            "Product with same title already listed."
        );
    };
    // res.send(req.files);
    // for uploading image to cloudinary.
    const productImageLocalPath = req.files?.productImage[0]?.path;

    if( !productImageLocalPath ){
        throw new ApiError(
            400,
            "Product Image is required"
        );
    };

    const productImage = await uploadOnCloudinary(productImageLocalPath);

    if ( !productImage ){
        throw new ApiError(
            500,
            "Internal Server Error! Something went wrong when upload file on cloud, kindly upload again"
        );
    };

    const newProduct = await Product.create({
        title,
        description,
        brand,
        quantity,
        price,
        productImageUrl: productImage.url,
        productSeller: req.user._id
    });

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { isSeller: true }
        },
        { new: true }
    );

    let checkProduct = await Product.findById(newProduct._id).select(
        "-productSeller"
    );
    if ( !checkProduct ){
        throw new ApiError(
            500,
            "Internal Server Error! Something went wrong when creating product on database"
        );
    };

    return res.status(201).json(
        new ApiResponse(
            201,
            checkProduct,
            "Product Listed Successfully"
        )
    );
});

const patchAddFeatures = asyncHandler( async (req, res) => {
    // required field to be changed, and the value.
    // fields can be price, title, for this check the userId == sellerId of the product.
    // if not equals , then throw error, that only owner of the product can change the information.
    // otherwise, continue with the changes.
    // take the field_name, and value from req.body and update the values , using  `findByIdAndUpdate` function.
    // optional: check the updation -> not recommended.
    // send the updated document of that to the user without the private information.

    const { productId, productSellerId, features } = req.body;
    if ( req.user._id != productSellerId ){
        throw new ApiError(
            401,
            "Unauthorized request! Only product owner can modify any fields"
        );
    };

    let updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            $set: {
                features: features
            }
        },
        { new: true }
    );

    if ( !updatedProduct ){
        throw new ApiError(404, "Product not found.");
    };

    console.log(updatedProduct);

    res.status(200).json(
        new ApiResponse(
            200,
            updatedProduct,
            "Product Updated Successfully"
        )
    );
});

const  patchChangeAvailabilityOfProduct = asyncHandler ( async (req, res) => {
    // for deleting the product, take product id,
    // do not fully delete the product.
    // change the availability of product.
    // make it unavailable, for the future.
    // do not show the product.
    
    const { productId, sellerProductId } = req.body;
    // console.log(sellerProductId == req.user._id);
    // console.log("seller ProductId: ", sellerProductId);
    // console.log("user id : ", req.user._id.toString());
    console.log( req.user._id == sellerProductId);
    if ( req.user._id != sellerProductId ){
        throw new ApiError(
            401,
            "Unauthorized request, Only Product Owner can change status."
        )
    };

    // const updatedProduct = await Product.findByIdAndUpdate(
    //     productId,
    //     {
    //         $set: { isAvailable: !isAvailable }
    //     },
    //     { new: true }
    // );
    const updatedProduct = await Product.findByIdAndUpdate(productId);
    let beforeUpdating = updatedProduct.isAvailable;
    updatedProduct.isAvailable = !updatedProduct.isAvailable;
    await updatedProduct.save({
        validateBeforeSave: false
    });

    // verifying change.
    if ( updatedProduct.isAvailable === beforeUpdating ){
        throw new ApiError(
            500,
            "Internal Server Error! Something went wrong when updating the availability status."
        );
    };

    res.status(200).json(
        new ApiResponse(
            200,
            "Product availability status updated successfully"
        )
    );
}
);

module.exports = {
    getProducts,
    postProductSearch,
    getNewProducts,
    getProductInfo,
    postAddProduct,
    patchAddFeatures,
    patchChangeAvailabilityOfProduct

}
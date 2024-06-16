const Product = require('./../models/product.model.js');
const User = require('./../models/user.model.js');

const asyncHandler = require('./../utils/asyncHandler.js');

const getProducts = async (req, res) => {
    // get all products
    // no verificatin required -> like user donot have to login.
    // check that the product is available.

    // send all available products in response.
};

const postProductSearch = asyncHandler( async (req, res) => {
    // take search keyword -> req.body
    // search for those keywords, do a full search , like done in Safwaat, check Safwaat repo for reference.
    // take the objects and send them in response, 
});

const getProductInfo = async (req, res) => {
    // take product id as input
    // search for that product in Product collection
    // check if that product exists.
    // then send the information of that product in response.
    // hiding some information, such as seller id, etc and other fields.
    
};

const postAddProduct = async (req, res) => {
    // take info -> req.body
    // for picture use middleware multer for uploading picture to backend,
    // then use cloudinary service for uploading on cloud.
    // check every required field presence.
    // create a user object with these fields, Product.create()
    // check the creation of the product document .
    // send the product object in the response.
};

const patchChangeProductField = async (req, res) => {
    // required field to be changed, and the value.
    // fields can be price, title, for this check the userId == sellerId of the product.
    // if not equals , then throw error, that only owner of the product can change the information.
    // otherwise, continue with the changes.
    // take the field_name, and value from req.body and update the values , using  `findByIdAndUpdate` function.
    // optional: check the updation -> not recommended.
    // send the updated document of that to the user without the private information.

};

const  deleteProduct = async (req, res) => {
    // for deleting the product, take product id,
    // do not fully delete the product.
    // change the availability of product.
    // make it unavailable, for the future.
    // do not show the product.
};

module.exports = {
    getProducts,
    postProductSearch,
    getProductInfo,
    postAddProduct,
    patchChangeProductField,
    deleteProduct

}
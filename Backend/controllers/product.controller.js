const Product = require('./../models/product.model.js');
const User = require('./../models/user.model.js');

const asyncHandler = require('./../utils/asyncHandler.js');

const getProducts = async (req, res) => {
    // get all products
    // no verificatin required -> like user donot have to login.
    // show all products.
};

const postProductSearch = asyncHandler( async (req, res) => {

});

const getProductInfo = async (req, res) => {

};

const postAddProduct = async (req, res) => {

};

const patchChangeProductField = async (req, res) => {
    // required field to be changed, and the value.
};

const  deleteProduct = async (req, res) => {

};

module.exports = {
    getProducts,
    postProductSearch,
    getProductInfo,
    postAddProduct,
    patchChangeProductField,
    deleteProduct

}
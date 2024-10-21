
const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/product.model.js');
const Cart = require('../models/cart.model.js');

router.post("/create-checkout-session",async(req,res)=> {
    try {
        const {products, totalAmount} = req.body;
        // console.log(products);
        console.log(products);
        const lineItems = products.map((product) => ({
            price_data:{
                currency:"usd",
                product_data:{
                    name:product.name,
                    images:[product.image]
                },

                unit_amount: ((product.price*1.17).toFixed(2))*100,
            },
            quantity:parseInt(product.quantity)
        }));
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:"http://127.0.0.1:3000/success",
            cancel_url:"http://127.0.0.1:3000/cancel",
        })

        for (const product of products) {
            const dbProduct = await Product.findById(product._id); // Find the product by its ID
            if (dbProduct) {
                dbProduct.quantity -= product.quantity; // Deduct the bought quantity from available stock
                await dbProduct.save(); // Save the updated product back to the database
            }
        }

        res.json({id:session.id})
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;

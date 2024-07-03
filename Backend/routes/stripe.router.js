const express = require('express');
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
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
        res.json({id:session.id})
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;

// require('dotenv').config()
const dotenv = require('dotenv');
const app = require('./app.js');
const { connectDB } = require('./db/config.js');
const { PORT } = require('./constants.js');

// Importing Router middlewares
const UserRouter = require('./routes/user.router.js');
const ProductRouter = require('./routes/product.router.js');
const CartRouter = require('./routes/cart.router.js');
const WishlistRouter = require('./routes/wishlist.router.js');
const CouponRouter = require('./routes/coupon.router.js');
const UsedCouponRouter = require('./routes/usedCoupon.router.js');
const OrderRouter = require('./routes/order.router.js');
const PaymentRouter = require('./routes/payment.router.js');
const StripeRouter = require('./routes/stripe.router.js');
const MessageRouter = require('./routes/mesage.router.js');

dotenv.config({
    path: './.env'
});

// "immediately invoked function expression" (IIFE)
//check info about IIFE in ./db/config.js
//; is used in start of IIFE to command the translator that last command is ended , as now , usually people dont place semi-colon after commands in Javascript.
;(async() => {
  try{
      await connectDB(); // first we wait for our server to connect with mongoDB database server.
      app.listen(PORT, () => {
        console.log(`Server is running on port : ${PORT}`);
    })
  } catch(error){
    console.log("MONGO db Connection Failed in index.js !!! ", err)
  }

})()

//Configuring Router Middleware
app.use("/user", UserRouter);
app.use("/product", ProductRouter);
app.use("/cart", CartRouter);
app.use("/wishlist", WishlistRouter);
app.use("/coupon", CouponRouter);
app.use("/useCoupon", UsedCouponRouter);
app.use("/order", OrderRouter);
app.use("/payment", PaymentRouter);
app.use("/stripe", StripeRouter);
app.use("/message", MessageRouter);
// require('dotenv').config()
const dotenv = require('dotenv');
const app = require('./app.js');
const { connectDB } = require('./db/config.js');
const { PORT } = require('./constants.js');

// Importing Router middlewares
const UserRouter = require('./routes/user.router.js');

dotenv.config({
    path: './env'
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

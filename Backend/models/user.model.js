const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const { Schema } = mongoose;
const userSchema = new Schema(
    {
        //username
        //email
        // fullName
        // avatar -> not required for sign up now.
        // password
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        fullName: {
            // firstName: {
            //     type: String,
            //     required: true,
            //     trim: true,
            // },
            // middleName:{
            //     type: String,
            //     trim: true,
            //     default: null,
            // },
            // lastName: {
            //     type: String,
            //     required: true,
            //     trim: true,
            // }
            type: String,
            required: true,
            trim: true,
             
        },
        avatar: {
            type: String, // cloudinary URL
            // required: true,
        },
        // address: { // billing address
        //     houseNumber: {
        //         type: String,
        //         // required: true,
                
        //     }, city: {
        //         type: String,
        //         // required: true,
        //     }, postalCode: {
        //         type: Number,
        //         // required: true
        //     }, country: {
        //         type: String,
        //         // required: true
        //     }, otherInformation: {
        //         type: String,
        //         trim: true,
                
        //     }
        // },
        phoneNumber: {
            type: Number
        },
        shippingAddress: [
            {   
                address: {
                    type: String,
                    trim: true,
                },
                postalCode: {
                    type: Number,
                },
                otherInformation: {
                    type: String,
                    trim: true
                }
            }
        ],
        isSeller: {
            type: Boolean, 
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        // likedProducts: [
        //     {
        //         type: Schema.Types.ObjectId, // to reference an object
        //         ref: "Product"
        //     }
        // ],
        purchasedProducts: [
            {
                productPurchased: {
                    type: Schema.Types.ObjectId,
                    ref: "Product"
                },
                feedbackGiven: {
                    type: Boolean,
                    default: false
                }
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String,

        },
        availedCoupons: [ // stores used coupons information, so that that user cannot use them in future.
            {
                type: Schema.Types.ObjectId,
                ref: "Coupon"
            }
        ],
        isCompletedProfile: { // coz for order placing address is requried.
            type: Boolean,
            default: false
        }
        // Payment information of user such as Metamask wallet account acces etc, for transaction processing.
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function(next){
    //Hash only if password is modified.
    if(!this.isModified('password')) return next();

    try{
        //hash password generation
        // salt
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;

        return next();
    }catch(error){
        return next(error);
    }

    
})

userSchema.methods.passwordValidator = async function(enteredPassword){
    try{
        return await bcrypt.compare(enteredPassword, this.password);
    }catch(err){
        throw err;
    }
};

userSchema.methods.generateAccessToken = function () {
    return JWT.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
            isAdmin: this.isAdmin,
            isSeller: this.isSeller    
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return JWT.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};
const User = mongoose.model("User", userSchema);

module.exports = User;
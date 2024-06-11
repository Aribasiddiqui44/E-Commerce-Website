import mongoose, {Schema} from "mongoose";
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
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
            firstName: {
                type: String,
                required: true,
                trim: true,
            },
            middleName:{
                type: String,
                trim: true,
                default: null,
            },
            lastName: {
                type: String,
                required: true,
                trim: true,
            }
        },
        avatar: {
            type: String, // cloudinary URL
            required: true,
        },
        likedBooks: [
            {
                type: Schema.Types.ObjectId, // to reference an object
                ref: "Book"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String,

        }
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
        const hashedPassword = bcrypt.hash(this.password, salt, 10);
        next();
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
            fullName: this.fullName
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

export const User = mongoose.model("User", userSchema)
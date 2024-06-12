import mongoose, {Schema} from "mongoose";

const orderSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    }
},
{
    timestamps: true
});

export const Order = mongoose.model("Order", orderSchema)
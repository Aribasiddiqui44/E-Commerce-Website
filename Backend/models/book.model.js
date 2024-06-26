import mongoose , { Schema, mongo } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const bookSchema = new Schema(
    {

    }
);

bookSchema.plugin(mongooseAggregatePaginate);
 
export const Book = mongoose.model("Book", bookSchema)
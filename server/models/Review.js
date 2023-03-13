const mongoose = require('mongoose')

const schema = mongoose.Schema;
const ReviewSchema = schema({
    productId: {
        type: String,
        required: true
    },
    user: {
        id: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        }
    },
    review: {
        rating: {
            type: Number,
            required: true
        },
        text: {
            type: String
        }
    }


}, { timestamps: true });
const Review = mongoose.model("Review", ReviewSchema)
module.exports = Review
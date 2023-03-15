const mongoose = require("mongoose");
const express = require("express")
const Review = require("../models/Review")
const Product = require("../models/Product")

const get_product_reviews = async (req, res) => {
    const { id } = req.params;
    try {
        const reviews = await Review.find({ productId: id }).sort({ createdAt: -1 })
        res.status(200).json(reviews)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const post_review = async (req, res) => {
    const { productId, user: { userName }, review: { rating, votes }, userReview } = req.body;
    const id = req.user._id;
    try {

        const response = await Review.create({
            productId,
            user: {
                userName, id
            },
            review: userReview
        });
        if (response) {
            // increment votes inside Product model after creating the review
            await Product.findByIdAndUpdate({ _id: productId },
                {
                    $inc: { "review.votes": 1 },
                },
            )
            await Product.findByIdAndUpdate({ _id: productId },
                {
                    "review.rating": ((votes * rating + userReview.rating) / (votes + 1))
                },
            )

        }
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    post_review,
    get_product_reviews,
}
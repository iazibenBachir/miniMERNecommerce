const { query } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const { countDocuments } = require("../models/Product");
const Product = require("../models/Product");

const get_products = async (req, res) => {
  const payload = req.query
  let query = {
  }

  for (const key in payload) {
    if (key !== "page") {
      console.log("===", payload[key])
      query[key] = { $in: Array.isArray(payload[key]) ? payload[key] : new Array(payload[key]) }

    }

  }

  try {
    let page = parseInt(req.query.page) - 1 || 0
    const limit = 8;
    const total = await Product.countDocuments(query);
    console.log(query)
    const products = await Product.find(query).skip(page * limit).limit(limit)
    const response = {
      total,
      limit,
      page: page + 1,
      products
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const get_single_product = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such id" });
  }

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const search_products = async (req, res) => {
  const query = req.query;
  const queryObj = {}
  if (query.brand !== "all") {
    queryObj.name = { $regex: query.q, $options: "i" }
    queryObj.brand = { $in: [query.brand] }
  } else {
    queryObj.name = { $regex: query.q, $options: "i" }
  }

  try {
    console.log("-----------", queryObj)
    const products = await Product.find(queryObj)
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



/*

const post_product = async (req, res) => {
  const product = req.body
  try {
    const response = await Product.create(product)
    res.status(200).json(response)
  } catch (err) {
    res.status(400).json({ error: err.message });

  }
}

*/


module.exports = {
  get_single_product,
  get_products,
  search_products,
  // post_product,
};


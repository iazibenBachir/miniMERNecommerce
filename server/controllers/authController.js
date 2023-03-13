const express = require("express");
const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const maxAge = 60 * 60 * 24 * 3 // 3days (ms)

const creatToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: maxAge })
}
const register_user = async (req, res) => {
  const { email, password, username } = req.body
  try {
    const user = await User.signup(email, password, username);
    const userId = user._id;
    const token = creatToken(userId);
    res.status(200).json({ token, userId })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

};

const login_user = async (req, res) => {
  const { email, password } = req.query;

  try {
    const user = await User.login(email, password);
    const userId = user._id;
    const token = creatToken(userId)
    const username = user.username
    res.status(200).json({ token, username })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};


module.exports = {
  login_user,
  register_user,
};

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const productsRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes")
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());




const url = "mongodb://localhost:27017/ShopAppDB";
mongoose.set("strictQuery", false);
mongoose
  /* process.env.MONGO_URI*/
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then((result) =>
    app.listen(process.env.PORT, () => {
      console.log("server running on port", process.env.PORT);
    })
  )
  .catch((err) => console.log(err.message));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.get("/", (req, res) => {
  res.json({ msg: "Welcom to home page" });
});

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/review", reviewRoutes)

//import productsController
const productsController = require("../controllers/productsController");
const express = require("express");
const router = express.Router();

//router.post("/", productsController.post_product);
//router.get("/best-selling", productsController.get_bestselling_products);
router.get("/", productsController.get_products);
router.get("/search", productsController.search_products);
router.get("/:id", productsController.get_single_product);


module.exports = router;

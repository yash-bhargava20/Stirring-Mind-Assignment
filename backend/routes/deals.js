const express = require("express");
const router = express.Router();
const {
  getAllDeals,
  getDealById,
  getCategories,
  getFeaturedDeals,
} = require("../controllers/dealController");

router.get("/", getAllDeals);
router.get("/categories", getCategories);
router.get("/featured", getFeaturedDeals);
router.get("/:id", getDealById);

module.exports = router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  claimDeal,
  getUserClaims,
  getClaimStats,
} = require("../controllers/claimController");

// Protected routes
router.post("/", authMiddleware, claimDeal);
router.get("/user/claims", authMiddleware, getUserClaims);
router.get("/stats", authMiddleware, getClaimStats);

module.exports = router;

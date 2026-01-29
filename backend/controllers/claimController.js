const Claim = require("../models/Claim");
const Deal = require("../models/Deal");

exports.claimDeal = async (req, res) => {
  try {
    const { dealId } = req.body;
    const userId = req.user.userId;

    if (!dealId) {
      return res.status(400).json({
        success: false,
        message: "Deal ID is required",
      });
    }

    // Check if deal exists
    const deal = await Deal.findById(dealId);
    if (!deal) {
      return res.status(404).json({
        success: false,
        message: "Deal not found",
      });
    }

    // Check if already claimed
    const existingClaim = await Claim.findOne({ user: userId, deal: dealId });
    if (existingClaim) {
      return res.status(400).json({
        success: false,
        message: "You have already claimed this deal",
      });
    }

    // Create claim
    const claim = await Claim.create({
      user: userId,
      deal: dealId,
      status: "Approved",
    });

    // Increment deal claim count
    await Deal.findByIdAndUpdate(dealId, { $inc: { claimCount: 1 } });

    res.status(201).json({
      success: true,
      message: "Deal claimed successfully",
      claim,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserClaims = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { status } = req.query;

    let filter = { user: userId };
    if (status && status !== "All") {
      filter.status = status;
    }

    const claims = await Claim.find(filter)
      .populate("deal", "title company category discount value")
      .sort({ claimedAt: -1 });

    res.json({
      success: true,
      claims,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getClaimStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const totalClaimed = await Claim.countDocuments({ user: userId });
    const approved = await Claim.countDocuments({
      user: userId,
      status: "Approved",
    });
    const pending = await Claim.countDocuments({
      user: userId,
      status: "Pending",
    });

    // Calculate total value
    const claimsWithValue = await Claim.find({ user: userId }).populate(
      "deal",
      "value",
    );

    const totalValue = claimsWithValue.reduce(
      (sum, claim) => sum + (claim.deal?.value || 0),
      0,
    );

    res.json({
      success: true,
      stats: {
        totalClaimed,
        approved,
        pending,
        totalValue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

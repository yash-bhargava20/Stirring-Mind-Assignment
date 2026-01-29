const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    deal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Approved",
      index: true,
    },
    claimCode: {
      type: String,
      unique: true,
      required: true,
    },
    claimedAt: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true },
);

// Unique index to prevent duplicate claims
claimSchema.index({ user: 1, deal: 1 }, { unique: true });

// Generate unique claim code before save
claimSchema.pre("save", async function (next) {
  if (!this.claimCode) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.claimCode = `${timestamp}-${random}`;
  }
  next();
});

module.exports = mongoose.model("Claim", claimSchema);

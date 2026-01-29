const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Cloud",
        "Marketing",
        "Analytics",
        "Productivity",
        "Design",
        "Development",
      ],
      required: true,
      index: true,
    },
    discount: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    accessLevel: {
      type: String,
      enum: ["Unlocked", "Locked"],
      default: "Unlocked",
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    benefits: [String],
    partnerInfo: {
      website: String,
      logo: String,
    },
    claimCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Deal", dealSchema);

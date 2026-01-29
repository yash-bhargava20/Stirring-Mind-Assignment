const Deal = require("../models/Deal");

exports.getAllDeals = async (req, res) => {
  try {
    const { category, accessLevel, search, page = 1, limit = 12 } = req.query;

    let filter = { isActive: true };

    if (category && category !== "All") {
      filter.category = category;
    }

    if (accessLevel && accessLevel !== "All") {
      filter.accessLevel = accessLevel;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const deals = await Deal.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort({ isFeatured: -1, createdAt: -1 });

    const total = await Deal.countDocuments(filter);

    res.json({
      success: true,
      deals,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDealById = async (req, res) => {
  try {
    const { id } = req.params;

    const deal = await Deal.findById(id);

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: "Deal not found",
      });
    }

    res.json({
      success: true,
      deal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Deal.distinct("category", { isActive: true });

    res.json({
      success: true,
      categories: ["All", ...categories],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getFeaturedDeals = async (req, res) => {
  try {
    const deals = await Deal.find({ isFeatured: true, isActive: true }).limit(6);

    res.json({
      success: true,
      deals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const likedProductModel = require("../../models/likedProduct");

const likedProductView = async (req, res) => {
  try {
    const currentUser = req.userId;

    // Check if user ID exists
    if (!currentUser) {
      return res.status(401).json({
        message: "Unauthorized: No user ID provided.",
        error: true,
        success: false,
      });
    }

    // Fetch all products added to the cart by the current user
    const allViewProducts = await likedProductModel.find({
      userId: currentUser,
    }).populate("productId");

    // Respond with the list of products
    res.status(200).json({
      data: allViewProducts,
      success: true,
      error: false,
    });

  } catch (err) {
    // Handle errors
    res.status(500).json({
      message: err.message || "An error occurred while fetching cart products.",
      error: true,
      success: false,
    });
  }
};

module.exports = likedProductView;
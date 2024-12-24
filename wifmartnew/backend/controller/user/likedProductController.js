const likedProductModel = require("../../models/likedProduct");

const likedProductController = async (req, res) => {
  try {
    const { productId } = req?.body; // Get product ID from request body
    const currentUser = req?.userId;  // Get user ID from authToken middleware

    // If user is not authenticated, send login prompt
    if (!currentUser) {
      return res.status(401).json({
        message: "Please Login to like product.",
        success: false,
        error: true
      });
    }

    // Check if the product is already liked by the user
    const isLikedProductAvailable = await likedProductModel.findOne({ productId, userId: currentUser });

    if (isLikedProductAvailable) {
      // If product is already liked, unlike it (remove from liked products)
      await likedProductModel.deleteOne({ productId, userId: currentUser });

      return res.json({
        message: "Product Unliked",
        action: "unliked", // Return action to help the frontend distinguish between like and unlike
        success: true,
        error: false
      });
    } else {
      // Create payload for new liked product
      const payload = {
        productId: productId,
        quantity: 1, // Optional if needed, otherwise omit
        userId: currentUser,
      };

      // Add product to liked products and save to database
      const newLikedProduct = new likedProductModel(payload);
      const likedProduct = await newLikedProduct.save();

      return res.json({
        data: likedProduct,
        message: "Product Liked",
        action: "liked", // Return action to help frontend handle UI changes
        success: true,
        error: false
      });
    }

  } catch (err) {
    // Catch any errors and return a response
    res.status(500).json({
      message: err?.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = likedProductController;



// const likedProductModel = require("../../models/likedProduct");

// const likedProductController = async (req, res) => {
//   try {
//     const { productId } = req?.body; // Get product ID from request body
//     const currentUser = req?.userId;  // Get user ID from authToken middleware

//     // If user is not authenticated, send login prompt
//     if (!currentUser) {
//       return res.status(401).json({
//         message: "Please Login to like product.",
//         success: false,
//         error: true
//       });
//     }

//     // Check if the product is already in the user's cart
//     const isLikedProductAvailable = await likedProductModel.findOne({ productId, userId: currentUser });

//     if (isLikedProductAvailable) { // If product already in cart, show error
//       return res.json({
//         message: "Product Unliked",
//         success: false,
//         error: true
//       });
//     }

//     // Create payload for new cart entry
//     const payload = {
//       productId: productId,
//       quantity: 1,
//       userId: currentUser,
//     };

//     // Add product to cart and save to database
//     const newLikedProduct = new likedProductModel(payload);
//     const likedProduct = await newLikedProduct.save();

//     res.json({
//       data: likedProduct,
//       message: "Product Liked",
//       success: true,
//       error: false
//     });

//   } catch (err) {
//     // Catch any errors and return a response
//     res.status(500).json({
//       message: err?.message || err,
//       error: true,
//       success: false
//     });
//   }
// };

// module.exports = likedProductController;
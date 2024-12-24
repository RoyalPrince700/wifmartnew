const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: { type: String, required: true },
    brandName: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, default: "" },
    hotDeal: { type: String, default: "" },
    productStatus: { type: String, default: "Available" },
    item: { type: Number, required: true, min: 0 },
    productImage: { type: [String], default: [] },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    sellingPrice: { type: Number, required: true, min: 0 },
}, {
    timestamps: true,
});

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;

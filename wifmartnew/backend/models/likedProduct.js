const mongoose = require('mongoose')

const likedProduct = mongoose.Schema({
  productId : {
    ref : 'product',
    type : String,
  },
  quantity : Number,
  userId : String,
},{
    timestamps : true
})

const likedProductModel = mongoose.model("likedProduct",likedProduct)

module.exports = likedProductModel
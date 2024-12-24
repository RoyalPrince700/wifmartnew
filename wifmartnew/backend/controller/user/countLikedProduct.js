
const likedProductModel = require("../../models/likedProduct")


const countLikedProduct = async (req,res)=>{
    try{
        const userId = req.userId

        const count = await likedProductModel.countDocuments({
            userId : userId
        })

        res.json({

            data : {
                count : count
            },
            message : "ok",
            error : false,
            success : true
        })

    }catch(err){
        res.json({
            message : err.message || error,
            error : false,
            sucess : false
        })
        
    }
}

module.exports = countLikedProduct
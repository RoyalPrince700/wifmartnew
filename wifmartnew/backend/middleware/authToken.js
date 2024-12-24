
const jwt = require('jsonwebtoken')

async function authToken(req,res,next){
    try{
        const token = req.cookies?.token 

            console.log("token",token)
        if(!token){
            return res.status(200).json({
                message : "Please Login...!",
                error : true,
                success : false
            })
        }

            // verify a token symmetric
            jwt.verify(token,  process.env.TOKEN_SECRET_KEY, 
              function(err, decoded) 
            {
                console.log(err)
                console.log("decocded", decoded)

                if(err){
                    console.log("error auth", err)
                }
                req.userId = decoded?._id

                next()


            });
  

    }catch(err){
            res.status(400).json({
                message :  err.message || err,
                data : [],
                error : true,
                success : false
            })
    }
}

module.exports = authToken


/*const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token; // Retrieve token from cookies

    if (!token) {
      return res.status(401).json({
        message: "Please Login....", // Inform the user they need to log in
        error: true,
        success: false,
      });
    }

    // Verify the token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid token. Please login again.",
          error: true,
          success: false,
        });
      }

      req.userId = decoded?._id; // Attach the decoded userId to the request object
      next(); // Proceed to the add-to-cart controller
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;*/



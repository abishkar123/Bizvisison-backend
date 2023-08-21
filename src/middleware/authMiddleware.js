import { findUse } from "../model/admin/AdminModel.js";
import { verifyAccessJWT } from "../utils/jwt.js";


 export const isAuth = async(req, res, next) =>{
    try {
        // al the authorization code process
        // get jwt from header

        const {authorization }= req.headers;

        //check jwet validation and in db
        const decoded = verifyAccessJWT(authorization);
      
        if(decoded?.email){
            //check if the payload in jwt matches in our admin
            const user = await findUse({
                email: decoded.email,

            });

            if(user?._id){
                req.userInfo = user;
                return next();
            }
        }
    res.status(403).json({
        status:"error",
        message:decoded,
    })
        
    } catch (error) {
        next(error);
        
    }
}


export const isValidAccessJWT = async (req, res, next) => {
    try {
      
      const { authorization } = req.headers;
      const decoded = verifyAccessJWT(authorization);
  
      if (decoded?.email) {
      
        const user = await findUse({
          email: decoded.email,
        });
  
        if (user?._id) {
          req.userInfo = user;
          return next();
        }
      }
  
  
      res.status(403).json({
        statu: "error",
        message: decoded,
      });
    } catch (error) {
      next(error);
    }
  };
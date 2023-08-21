import jwt from 'jsonwebtoken';
import { createNewSession } from '../model/session/sessionModel.js';
import { updateAdmin } from '../model/admin/AdminModel.js';

export const singAccessJWT = async( payload )=>{
    const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS, {
        expiresIn: "1m"
    });
    //store the key

    await createNewSession({
        associate:payload.email,
        token:accessJWT,
    })
    return accessJWT
 };

 export const verifyAccessJWT = (token)=>{
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS);
        return decoded;
        
    } catch (error) {
        return error.message.includes("jwt expired")
        ? "jwt expired"
        : error.message;
        
    }
 };

//refresh
  export const singRefreshJWT = async payload =>{
    const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH,{
        expiresIn: "30d",
    })
    // store the key
    await updateAdmin({
        email:payload.email,
        
    },{refreshJWT}) 
    return refreshJWT
 }


 export const verifyRefreshJWT = (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH);
  
      return decoded;
    } catch (error) {
      return "logout";
    }
  };
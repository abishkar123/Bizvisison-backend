import express from 'express'
import { CreateNewAdmin, GetAdmin, findUse, updateAdmin} from '../model/admin/AdminModel.js';
import { comparePassoword, hashPassword } from '../utils/bcrypt.js';
import { newAdminValidation, passResetValidation } from '../middleware/joimiddleware.js';
import { v4 as uuidv4 } from 'uuid';
import { emailOtp, emailVerifiedNotification, newAccountEamilVerification, passwordUpdateNotification } from '../utils/nodemailer.js';
import { numString } from '../helps/randomGenerator.js';
import { createNewSession, deleteSession } from '../model/session/sessionModel.js';
import { singAccessJWT, singRefreshJWT, verifyRefreshJWT } from '../utils/jwt.js';
import { isAuth } from '../middleware/authMiddleware.js';


const router = express.Router()

router.post ("/register", newAdminValidation, async (req, res, next)=>{
    
    try {

        req.body.password = hashPassword(req.body.password);
        req.body.emailVerificationCode = uuidv4()
    
        const result = await CreateNewAdmin(req.body)

        if(result?._id){
            const uniqueLink = `${process.env.FRONTEND_ROOT_URL}/verify?c=${result.emailVerificationCode}&email=${result.email}`;

            const link = await newAccountEamilVerification(uniqueLink, result);
            res.json({
                status: "success",
                message: "We Got You Info, We Will Shortly Conform Your Access!"
            })
        }

        res.json({
            status:"error",
            message:"Sorry, You Canot Join Bizvision, For more Info Contact 0280057003 ! "
        })

        
    } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            error.message =
              "There is already account exist associated with this email";
            error.errorCode = 200;
          }
          next(error)
        
    }
})


router.post("/verify", async (req, res, next) => {
    try {
      // chek if the combination of email and code exist in db if so set the status active and code to "" in the db, also update is email verified to true
  
      const obj = {
        status: "active",
        isEmailVerified: true,
        emailVerificationCode: "",
      };
  
      const user = await updateAdmin(req.body, obj);
     
  
      if (user?._id) {
        //send email notification
        emailVerifiedNotification(user);
  
        res.json({
          status: "success",
          message: "Your account has been verified. Now you can login",
        });
  
        return;
      }
  
      res.json({
        status: "error",
        message: "The link is invalid or expired.",
      });
    } catch (error) {
      next(error);
    }
  });

router.get("/", async(req, res, next)=>{
    try {
    
        const result = await GetAdmin()

    res.json({
        status:" success",
        message:"here is all admin info!",
        result,
    })
        
    } catch (error) {

        next (error)
        
    }
})


router.post ("/login",async (req, res, next)=>{
    try {
        const {email, password} = req.body;
       

        const user = await findUse({email})

        if(user?._id){
            const isPassMatch = comparePassoword(password, user.password)

            if(isPassMatch){
                user.password = undefined;
                user.__v = undefined;

                res.json({
                    status: "success",
                    message: "Login successfully !",

                    toknes:{
                      accessJWT: await singAccessJWT({ email }),
                      refreshJWT: await singRefreshJWT({ email }),

                    }
          
                })
                return;
            }
        }
        res.json({
            status: "error",
            message:"Invalid Login Details, Please Check Your Password and Username!"
        })
        
    } catch (error) {
        next(error)
        
    }

});


 // create OTP
 router.post("/request-otp",  async (req, res, next) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.json({
          status: "error",
          message: "Invalid request",
        });
      }
  
      const user = await findUse({ email });
  
      if (user?._id) {
        //create otp,
        const token = numString(6);

        const obj = {
          token,
          associate: email,
        };
        //store opt and emial in new tabale called sessions
        const result = await createNewSession(obj);
  
        if (result?._id) {
          //send that otp to their email
          emailOtp({ email, token });

  
          return res.json({
            status: "success",
            message:
              "We have sent you an OTP to your email, chek your email and fill up the form below.",
          });
        }
      }
  
      res.json({
        status: "error",
        message: "Wrong email",
      });
    } catch (error) {
      next(error);
    }
  });
 
   // password reset request
 router.patch("/reset-password",passResetValidation, async (req, res, next) => {
  try {
    const { email, opt, password } = req.body;
    console.log(req.body)

    const deletedToke = await deleteSession({ email, opt });

    if (deletedToke?._id) {
      //encrypt password and/update user password
     const user = await updateAdmin(
        { email },
        { password: hashPassword(password) },
      );
  
      if (user?._id) {
        //send email notification
        passwordUpdateNotification(user);

        return res.json({
          status: "success",
          message: "You password has been updated successfully",
        });
      }
    }

    res.json({
      status: "error",
      message: "Unable to update your password. Invalid or expired token",
    });
  } catch (error) {
    next(error);
  }
});

  

  // router user info 
  router.get("/user-profile",isAuth, (req,res, next)=>{
    try {
      const user = req.userInfo
      user.password = undefined

      res.json({
        status: "Success",
        message:"user found",
        user,
      })
      
    } catch (error) {
      next(error)
      
    }
  })

// return new access jwt
router.get("/new-accessjwt",async (req,res, next)=>{
    try {
      const {authorization} = req.headers;

      const {email}= verifyRefreshJWT(authorization);

    
if (email) {
  const user = await findUse({ email });

  if (user?.refreshJWT === authorization) {
    // create accessJWT and return
    const accessJWT = await singAccessJWT({ email });

    if (accessJWT) {
      return res.json({
        status: "success",
        accessJWT,
      });
    }
  }
}

res.status(401).json({
  status: "error",
  message: "unauthenticated",
});
} catch (error) {
next(error);
}
});
export default router;


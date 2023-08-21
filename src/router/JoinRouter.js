import express from 'express'
import { createNewJoinAccount } from '../model/join/JoinModel.js'
const router = express.Router()

//create the join Account 
router.post("/joinnow", async(req, res, next)=>{
    try {
        const result = await createNewJoinAccount(req.body)

        if(result?._id){
            return res.json({
                status: "success",
                message: "We got you info, We will shortly conform your Access!",

            })
        }

        res.json({
            status: "error",
            message: "you canot join Bizvision, For more info contact 02 8005 7003 ! ",
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

export default router;
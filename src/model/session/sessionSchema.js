import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "inactive",
      },
      token: {
        type: String,
        required: true,
       
      },
    associate: {
        type: String,
        required: true
      
        
      },
      
    },
    
    {
      timestamps: true,
    }
  );

  export default mongoose.model("resetpasses", sessionSchema)
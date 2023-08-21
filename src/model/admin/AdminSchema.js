import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "inactive",
      },
      fname: {
        type: String,
        required: true,
     
        
      },
      lname: {
        type: String,
        required: true,
       
      
        
      },

      email: {
        type: String,
        required: true,
        unique: true,
        index: 1,
      },

      phonenumber: {
        type: String,
        required: true,
        
       

      },
  
      password: {
        type: String,
        required:true,
    
        
       
      },

      confirmpassword: {
        type: String,
        
       
      },

      emailVerificationCode:{
        type: String,
        default:"",
      },
      isEmailVerified:{
        type:Boolean,
        default:false,
      },
      
    //   refreshJWT:{
    //     type: String,
    //   },
    },
    
    {
      timestamps: true,
    }
  );

  export default mongoose.model("admin_database", adminSchema)
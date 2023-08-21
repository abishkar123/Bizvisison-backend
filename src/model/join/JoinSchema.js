import mongoose from "mongoose";

const JoinSchema = new mongoose.Schema({
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
      companyname: {
        type: String,
        required: true,
        
      },
  
      companytype: {
        type: String,
        default:""
       
      },

      message:{
        type: String,
        default:""
    
      },
      
    },
    
    {
      timestamps: true,
    }
  );
  export default mongoose.model("join_bizvision", JoinSchema)
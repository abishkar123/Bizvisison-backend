import AdminSchema from "./AdminSchema.js";

export const CreateNewAdmin = (obj)=>{
    return AdminSchema(obj).save()
}

export const GetAdmin = ()=>{
    return AdminSchema.find()
}

export const updateAdmin = (filter, obj) => {
    return AdminSchema.findOneAndUpdate(filter, obj, { new: true });
  };
  

// export const getUser = async() =>{
//     const db = await clientPromise.db("admin_database")
// }

export const findUse  = (filter)=>{
    return AdminSchema.findOne(filter);
  }
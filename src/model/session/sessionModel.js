import sessionSchema from "./sessionSchema.js"

export const createNewSession = (obj)=>{
    return sessionSchema(obj).save();
}

// delete sessions
export const deleteSession = (filter)=>{
    return sessionSchema.findOneAndDelete(filter);}
import JoinSchema from "./JoinSchema.js";

export const createNewJoinAccount = (obj) =>{
    return JoinSchema(obj).save()
}
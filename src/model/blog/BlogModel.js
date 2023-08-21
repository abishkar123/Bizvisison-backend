import BlogSchema from "./BlogSchema.js";


export const getAllBlog = () => {
    return BlogSchema.find();
};
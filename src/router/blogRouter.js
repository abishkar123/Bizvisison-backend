import express from "express";

const router = express.Router();
import path from "path";
import { getAllBlog } from "../model/blog/BlogModel.js";
router.get("/", async (req, res, next) => {
    try {
        const blogs = await getAllBlog();
        res.json({
            status: "success",
            message: "Blog lists are here",
            blogs,
        });
    } catch (error) {
        next(error);
    }
});




export default router;
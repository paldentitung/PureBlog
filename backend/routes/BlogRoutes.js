import express from "express";
import {
  getAllBlogs,
  createBlog,
  deleteBlog,
} from "../controllers/BlogController.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);

export default router;

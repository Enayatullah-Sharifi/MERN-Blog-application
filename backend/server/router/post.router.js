import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getUsersPosts,
  updatePost,
} from "../controllers/post.controller.js";
import { authorization } from "../../utils/auth.js";

const router = express.Router();

router.post("/create", authorization, createPost);

router.get("/posts", getPosts);

router.get("/users/posts", authorization, getUsersPosts);

router.delete("/delete/:postId", authorization, deletePost);

router.put("/update/:id", authorization, updatePost);

router.get("/post/:id", getPost);

export default router;

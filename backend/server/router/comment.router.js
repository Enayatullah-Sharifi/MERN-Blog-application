import express from "express";
import { authorization } from "../../utils/auth.js";
import { createComment, getAllComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create/:postId", authorization, createComment);

router.get('/comments/:postId', getAllComments)

export default router;

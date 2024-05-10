import asyncHandler from "express-async-handler";
import Post from "../model/Post.js";
import Comment from "../model/Comment.js";

// @ ROUTE      POST    api/comment/create/:postId
// @ ACCESS     Private
export const createComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const comment = req.body.comment;
  const user = req.user._id;

  if (!comment) {
    res.status(400);
    throw new Error("Please live a comment then submit");
  }

  let post = await Post.findOne({ _id: postId });
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  } 
 
  const userAlreadyComents = await Comment.findOne({ user: user, post: post._id});
  if(userAlreadyComents) {
    res.status(400)
    throw new Error('Every user has the permission to comment once')
  }
  const newComment = await Comment.create({
    comment,
    user,
    post: postId,
  });

  if (!newComment) {
    res.status(400);
    throw new Error("Error while commenting the post");
  }

  res.status(201).json({
    success: true,
    message: "Comment created successfully",
    data: newComment,
  });
});

// @ ROUTE      GET     api/comment/comments/:postId
// @ ACCESS     Public
export const getAllComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ post: postId })
    .populate({
      path: "user",
      select: "name avatar",
    })
    .sort({ createdAt: -1 });

  if (!comments) {
    res.status(404);
    throw new Error("No Comment found!");
  }

  res.status(200).json({
    success: true,
    count: comments.length,
    message: "All comments",
    data: comments,
  });
});

// @ ROUTE      DELETE      api/comment/delete/:commentId
// @ ACCESS     Private
export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const user = req.user._id;
  const comment = await Comment.findByIdAndDelete({
    _id: commentId,
    user: user,
  });
  if (!comment) {
    res.status(500);
    throw new Error("Error deleting comment");
  }

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
    data: comment,
  });
});

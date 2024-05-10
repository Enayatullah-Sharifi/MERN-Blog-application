import asyncHandler from "express-async-handler";
import User from "../model/User.js";
import Post from "../model/Post.js";
import Comment from "../model/Comment.js";

// @ ROUTE      POST    api/post/create
// @ ACCESS     Private
export const createPost = asyncHandler(async (req, res) => {
  const userId = req.user;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    res.status(400);
    throw new Error("Not Allowed");
  }

  const { title, description, file } = req.body;
  if (!title || !description) throw new Error("Please fill all the inputs");

  const post = await Post.create({
    title,
    description,
    user: userId,
  });

  if (!post) {
    res.status(500);
    throw new Error("Error while creating post...");
  }
  res.status(201).json({
    success: true,
    message: "Post created successfully...",
    data: post,
  });
});

// @ ROUTE      GET     api/post/:userId/posts
// @ ACCESS     Public
export const getUsersPosts = asyncHandler(async (req, res) => {
  const cookieUserId = req.user._id;

  const user = await User.findOne({ _id: cookieUserId });
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 });

  if (!posts) {
    res.status(404);
    throw new Error("Resource not found");
  }

  res.status(200).json({
    success: true,
    message: "All posts",
    count: posts.length,
    data: posts,
  });
});

// @ ROUTE      GET     api/post/posts
// @ ACCESS     Public
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .populate({
      path: "user",
      select: "name",
    })
    .sort({ createdAt: -1 });

  if (!posts) {
    res.status(404);
    throw new Error("Resource not found");
  }

  res.status(200).json({
    success: true,
    message: "All posts",
    count: posts.length,
    data: posts,
  });
});

// @ ROUTE      DELETE      api/post/delete/:postId
// @ ACCESS     Private
export const deletePost = asyncHandler(async (req, res) => {
  // console.log(req.params);
  const { postId } = req.params;
  const userId = req.user._id;

  const post = await Post.findOne({ _id: postId });
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.user.toString() !== userId.toString()) {
    res.status(401);
    throw new Error("Not Allowed");
  }

  await Post.deleteOne(post);
  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
    data: post,
  });
});

// @ ROUTE      PUT     api/post/update/:postId
// @ ACCESS     Private
export const updatePost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  let post = await Post.findOne({ _id: id });
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.user.toString() !== userId.toString()) {
    res.status(401);
    throw new Error("Not Allowed");
  }

  post = await Post.findOneAndUpdate(post, { $set: req.body }, { new: true });

  res.status(200).json({
    success: true,
    message: "Post updated successfully",
    data: post,
  });
});

// @ ROUTE      GET     api/post/post/:id
// @ ACCESS     Public
export const getPost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findOne({ _id: id }).populate({
    path: "user",
    select: "name",
  });

  if (!post) {
    res.status(404);
    throw new Error("No post found");
  }

  res.status(200).json({
    success: true,
    message: "Single post",
    data: post,
  });
});

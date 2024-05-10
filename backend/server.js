import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./server/db/db.js";
import cors from "cors";
import colors from "colors";
import errorHandler from "./utils/errorHandler.js";
import authRouter from "./server/router/auth.router.js";
import postRouter from "./server/router/post.router.js";
import commentRouter from "./server/router/comment.router.js";
import cookieParser from "cookie-parser";
import path from 'path'

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/uploads', express.static('./uploads'))

ConnectDB();

app.use("/api/user", authRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

app.use(errorHandler);

const port = process.env.PORT || 1000;
app.listen(port, () =>
  console.log(`Server running on port ${port}`.underline.cyan.bold)
);

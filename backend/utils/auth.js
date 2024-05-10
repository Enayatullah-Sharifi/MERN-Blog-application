import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const authorization = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401);
    throw new Error("Access Denied!");
  }

  await jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) throw new Error("Access Denied!");
    if (user) {
      req.user = user;
      next();
    }
  });
});

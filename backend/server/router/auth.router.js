import express from "express";
import { logout, register, login, updateUser, getMe } from "../controllers/auth.controller.js";
import { authorization } from "../../utils/auth.js";
import upload from "../../utils/multer.js";
const router = express.Router();

router.post("/register", upload.single('file'), register);
router.post("/login", login);
router.get("/logout", authorization, logout);
router.put('/update',authorization ,upload.single('avatar') , updateUser)
router.get('/getMe', authorization, getMe)


export default router;

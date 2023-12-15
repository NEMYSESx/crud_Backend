import express from "express";
import login from "../controller/auth/login.js";
import forgetPassword from "../controller/auth/forgetPassword.js";
import forgetPassword_email from "../controller/auth/email.js";
import getUser from "../controller/user/getUser.js";
import getUserFriends from "../controller/user/getUserFriends.js";
import addRemoveFriend from "../controller/user/addRemoveFriend.js";
import getFeedPosts from "../controller/posts/getFeedPosts.js";
import getUserPosts from "../controller/posts/getUserPosts.js";
import likePost from "../controller/posts/likePost.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/forgetPassword", forgetPassword);
router.post("/forgetPassword_email", forgetPassword_email);

router.get("/:id", auth, getUser);
router.get("/:id/friends", auth, getUserFriends);
router.post("/:id/:friendId", auth, addRemoveFriend);
router.get("/", auth, getFeedPosts);
router.get("/:userId/posts", auth, getUserPosts);
router.patch("/:id/like", auth, likePost); //modify data on the server partially

export default router;

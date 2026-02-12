// import express from "express";
// import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { singleUpload } from "../middlewares/multer.js";
 
// const router = express.Router();

// router.route("/register").post(singleUpload,register);
// router.route("/login").post(login);
// router.route("/logout").get(logout);
// router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

// export default router;

import express from "express";
import { login, logout, register, updateProfile, requestPasswordChange, resetPassword } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// ----------------- Auth / Profile Routes -----------------
router.post("/register", singleUpload, register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);

// ----------------- Password Reset Routes -----------------
router.post("/request-password-change", requestPasswordChange);
router.post("/reset-password/:token", resetPassword);

export default router;

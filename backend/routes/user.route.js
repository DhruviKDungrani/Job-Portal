import express from "express";
import { register , login,  updateProfile, logout} from "../controllers/user.controller.js";
import  isAuthenticated  from "../middlewares/isAuthenticated.js";
import { multiUpload } from "../middlewares/multer.js";

const router = express.Router();


// router.post("/register", (req, res) => {
//   register(req, res);
// });  or we can write as given below

router.route("/register").post(multiUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,multiUpload, updateProfile);

export default router;

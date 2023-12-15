import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../../models/user.js";
import jwt from "jsonwebtoken";
dotenv.config();

const forgetPassword = async (req, res) => {
  const { newPassword, newConfirm_password } = req.body;
  const { id, token } = req.params;
  const user = await User.findOne({ _id: id });
  const newSecret = user._id + process.env.JWT_SECRET_KEY;
  try {
    const isMatch = jwt.verify(token, newSecret);
    if (isMatch) {
      if (newPassword && newConfirm_password) {
        if (newPassword == newConfirm_password) {
          const salt = await bcrypt.genSalt(10);
          const newHash_password = await bcrypt.hash(newPassword, salt);
          await User.findByIdAndUpdate(user._id, {
            $set: {
              password: newHash_password,
            },
          });
          res.status(200).json({ msg: "password changed successfully!!" });
        } else {
          res
            .status(401)
            .json({ msg: "password and confirm password donot match" });
        }
      } else {
        res.status(401).json({ msg: "All fields required" });
      }
    } else {
      res.status(401).json({ msg: "token invalid!!" });
    }
  } catch (err) {
    console.log(err);
  }
};
export default forgetPassword;

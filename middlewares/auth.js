import jwt from "jsonwebtoken";
import user from "../models/user.js";
const auth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("bearer")) {
    try {
      token = authorization.split(" ")[1];
      if (token) {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await user.findById(userId).select("-password");
        next();
      } else {
        res.status(401).json({ msg: "token not found" });
      }
    } catch (err) {
      console.log(err);
    }
  }
};
export default auth;

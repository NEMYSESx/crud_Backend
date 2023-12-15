import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email: email });
      if (user !== null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          if (process.env.JWT_SECRET_KEY) {
            const token = jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "10d" }
            );
            delete user.password;
            res.status(200).json({ token, msg: "login success" });
          } else {
            console.error("JWT_SECRET_KEY is missing or invalid.");
            res.status(500).json({ error: "Internal server error" });
            return;
          }
        } else {
          res.status(500).json({ error: "invalid credentials!!" });
        }
      } else {
        res.status(500).json({ error: "user donot exist" });
      }
    } else {
      res.status(401).json({ error: "all fields required" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default login;

import transporter from "../../config/emailConfig.js";
import User from "../../models/user.js";

const forgetPassword_email = async (req, res) => {
  console.log(req.body);
  try {
    const { email } = req.body;
    console.log(email);
    if (email) {
      const user = await User.findOne({ email: email });
      console.log(user);
      if (user !== null) {
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userId: user._id }, secret, {
          expiresIn: "15m",
        });
        const link = `http://localhost:3000/api/user/reset/${user._id}/${token}`;
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "click da link to reset the password",
          html: `<a href=${link}>click da damm link</a>`,
        });
        res.status(200).json({
          message: "password send successfully to your email",
          info: info,
        });
      } else {
        res.status(201).json({ status: "error", msg: "email not registered" });
      }
    } else {
      res
        .status(201)
        .json({ status: "error", error: "please enter the email" });
    }
  } catch (err) {
    res.status(404)({ error: err.message });
  }
};
export default forgetPassword_email;

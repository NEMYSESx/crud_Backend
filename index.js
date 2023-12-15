import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/userRoutes.js";
import register from "./controller/auth/register.js";
import createPost from "./controller/posts/createPost.js";

import auth from "./middlewares/auth.js";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(helmet()); // When you call helmet(), it returns a function that configures and sets various HTTP headers to improve security.
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); //The Cross-Origin-Resource-Policy header is designed to control whether the browser should allow the web page to request the specified resource from a different origin. It's a security feature that helps prevent certain types of Cross-Site Request Forgery (CSRF) attacks.
app.use(morgan("common")); //to see the logs
app.use(bodyParser.json({ limit: "30mb", extended: "true" })); //The "extended" syntax refers to a way of extending the standard URL encoding(URL encoding is a way of representing certain characters in a URL by replacing them with a percent sign followed by two hexadecimal digits ex = person[name]=Alice&person[age]=30&city=New%20York) to support more complex data structures like objects and arrays in a JSON-like format.and limit is the amount of data that can be encoded
//app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
//app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets"); //this is the place where the pictures or assets coming from form will get saved
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //this sets the name of the uploaded file but we here setted it to the orignal name
  },
});

const upload = multer({ storage });
app.post("/api/register", upload.single("picture"), register);
app.post("/api/posts", auth, upload.single("picture"), createPost); //we cant set it in routes folder as we need upload var and we cant use upload in route folder
app.use("/api", router);

const port = process.env.PORT || 6000;
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    app.listen(port, () => {
      console.log(`app is running on ${port}......`);
    });
  })
  .catch((err) => {
    console.log("connection failed with mongodb" + ", " + err.message);
    process.exit(1);
  });

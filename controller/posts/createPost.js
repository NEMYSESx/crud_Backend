import Post from "../../models/post.js";
import User from "../../models/user.js";

const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    if (userId && description && picturePath) {
      const user = await User.findById(userId);
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath,
        likes: {},
        comments: [],
      });
      await newPost.save();
      const post = await newPost.find();
      res.status(201).json(post);
    } else {
      res.status(400).send({ error: "fill all data" });
    }
  } catch (err) {
    res.status(409).json({ msg: err.message });
  }
};

export default createPost;

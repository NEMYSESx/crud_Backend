import Post from "../../models/post.js";

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export default getUserPosts;

import Post from "../../models/post.js";

const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export default getFeedPosts;

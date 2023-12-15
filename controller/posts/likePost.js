import Post from "../../models/post.js";

const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (userId) {
      if (isLiked) {
        //the user already liked the post and want to delete it
        post.likes.delete(userId);
      } else {
        post.likes.set(userId, true);
      }
      const updatePost = await Post.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
      );
      res.status(200).json(updatePost);
    } else {
      res.status(400).json({ error: "all fiels required" });
    }
  } catch (err) {
    res.send(404).json({ msg: err.message });
  }
};

export default likePost;

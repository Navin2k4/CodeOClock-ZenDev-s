import Post from '../models/post.model.js'
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

export const createPost = async (req, res) => {
    try {
        const { content, imageUrl } = req.body;
        const newPost = new Post({ content, imageUrl });
        await newPost.save();
        res.status(201).json(newPost);
      } catch (err) {
        res.status(500).json({ error: 'Failed to create post' });
      }
};

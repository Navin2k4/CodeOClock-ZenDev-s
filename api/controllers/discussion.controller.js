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

export const reactToPost = async (req, res) => {
  const postId = req.params.id; // Get the post ID from the URL
  const { emoji } = req.body; // Get the emoji from the request body

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Update the reaction count based on the emoji
    switch (emoji) {
      case '👍':
        post.reactions.like += 1;
        break;
      case '❤️':
        post.reactions.heart += 1;
        break;
      case '😂':
        post.reactions.smile += 1;
        break;
      case '😠':
        post.reactions.anger += 1;
        break;
      default:
        return res.status(400).json({ message: 'Invalid emoji' });
    }

    await post.save();
    res.status(200).json(post); // Respond with the updated post
  } catch (err) {
    res.status(500).json({ message: 'Error adding reaction', error: err });
  }
};
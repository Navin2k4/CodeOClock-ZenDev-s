import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Camera, Send, ThumbsUp, Heart, Laugh, Angry } from "lucide-react";

const CommunityForum = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/post/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/post/createpost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }), // Only send content
        }
      );
      const newPost = await response.json();
      setPosts([newPost, ...posts]); // Add the new post to the top of the list
      setContent("");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const handleLongPress = useCallback((postId) => {
    setShowEmojiPicker(postId);
  }, []);

  const handleReaction = async (postId, emoji) => {
    try {
      const response = await fetch(`http://localhost:3000/api/post/${postId}/react`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emoji }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add reaction");
      }
      const updatedPost = await response.json();
      setPosts(posts.map((post) => (post._id === postId ? updatedPost : post)));
    } catch (err) {
      console.error("Error adding reaction:", err);
    }
    setShowEmojiPicker(null);
  };

  // Separate posts into "My Posts" and "Other Posts"
  const myPosts = posts.filter((post) => post.userId === currentUser?.id);
  const otherPosts = posts.filter((post) => post.userId !== currentUser?.id);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-800">
            Share Your Thoughts
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-4 h-32 border border-green-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-6 rounded-full text-lg transition duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Post <Send size={18} className="ml-2" />
            </button>
          </form>
        </div>

        {/* My Posts Section */}
        <h3 className="text-xl font-bold text-green-800 mb-4">My Posts</h3>
        <div className="space-y-6 mb-8">
          {myPosts.length > 0 ? (
            myPosts.map((post) => (
              <Post
                key={post._id}
                post={post}
                handleLongPress={handleLongPress}
                handleReaction={handleReaction}
                showEmojiPicker={showEmojiPicker}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">
              You have not posted anything yet.
            </p>
          )}
        </div>

        {/* Other Posts Section */}
        <h3 className="text-xl font-bold text-green-800 mb-4">Other Posts</h3>
        <div className="space-y-6">
          {otherPosts.length > 0 ? (
            otherPosts.map((post) => (
              <Post
                key={post._id}
                post={post}
                handleLongPress={handleLongPress}
                handleReaction={handleReaction}
                showEmojiPicker={showEmojiPicker}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">
              No other posts available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Post component to encapsulate the post rendering logic
const Post = ({ post, handleLongPress, handleReaction, showEmojiPicker }) => (
  <div
    className="bg-white p-6 rounded-lg shadow-lg relative"
    onTouchStart={() => {
      const timer = setTimeout(() => handleLongPress(post._id), 500);
      return () => clearTimeout(timer);
    }}
    onTouchEnd={() => setShowEmojiPicker(null)}
    onMouseDown={() => {
      const timer = setTimeout(() => handleLongPress(post._id), 500);
      return () => clearTimeout(timer);
    }}
    onMouseUp={() => setShowEmojiPicker(null)}
    onMouseLeave={() => setShowEmojiPicker(null)}
  >
    <div className="mb-4">
      <h3 className="text-xl font-semibold text-green-800 mb-2">
        Posted by: {post.user}
      </h3>
      <p className="text-gray-700">{post.content}</p>
    </div>
    <div className="text-gray-500 text-sm mb-2">
      Posted on: {new Date(post.createdAt).toLocaleDateString()}
    </div>

    {/* Display reaction counts */}
    <div className="flex space-x-4 mb-2">
      <span className="text-gray-700">👍 {post.reactions.like}</span>
      <span className="text-gray-700">❤️ {post.reactions.heart}</span>
      <span className="text-gray-700">😂 {post.reactions.smile}</span>
      <span className="text-gray-700">😠 {post.reactions.anger}</span>
    </div>

    {showEmojiPicker === post._id && (
      <div className="absolute bottom-full left-0 bg-white p-2 rounded-lg shadow-lg flex space-x-2">
        <button
          onClick={() => handleReaction(post._id, "👍")}
          className="hover:bg-gray-100 p-1 rounded"
        >
          <ThumbsUp size={20} />
        </button>
        <button
          onClick={() => handleReaction(post._id, "❤️")}
          className="hover:bg-gray-100 p-1 rounded"
        >
          <Heart size={20} />
        </button>
        <button
          onClick={() => handleReaction(post._id, "😂")}
          className="hover:bg-gray-100 p-1 rounded"
        >
          <Laugh size={20} />
        </button>
        <button
          onClick={() => handleReaction(post._id, "😠")}
          className="hover:bg-gray-100 p-1 rounded"
        >
          <Angry size={20} />
        </button>
      </div>
    )}
  </div>
);

export default CommunityForum;
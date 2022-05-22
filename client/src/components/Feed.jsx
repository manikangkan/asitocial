import { useContext, useEffect, useState } from "react";
import Share from "./Share";
import Post from "./Post";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Feed = ({ username }) => {
  const [post, setPost] = useState([]);
  const { state } = useContext(AuthContext);
  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${state.user._id}`);

      setPost(
        res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    };
    fetchPost();
  }, [username, state.user._id]);
  return (
    <div className="col-span-3 max-w-2xl space-y-4 my-4">
      {/* post creator */}
      {(!username || username === state.user.username) && <Share />}
      {/* rendering timeline post */}
      {post.length > 0 ? (
        post.map((post) => {
          return <Post key={post._id} post={post} />;
        })
      ) : (
        <div className="flex flex-col justify-center items-center space-y-4 pt-16">
          <img
            src="https://i.pinimg.com/originals/f9/f1/26/f9f126a122254cdce0faf1187cd4fc91.png"
            alt="error image"
            className="h-48"
          />
          <h1 className="text-xl font-bold">No post yet to display...</h1>
        </div>
      )}
    </div>
  );
};

export default Feed;

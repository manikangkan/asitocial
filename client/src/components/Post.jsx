import { Comment, Favorite, MoreHoriz, Share } from "@mui/icons-material";
import { useRef, useState, useEffect, useContext } from "react";
import Modal from "./Modal";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Post = ({ post }) => {
  const autoFocus = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { state } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // like dislike
  useEffect(() => {
    setIsLiked(post.likes.includes(state.user._id));
  }, [post.likes, state.user._id]);

  const handleLike = async () => {
    try {
      await axios.put(`/posts/${post._id}/like`, {
        userId: state.user._id,
      });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  // fetching user data
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios(`/users?userId=${post.userId}`);
      // const res = await axios(`/users/${post.userId}`);
      setUser(res.data);
    };

    fetchUser();
  }, [post.userId]);

  return (
    <div className="bg-white rounded-md">
      <div className="p-4 space-y-4">
        {/* userinfo */}
        <div className="flex items-center justify-between">
          <Link
            className="flex items-center space-x-4"
            to={`/profile/${user.username}`}>
            {/* avatar */}
            <img
              src={
                user.profilePicture
                  ? user.profilePicture
                  : `https://avatars.dicebear.com/api/miniavs/:${user._id}.png?background=%23115e59`
              }
              alt=""
              className="h-10 aspect-square rounded-md"
            />
            <div>
              <h1 className="font-medium">{user.username}</h1>
              <p className="text-sm">{format(post.createdAt)}</p>
            </div>
          </Link>
          <div className="relative">
            <MoreHoriz
              className="cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
            <Modal isOpen={isOpen} />
          </div>
        </div>

        {/* caption */}
        {post.desc && (
          <p>
            {post.desc.length > 150 ? post.desc.substring(0, 150) : post.desc}
            {post.desc.length > 150 && (
              <strong className="cursor-pointer">...see more</strong>
            )}
          </p>
        )}
      </div>

      {/* posted image */}
      {post.img ? (
        <img
          src={PF + post.img}
          // src={post.img}
          alt="posted image"
          className="object-cover w-full"
        />
      ) : (
        <hr />
      )}
      {/* reaction on post */}
      <div className="flex items-center justify-around p-4">
        {/* like */}
        <div
          className={`flex items-center justify-center space-x-4 w-full py-4 rounded-md cursor-pointer hover:bg-slate-50 ${
            isLiked && `text-red-500`
          }`}
          onClick={handleLike}>
          <Favorite />
          <p>{like} people liked</p>
        </div>
        {/* comment */}
        <div
          className="flex items-center justify-center space-x-4 w-full py-4 rounded-md hover:bg-slate-50 cursor-pointer"
          onClick={() => autoFocus.current.focus()}>
          <Comment />
          <p>10 people commented</p>
        </div>
      </div>
      {/* comment box */}
      <form className="flex space-x-2 px-4 pb-4">
        <input
          type="text"
          placeholder="Type you comment here..."
          ref={autoFocus}
          className="border border-gray-200 outline-none focus:border-teal-800 px-4 py-2 rounded-md bg-transparent w-full"
        />
        <button className="bg-teal-800 font-medium text-white py-2 px-4 rounded-md">
          Comment
        </button>
      </form>
    </div>
  );
};

export default Post;

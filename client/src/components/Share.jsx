import {
  Delete,
  EmojiEmotions,
  LocationCity,
  PhotoCamera,
  VideoCall,
} from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Share = () => {
  const filePickerRef = useRef("");
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: state.user._id,
      desc,
    };

    if (file) {
      const data = new FormData();
      const filename = `${Date.now()}_${file.name}`;
      data.append("name", filename);
      data.append("file", file);
      newPost.img = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/posts", newPost);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="bg-white py-4 rounded-md space-y-4"
      onSubmit={handleSubmit}>
      <div>
        <div className="flex space-x-2 border-b px-4">
          {/* avatar */}
          <img
            src={
              state.user.profilePicture
                ? state.user.profilePicture
                : `https://avatars.dicebear.com/api/miniavs/:${state.user._id}.png?background=%23115e59`
            }
            alt="user profile"
            className="h-10 aspect-square rounded-md"
          />
          {/* input */}
          <textarea
            placeholder={`What's on your mind ${state.user.username}...`}
            className="bg-transparent outline-none w-full p-2"
            rows="4"
            onChange={(e) => setDesc(e.target.value)}></textarea>
        </div>
        {/* image to be uploaded */}
        {file && (
          <div className="relative cursor-pointer">
            <img
              src={URL.createObjectURL(file)}
              alt="image to be uploaded"
              className="w-full object-contain"
            />
            <div
              className="p-2 bg-red-500/50 hover:bg-red-500 hover:text-white text-white rounded-md absolute top-2 right-2"
              onClick={() => setFile(null)}>
              <Delete className="!w-6 !h-6" />
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between space-x-2 px-4">
        <div
          className="font-medium flex items-center justify-center py-2 px-4 w-full rounded-md space-x-2 cursor-pointer hover:bg-slate-50"
          onClick={() => filePickerRef.current.click()}>
          <PhotoCamera className="text-orange-500" />
          <p>Photo</p>
        </div>
        <input
          type="file"
          hidden
          ref={filePickerRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="font-medium flex items-center justify-center py-2 px-4 w-full rounded-md space-x-2 cursor-pointer hover:bg-slate-50">
          <VideoCall className="text-blue-500" />
          <p>Video</p>
        </div>
        <div className="font-medium flex items-center justify-center py-2 px-4 w-full rounded-md space-x-2 cursor-pointer hover:bg-slate-50">
          <LocationCity className="text-green-500" />
          <p>Location</p>
        </div>
        <div className="font-medium flex items-center justify-center py-2 px-4 w-full rounded-md space-x-2 cursor-pointer hover:bg-slate-50">
          <EmojiEmotions className="text-cyan-500" />
          <p>Feelings</p>
        </div>
        <button
          type="submit"
          className="bg-teal-800 text-white font-medium px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!desc.trim()}>
           Share
        </button>
      </div>
    </form>
  );
};

export default Share;

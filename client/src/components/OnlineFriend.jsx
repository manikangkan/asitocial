import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const OnlineFriend = ({ conversation, onlineUsers }) => {
  console.log("object", onlineUsers);
  const { state } = useContext(AuthContext);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const friendId =
      conversation &&
      conversation.members.find((member) => member !== state.user._id);

    const getUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    conversation && getUser();
  }, [state.user._id, conversation]);

  return (
    <div className="flex items-center space-x-4 hover:bg-white py-2 px-3 cursor-pointer rounded-md">
      {/* avatar */}
      <div className="relative">
        <img
          src={
            state.user.profilePicture
              ? state.user.profilePicture
              : `https://avatars.dicebear.com/api/miniavs/:${state.user._id}.png?background=%23115e59`
          }
          alt=""
          className="h-10 aspect-square rounded-md"
        />
        <div className="w-4 aspect-square bg-green-500 rounded-full absolute left-7 top-7 border-2 border-white"></div>
      </div>
      <div>
        <h1 className="font-medium">{user.username}</h1>
        <p className="text-sm">1 hour ago</p>
      </div>
    </div>
  );
};

export default OnlineFriend;

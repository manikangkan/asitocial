import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UserInfo = ({ user }) => {
  const [followings, setFollowings] = useState([]);
  const { state, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    state.user.followings.includes(user?._id)
  );

  // getting the user followings list
  useEffect(() => {
    const getFollowings = async () => {
      try {
        const response = await axios.get(`/users/followings/${user._id}`);
        setFollowings(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowings();
  }, [user._id]);
  
  // checking if the user is followed
  useEffect(() => {
    setFollowed(state.user.followings.includes(user?._id));
  }, [state.user, user]);

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: state.user._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: state.user._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  return (
    <div className="col-span-1  mt-4">
      <div className="sticky top-24 space-y-8">
        {/* follow or unfollow */}
        {user.username !== state.user.username && (
          <button
            className="py-2 bg-teal-800 w-full rounded-md text-white font-medium"
            onClick={handleFollow}>
            {followed ? "Unfollow" : "Follow"}
          </button>
        )}
        {/* user info */}
        <h1 className="font-bold text-xl">User information</h1>
        <p>City - {user.city}</p>
        <p>From - {user.from}</p>
        <p>
          Relationship -{" "}
          {user.relationship === 1
            ? "Single"
            : user.relationship === 2
            ? "In a relationship"
            : user.relationship === 3
            ? "Engaged"
            : "-"}
        </p>
        <h1 className="font-bold text-xl">User friends</h1>
        {/* friend list */}
        <div className="flex flex-wrap justify-between gap-y-2">
          {followings.map((following) => (
            <Link to={`/profile/${following.username}`} key={following._id}>
              <div>
                <img
                  src={
                    following.profilePicture
                      ? following.profilePicture
                      : `https://avatars.dicebear.com/api/miniavs/:${following._id}.png?background=%23115e59`
                  }
                  alt=""
                  className="h-16 aspect-square rounded-md"
                />
                <h1 className="w-16 truncate font-medium">
                  {following.username}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

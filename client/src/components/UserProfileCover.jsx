import { Edit } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const UserProfileCover = ({ user }) => {
  const coverPickerRef = useRef(null);
  const profilePickerRef = useRef(null);
  const [cover, setCover] = useState(user.coverPicture);
  const [profile, setProfile] = useState(user.profilePicture);

  return (
    <div className="col-span-4 mt-4 bg-white rounded-md overflow-hidden">
      <div className="relative flex justify-center">
        {/* cover pic */}
        <div className="relative w-full">
          <img
            src={
              cover
                ? URL.createObjectURL(cover)
                : user.coverPicture
                ? user.coverPicture
                : `https://avatars.dicebear.com/api/miniavs/:${user._id}.png?background=%23115e59`
            }
            alt="cover image"
            className="object-cover h-24 w-full"
          />
          <input
            type="file"
            hidden
            ref={coverPickerRef}
            onChange={(e) => setCover(e.target.files[0])}
          />
          <div
            className="p-2 bg-green-500/50 hover:bg-green-500 hover:text-white text-white rounded-md absolute bottom-2 right-2 cursor-pointer"
            onClick={() => coverPickerRef.current.click()}>
            <Edit className="!w-6 !h-6" />
          </div>
        </div>
        <div className=" absolute top-14">
          {/* profile pic */}
          <img
            src={
              profile
                ? URL.createObjectURL(profile)
                : user.profilePicture
                ? user.profilePicture
                : `https://avatars.dicebear.com/api/miniavs/:${user._id}.png?background=%23115e59`
            }
            alt="profile pic"
            className="h-20 aspect-square rounded-md object-cover"
          />
          <input
            type="file"
            hidden
            ref={profilePickerRef}
            onChange={(e) => setProfile(e.target.files[0])}
          />
          <div
            className="p-2 bg-green-500/50 hover:bg-green-500 hover:text-white text-white rounded-md absolute bottom-2 right-2 cursor-pointer"
            onClick={() => profilePickerRef.current.click()}>
            <Edit className="!w-6 !h-6" />
          </div>
        </div>
      </div>
      <div className="text-center pt-12 pb-6">
        <h1 className="text-xl font-bold">{user.username}</h1>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfileCover;

import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UserProfileCover from "../components/UserProfileCover";
import UserInfo from "../components/UserInfo";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${params.username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [params.username]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* navbar */}
      <Navbar />
      {/* section */}
      <section className="max-w-7xl mx-auto grid grid-cols-5 gap-x-4 my-4">
        <Sidebar />
        <div className="col-span-4">
          {/* top */}
          <UserProfileCover user={user} />
          {/* feed */}
          <div className="grid grid-cols-4">
            <Feed username={user.username} />
            {/* user info */}
            <UserInfo user={user} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;

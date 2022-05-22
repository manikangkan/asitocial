import { Search, Chat, Notifications, Home } from "@mui/icons-material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { state } = useContext(AuthContext);
  return (
    <nav className="bg-teal-800 py-4 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto grid grid-cols-2">
        <section className="col-span-1 w-2/3 space-x-4 flex items-center justify-between">
          {/* logo */}
          <Link to="/">
            <h1 className="text-xl font-semibold">asitocial</h1>
          </Link>
          {/* search bar */}
          <div className="bg-teal-600/50 flex items-center space-x-2 rounded-md w-full px-4 py-2">
            <Search className="text-white/50" />
            <input
              placeholder="Search for friend, post or video"
              className="bg-transparent placeholder-white/50 w-full h-full outline-none"
            />
          </div>
        </section>
        <section className="col-span-1 space-x-4 flex items-center justify-end">
          {/* links & avatar */}
          <div className="w-1/2 flex items-center justify-between">
            {/* home */}
            <Link to="/">
              <Home className="cursor-pointer" />
            </Link>
            {/* chat */}
            <Link to="/messenger">
              <div className="relative cursor-pointer">
                <Chat />
                <div className="bg-red-500 h-6 aspect-square px-2 rounded-full text-sm font-medium grid place-content-center absolute bottom-4 left-2">
                  65
                </div>
              </div>
            </Link>
            {/* notification */}
            <Link to="/notifications">
              <div className="relative cursor-pointer">
                <Notifications />
                <span className="bg-red-500 h-6 aspect-square px-2 rounded-full text-sm font-medium grid place-content-center absolute bottom-4 left-2">
                  23
                </span>
              </div>
            </Link>
            {/* avatar */}
            <Link to={`/profile/${state.user.username}`}>
              <img
                src={
                  state.user.profilePicture
                    ? state.user.profilePicture
                    : `https://avatars.dicebear.com/api/miniavs/:${state.user._id}.png?background=%23ffffff`
                }
                alt="user profile"
                className="h-10 aspect-square rounded-md"
              />
            </Link>
          </div>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;

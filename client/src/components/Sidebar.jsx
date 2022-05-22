import {
  AccountCircle,
  Bookmark,
  Chat,
  Notifications,
  Event,
  Feed,
  Group,
  KeyboardArrowDown,
  PhotoAlbum,
  Videocam,
  Logout,
} from "@mui/icons-material";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  return (
    <header className="col-span-1">
      <div className="sticky top-20">
        <SidebarLink
          Icon={AccountCircle}
          text="Profile"
          link="profile/manikangkandas"
        />
        <SidebarLink Icon={Feed} text="Feed" link="" />
        <SidebarLink Icon={Chat} text="Messenger" link="messenger" />
        <SidebarLink
          Icon={Notifications}
          text="Notifications"
          link="notifications"
        />
        <SidebarLink Icon={Videocam} text="Live" link="live" />
        <SidebarLink Icon={Group} text="Group" link="group" />
        <SidebarLink Icon={Bookmark} text="Save" link="save" />
        <SidebarLink Icon={Event} text="Events" link="events" />
        <SidebarLink Icon={PhotoAlbum} text="Photo" link="photo" />
        <SidebarLink Icon={Logout} text="Logout" link="login" />
        <SidebarLink Icon={KeyboardArrowDown} text="See more" link="more" />
        <h1 className="mt-20">
          Designed & Developed by{" "}
          <span className="text-teal-800 font-medium">Manikangkan Das</span>
        </h1>
      </div>
    </header>
  );
};

export default Sidebar;

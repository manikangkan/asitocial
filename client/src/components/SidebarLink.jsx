import { NavLink } from "react-router-dom";

const SidebarLink = ({ Icon, text, link }) => {
  return (
    <NavLink
      to={`/${link}`}
      className={({ isActive }) =>
        isActive
          ? `bg-gradient-to-r from-teal-800 to-slate-50 text-white rounded-md w-2/3 p-4 space-x-4 flex items-center cursor-pointer`
          : `rounded-md w-2/3 p-4 space-x-4 flex items-center cursor-pointer`
      }>
      <Icon />
      <p className="font-medium">{text}</p>
    </NavLink>
  );
};

export default SidebarLink;

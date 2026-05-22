import {
  MdDashboard,
  MdOutlineInventory2,
  MdOutlineSettings,
} from "react-icons/md";

import {
  HiOutlineChartPie,
  HiOutlineDocumentText,
} from "react-icons/hi";

import { FiMessageSquare } from "react-icons/fi";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menus = [
    {
      title: "Dashboard",
      path: "/",
      icon: <MdDashboard size={20} />,
    },
    {
      title: "Orders",
      path: "/orders",
      icon: <HiOutlineChartPie size={20} />,
      badge: "20",
    },
    {
      title: "Customer",
      path: "/customers",
      icon: <MdOutlineInventory2 size={20} />,
    },
    {
      title: "Login",
      path: "/login",
      icon: <HiOutlineDocumentText size={20} />,
    },
  ];

  const features = [
    // {
    //   title: "Help",
    //   path: "/help",
    //   icon: <FiMessageSquare size={20} />,
    // },
    // {
    //   title: "Settings",
    //   path: "/settings",
    //   icon: <MdOutlineSettings size={20} />,
    // },
  ];

  const menuClass = ({ isActive }) =>
    `
      group flex items-center justify-between
      px-4 py-3 rounded-2xl
      transition-all duration-300
      border border-white/10
      ${
        isActive
          ? `
            bg-white/10
            backdrop-blur-xl
            shadow-[0_0_20px_rgba(255,255,255,0.05)]
            text-white
          `
          : `
            text-gray-400
            hover:bg-white/5
            hover:text-white
          `
      }
    `;

  return (
    <aside
      className="
        w-[290px]
        min-h-screen
        bg-black
        border-r border-white/10
        px-5 py-6
        flex flex-col
      "
    >
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-5 justify-center">
        <div>
          <h1 className="text-white text-xl font-semibold leading-none">
            <img src="/public/img/logo-bengkel.png" alt="" />
          </h1>
        </div>
      </div>

      {/* SEARCH */}
      <div
        className="
          mb-8
          bg-white/5
          border border-white/10
          rounded-2xl
          px-4 py-3
          backdrop-blur-xl
        "
      >
        <input
          type="text"
          placeholder="Search"
          className="
            bg-transparent
            outline-none
            text-sm
            text-white
            placeholder:text-gray-500
            w-full
          "
        />
      </div>

      {/* MAIN MENU */}
      <div className="space-y-2">
        {menus.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.path}
            className={menuClass}
          >
            <div className="flex items-center gap-3">
              <span>{menu.icon}</span>
              <span className="text-sm font-medium">
                {menu.title}
              </span>
            </div>

            {menu.badge && (
              <div
                className="
                  w-6 h-6
                  rounded-full
                  bg-white
                  text-black
                  text-xs
                  flex items-center justify-center
                  font-semibold
                "
              >
                {menu.badge}
              </div>
            )}
          </NavLink>
        ))}
      </div>

      {/* FEATURES */}
      <div className="mt-10">
        {/* <p
          className="
            text-xs
            text-gray-500
            uppercase
            tracking-widest
            mb-4
            px-2
          "
        >
          Features
        </p> */}

        <div className="space-y-2">
          {features.map((menu, index) => (
            <NavLink
              key={index}
              to={menu.path}
              className={menuClass}
            >
              <div className="flex items-center gap-3">
                <span>{menu.icon}</span>
                <span className="text-sm font-medium">
                  {menu.title}
                </span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-auto pt-10">
        <div
          className="
            rounded-2xl
            bg-white/5
            border border-white/10
            backdrop-blur-xl
            p-4
          "
        >
          <p className="text-white text-sm font-medium">
            Bengkel Inventory System
          </p>

          <p className="text-gray-400 text-xs mt-1">
            Modern inventory dashboard with glassmorphism UI.
          </p>
        </div>
      </div>
    </aside>
  );
}
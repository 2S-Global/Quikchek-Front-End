"use client";

import Link from "next/link";
import employerMenuData from "../../data/adminMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice.js";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const DashboardEmployerSidebar = () => {
  const { menu } = useSelector((state) => state.toggle || {});
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [expandedGroups, setExpandedGroups] = useState({});

  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  // toggle expand/collapse of a group
  const toggleGroup = (title) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // open group automatically if it has an active link
  useEffect(() => {
    const newExpandedGroups = {};
    employerMenuData.forEach((group) => {
      const hasActive = group.items.some((item) =>
        isActiveLink(item.routePath, pathname)
      );
      newExpandedGroups[group.title] = hasActive;
    });
    setExpandedGroups(newExpandedGroups);
  }, [pathname]);

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Sidebar close icon for mobile */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>

      <div className="sidebar-inner">
        {employerMenuData.map((group) => {
          const isOpen = expandedGroups[group.title] ?? false;
          return (
            <div key={group.title} className="mb-1">
              {/* Group Title */}
              <button
                className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-600 uppercase hover:bg-gray-100 rounded"
                onClick={() => toggleGroup(group.title)}
              >
                <i className={`la ${group.icon}`}></i>{" "}
                <span>{group.title}</span>
                <span className="text-sm">{/* {isOpen ? "−" : "+"} */}</span>
              </button>

              {/* Group Items */}
              {isOpen && (
                <ul className="navigation pl-3 mt-2">
                  {group.items.map((item) => (
                    <li
                      className={`${
                        isActiveLink(item.routePath, pathname) ? "active" : ""
                      } mb-1`}
                      key={item.id}
                      onClick={menuToggleHandler}
                    >
                      <Link href={item.routePath}>
                        <i className={`la ${item.icon}`}></i> {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardEmployerSidebar;

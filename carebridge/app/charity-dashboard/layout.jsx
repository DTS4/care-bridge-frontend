"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import admin from "./admin.module.css";
import "remixicon/fonts/remixicon.css";

export default function Layout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    try {

      await fetch("https://carebridge-backend-fys5.onrender.com/logout", { method: "POST", credentials: "include" });
      sessionStorage.removeItem("adminToken");
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Close sidebar on navigation
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className={admin.main}>
      {/* Mobile Menu Button */}
      <button className={admin.menuButton} onClick={toggleSidebar}>
        <i className="ri-menu-line"></i>
      </button>

      {/* Sidebar */}
      <div className={`${admin.left} ${isSidebarOpen ? admin.active : ""}`}>
        <nav className={admin.navigation}>
          {[
            { href: "/charity-dashboard", icon: "ri-home-3-line", label: "Home" },
            { href: "/charity-dashboard/manage-donations", icon: "ri-mail-settings-line", label: "Manage Donations" },
            { href: "/charity-dashboard/impact-stories", icon: "ri-user-heart-fill", label: "Impact Stories" },
            { href: "/charity-dashboard/beneficiaries", icon: "ri-user-settings-line", label: "Beneficiaries" },
            { href: "/charity-dashboard/settings", icon: "ri-settings-5-line", label: "Profile Settings" }
          ].map(({ href, icon, label }) => (
            <Link key={href} href={href} className={pathname.includes(href) ? admin.active : ""}>
              <i className={icon}></i>
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className={admin.bottom}>
          <button className="bg-red-600 text-white px-5 py-2 rounded hover:bg-[#F55920]" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={admin.right}>{children}</div>
    </div>
  );
}
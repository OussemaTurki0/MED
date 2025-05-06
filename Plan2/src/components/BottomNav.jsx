import React from "react";
import { useTranslation } from "react-i18next";

function BottomNav({ activePage, setActivePage }) {
  const { t } = useTranslation();

  const navItems = [
    { name: "home", icon: "fa-home", label: t("home") },
    { name: "bracelet", icon: "fa-id-card", label: t("wearer") },
    { name: "gps", icon: "fa-map-marker-alt", label: t("gps") },
    { name: "qr", icon: "fa-qrcode", label: t("qr") },
    { name: "ai", icon: "fa-brain", label: "AI" }, // replaced SOS
    { name: "settings", icon: "fa-cog", label: t("settings") },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#dc2626] p-4 shadow-lg z-50">
      <div className="flex items-center justify-between container mx-auto px-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className={`text-white flex flex-col items-center transition-all duration-200 ${
              activePage === item.name ? "opacity-100 scale-110" : "opacity-70 hover:opacity-100 hover:scale-105"
            }`}
          >
            <i className={`fas ${item.icon} text-xl`}></i>
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;

import { NavLink } from "react-router-dom";
import LogoMark from "../components/common/Logo/LogoMark";

const navItems = [
  { to: "/", label: "Dashboard", icon: "ti-layout-dashboard", end: true },
  { section: "Modüller" },
  {
    to: "/personel",
    label: "Personel Yönetimi",
    icon: "ti-users",
    children: [{ to: "/personel/ekle", label: "Personel Ekle", icon: "ti-user-plus" }],
  },
  {
    to: "/izin",
    label: "İzin Yönetimi",
    icon: "ti-calendar-event",
    children: [
      { to: "/izin/ekle", label: "İzin Ekle", icon: "ti-calendar-plus" },
      { to: "/izin-turleri", label: "İzin Türleri", icon: "ti-tags" },
      { to: "/izin-turleri/ekle", label: "İzin Türü Ekle", icon: "ti-tag" },
    ],
  },
  {
    to: "/departman",
    label: "Departman Yönetimi",
    icon: "ti-building-community",
    children: [{ to: "/departman/ekle", label: "Departman Ekle", icon: "ti-building-plus" }],
  },
];

const linkClass = (collapsed) =>
  ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${collapsed ? "justify-center" : ""} ${
      isActive ? "bg-primary/35 text-white" : "text-white/65 hover:bg-white/10 hover:text-white"
    }`;

const subLinkClass = ({ isActive }) =>
  `flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition ${
    isActive ? "bg-primary/20 text-[#c8ddd3]" : "text-white/50 hover:bg-white/10 hover:text-white"
  }`;

function Sidebar({ collapsed }) {
  return (
    <aside
      className={`flex shrink-0 flex-col bg-title transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}
    >
      <div
        className={`flex items-center gap-2 border-b border-white/10 px-4 py-4 ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
          <LogoMark className="h-5 w-5" />
        </div>
        {!collapsed && (
          <div className="leading-tight">
            <p className="text-sm font-bold text-white">İKYS</p>
            <p className="text-[11px] text-white/50">İnsan Kaynakları</p>
          </div>
        )}
      </div>

      <nav className="flex flex-col gap-1 px-3 py-3">
        {navItems.map((item, index) =>
          item.section ? (
            !collapsed && (
              <p
                key={`section-${index}`}
                className="px-3 pb-1 pt-3 text-[10px] font-medium uppercase tracking-wider text-white/35"
              >
                {item.section}
              </p>
            )
          ) : (
            <div key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={linkClass(collapsed)}
                title={collapsed ? item.label : undefined}
              >
                <i className={`ti ${item.icon} text-base`} aria-hidden="true"></i>
                {!collapsed && item.label}
              </NavLink>

              {!collapsed && item.children && (
                <div className="mt-1 flex flex-col gap-1 pl-7">
                  {item.children.map((child) => (
                    <NavLink key={child.to} to={child.to} className={subLinkClass}>
                      <i className={`ti ${child.icon} text-sm`} aria-hidden="true"></i>
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;

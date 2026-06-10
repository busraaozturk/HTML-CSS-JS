import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/personel", label: "Personel" },
  { to: "/personel/ekle", label: "Personel Ekle" },
  { to: "/izin", label: "İzin" },
  { to: "/izin-turleri", label: "İzin Türleri" },
  { to: "/departman", label: "Departman" },
];

function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-title px-4 py-6">
      <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
        Menü
      </p>

      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-primary text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

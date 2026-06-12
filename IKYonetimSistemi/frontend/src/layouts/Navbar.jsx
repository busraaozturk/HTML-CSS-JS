import { useLocation } from "react-router-dom";

const pageTitles = {
  "/": "Dashboard",
  "/personel": "Personel Listesi",
  "/personel/ekle": "Personel Ekle",
  "/izin": "İzin Listesi",
  "/izin/ekle": "İzin Ekle",
  "/izin-turleri": "İzin Türleri",
  "/izin-turleri/ekle": "İzin Türü Ekle",
  "/departman": "Departman Yönetimi",
  "/departman/ekle": "Departman Ekle",
};

function getPageTitle(pathname) {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith("/personel/duzenle")) return "Personel Düzenle";
  if (pathname.startsWith("/izin-turleri/duzenle")) return "İzin Türü Düzenle";
  if (pathname.startsWith("/izin/duzenle")) return "İzin Düzenle";
  if (pathname.startsWith("/departman/duzenle")) return "Departman Düzenle";
  return "İKYS";
}

function Navbar({ collapsed, onToggleSidebar }) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-accent bg-white px-6 shadow-soft">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-secondary transition hover:bg-accent hover:text-primary"
          aria-label={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
          title={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
        >
          <i className="ti ti-menu-2 text-lg" aria-hidden="true"></i>
        </button>
        <span className="text-base font-semibold text-title">{getPageTitle(location.pathname)}</span>
      </div>

      <div className="flex items-center gap-4">
        <i className="ti ti-bell text-lg text-secondary" aria-hidden="true"></i>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-primary">
          AK
        </div>
      </div>
    </header>
  );
}

export default Navbar;

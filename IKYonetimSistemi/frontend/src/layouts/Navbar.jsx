import LogoMark from "../components/common/Logo/LogoMark";

function Navbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b border-accent bg-white px-6 shadow-soft">
      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-white">
        <LogoMark className="h-5 w-5" />
      </div>
      <span className="text-base font-semibold text-title">İK Yönetim Sistemi</span>
    </header>
  );
}

export default Navbar;

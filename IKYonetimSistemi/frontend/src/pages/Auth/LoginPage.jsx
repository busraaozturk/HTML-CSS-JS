import { useState } from "react";
import LogoMark from "../../components/common/Logo/LogoMark";

function EyeIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.6 21.6 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a21.4 21.4 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function TeamIllustration() {
  return (
    <svg
      viewBox="0 0 360 300"
      fill="none"
      className="w-full max-w-sm"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="180" cy="150" r="140" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="1.5" />
      <circle cx="180" cy="150" r="104" fill="#FFFFFF" fillOpacity="0.06" />

      {/* sol kişi */}
      <circle cx="92" cy="138" r="24" fill="#FFFFFF" fillOpacity="0.85" />
      <path d="M44 236c0-38 22-62 48-62s48 24 48 62Z" fill="#FFFFFF" fillOpacity="0.85" />

      {/* sağ kişi */}
      <circle cx="268" cy="138" r="24" fill="#FFFFFF" fillOpacity="0.85" />
      <path d="M220 236c0-38 22-62 48-62s48 24 48 62Z" fill="#FFFFFF" fillOpacity="0.85" />

      {/* orta kişi */}
      <circle cx="180" cy="112" r="32" fill="#D8E3DC" />
      <path d="M118 240c0-46 28-74 62-74s62 28 62 74Z" fill="#D8E3DC" />

      {/* gelişim grafiği */}
      <path
        d="M40 282 L118 256 L180 270 L242 222 L322 240"
        stroke="#D8E3DC"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="118" cy="256" r="4" fill="#FFFFFF" fillOpacity="0.85" />
      <circle cx="242" cy="222" r="4" fill="#FFFFFF" fillOpacity="0.85" />
      <circle cx="322" cy="240" r="6" fill="#D8E3DC" />
    </svg>
  );
}

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex bg-background font-sans">
      {/* Sol görsel alan */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between bg-primary p-12 text-white overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white/5" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
            <LogoMark className="h-6 w-6" />
          </div>
          <span className="text-lg font-semibold tracking-wide">İK Yönetim Sistemi</span>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10 text-center">
          <TeamIllustration />
          <div className="max-w-sm">
            <h2 className="text-2xl font-semibold leading-snug">
              İnsana, ekibe ve gelişime değer veren yönetim
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Personel, izin ve departman süreçlerinizi tek bir güvenilir
              platformdan yönetin.
            </p>
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/60">
          © 2026 İK Yönetim Sistemi. Tüm hakları saklıdır.
        </p>
      </div>

      {/* Sağ login kartı */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white">
              <LogoMark className="h-6 w-6" />
            </div>
            <span className="text-lg font-semibold text-title">İK Yönetim Sistemi</span>
          </div>

          <div className="card p-8 sm:p-10">
            <h1 className="text-2xl font-semibold text-title">Tekrar hoş geldiniz</h1>
            <p className="mt-2 text-sm text-muted">
              Hesabınıza erişmek için bilgilerinizi girin.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              <div>
                <label htmlFor="email" className="field-label">
                  E-posta Adresi
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ornek@sirket.com"
                  className="field-input"
                />
              </div>

              <div>
                <label htmlFor="password" className="field-label">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="field-input pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted transition hover:text-title"
                    aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                  >
                    {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer select-none items-center gap-2 text-muted">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded accent-primary"
                  />
                  Beni hatırla
                </label>
                <a href="#" className="font-medium text-primary hover:underline">
                  Şifremi unuttum?
                </a>
              </div>

              <button type="submit" className="btn-primary mt-2 w-full py-3">
                Giriş Yap
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-muted lg:hidden">
            © 2026 İK Yönetim Sistemi. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

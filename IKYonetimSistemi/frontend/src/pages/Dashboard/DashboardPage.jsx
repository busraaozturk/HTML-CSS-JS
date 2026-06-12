import { useEffect, useState } from "react";
import { getPersonel } from "../../api/personelApi";
import { getIzinler } from "../../api/izinApi";
import { getDepartmanlar } from "../../api/departmanApi";
import { getIzinTurleri } from "../../api/izinTuruApi";
import { getDurumBadgeClass } from "../../utils/badge";

function DashboardPage() {
  const [personeller, setPersoneller] = useState([]);
  const [izinler, setIzinler] = useState([]);
  const [departmanlar, setDepartmanlar] = useState([]);
  const [izinTurleri, setIzinTurleri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [personelData, izinData, departmanData, izinTuruData] = await Promise.all([
          getPersonel(),
          getIzinler(),
          getDepartmanlar(),
          getIzinTurleri(),
        ]);
        setPersoneller(personelData);
        setIzinler(izinData);
        setDepartmanlar(departmanData);
        setIzinTurleri(izinTuruData);
      } catch (error) {
        console.error("Dashboard verileri getirilirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const getPersonelAdi = (personelId) => {
    const personel = personeller.find((p) => p.id == personelId);
    return personel ? `${personel.ad} ${personel.soyad}` : "Bilinmiyor";
  };

  const getIzinTuruAdi = (izinTuruId) => {
    const izinTuru = izinTurleri.find((t) => t.id == izinTuruId);
    return izinTuru ? izinTuru.name : "Bilinmiyor";
  };

  const aktifIzinSayisi = izinler.filter((i) => i.durum === "Onaylandı").length;
  const sonIzinTalepleri = [...izinler].slice(-5).reverse();

  if (loading) {
    return <div className="text-sm text-muted">Yükleniyor...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-title">Genel Bakış</h1>
        <p className="text-sm text-secondary">Sistemin anlık özeti</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="stat-card">
          <div className="stat-card-icon">
            <i className="ti ti-users" aria-hidden="true"></i>
          </div>
          <div>
            <p className="text-2xl font-bold text-title">{personeller.length}</p>
            <p className="text-xs text-secondary">Toplam Personel</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: "#e0f2f0", color: "#2d8e82" }}>
            <i className="ti ti-calendar-event" aria-hidden="true"></i>
          </div>
          <div>
            <p className="text-2xl font-bold text-title">{aktifIzinSayisi}</p>
            <p className="text-xs text-secondary">Aktif İzin</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: "#e5edf9", color: "#3b5fa0" }}>
            <i className="ti ti-building-community" aria-hidden="true"></i>
          </div>
          <div>
            <p className="text-2xl font-bold text-title">{departmanlar.length}</p>
            <p className="text-xs text-secondary">Departman</p>
          </div>
        </div>
      </div>

      <div className="card p-4 sm:p-6">
        <h2 className="mb-3 text-sm font-semibold text-title">Son İzin Talepleri</h2>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs font-medium text-secondary">
              <th className="border-b border-accent/60 px-3 py-2">Personel</th>
              <th className="border-b border-accent/60 px-3 py-2">İzin Türü</th>
              <th className="border-b border-accent/60 px-3 py-2">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-accent/40">
            {sonIzinTalepleri.map((izin) => (
              <tr key={izin.id} className="transition hover:bg-background">
                <td className="px-3 py-2.5">{getPersonelAdi(izin.personelId)}</td>
                <td className="px-3 py-2.5">{getIzinTuruAdi(izin.izinTuruId)}</td>
                <td className="px-3 py-2.5">
                  <span className={`badge ${getDurumBadgeClass(izin.durum)}`}>{izin.durum}</span>
                </td>
              </tr>
            ))}

            {sonIzinTalepleri.length === 0 && (
              <tr>
                <td colSpan={3} className="px-3 py-4 text-center text-muted">
                  Henüz izin talebi bulunmuyor.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardPage;

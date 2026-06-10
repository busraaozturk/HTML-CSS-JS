import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IzinTable from "../../components/izin/IzinTable/IzinTable";
import { getIzinler, deleteIzin } from "../../api/izinApi";
import { getPersonel } from "../../api/personelApi";
import { getDepartmanlar } from "../../api/departmanApi";
import { getIzinTurleri } from "../../api/izinTuruApi";
import Button from "../../components/common/Button/Button";

function IzinPage() {
  const navigate = useNavigate();
  const [izinler, setIzinler] = useState([]);
  const [personeller, setPersoneller] = useState([]);
  const [departmanlar, setDepartmanlar] = useState([]);
  const [izinTurleri, setIzinTurleri] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [izinlerData, personellerData, departmanlarData, izinTurleriData] = await Promise.all([
        getIzinler(),
        getPersonel(),
        getDepartmanlar(),
        getIzinTurleri(),
      ]);
      setIzinler(izinlerData);
      setPersoneller(personellerData);
      setDepartmanlar(departmanlarData);
      setIzinTurleri(izinTurleriData);
    } catch (error) {
      console.error("İzinleri getirirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getPersonelAdi = (personelId) => {
    const personel = personeller.find((p) => p.id == personelId);
    return personel ? `${personel.ad} ${personel.soyad}` : "Bilinmiyor";
  };

  const getDepartmanAdi = (departmanId) => {
    const departman = departmanlar.find((d) => d.id == departmanId);
    return departman ? departman.name : "Bilinmiyor";
  };

  const getIzinTuruAdi = (izinTuruId) => {
    const izinTuru = izinTurleri.find((t) => t.id == izinTuruId);
    return izinTuru ? izinTuru.name : "Bilinmiyor";
  };

  const onDelete = async (id) => {
    try {
      await deleteIzin(id);
      setIzinler((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.error("İzin silinirken hata oluştu:", error);
    }
  };

  const onEdit = (id) => {
    navigate(`/izin/duzenle/${id}`);
  };

  const handleCreate = () => {
    navigate("/izin/ekle");
  };

  if (loading) {
    return <div className="text-sm text-muted">Yükleniyor...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">İzinler</h1>
        <Button text="Yeni İzin Ekle" onClick={handleCreate} />
      </div>
      <IzinTable
        izinler={izinler}
        onDelete={onDelete}
        onEdit={onEdit}
        getPersonelAdi={getPersonelAdi}
        getDepartmanAdi={getDepartmanAdi}
        getIzinTuruAdi={getIzinTuruAdi}
      />
    </div>
  );
}

export default IzinPage;

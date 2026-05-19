import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IzinTable from "../../components/izin/IzinTable/IzinTable";
import { izinlerData } from "../../data/izinler";
import { personelData } from "../../data/personeller";
import Button from "../../components/common/Button/Button";

function IzinPage() {
  const navigate = useNavigate();
  const [izinler, setIzinler] = useState([]);

  useEffect(() => {
    setIzinler([...izinlerData]);
  }, []);

  const getPersonelAdi = (personelId) => {
    const personel = personelData.find((p) => p.id === personelId);
    return personel ? `${personel.ad} ${personel.soyad}` : "Bilinmiyor";
  };

  const onDelete = (id) => {
    const yeniListe = izinler.filter((i) => i.id !== id);
    setIzinler(yeniListe);
    const index = izinlerData.findIndex((i) => i.id === id);
    if (index !== -1) {
      izinlerData.splice(index, 1);
    }
  };

  const onEdit = (id) => {
    navigate(`/izin/duzenle/${id}`);
  };

  const handleCreate = () => {
    navigate("/izin/ekle");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">İzinler</h1>
        <Button text="Yeni İzin Ekle" onClick={handleCreate} />
      </div>
      <IzinTable
        izinler={izinler}
        onDelete={onDelete}
        onEdit={onEdit}
        getPersonelAdi={getPersonelAdi}
      />
    </div>
  );
}

export default IzinPage;
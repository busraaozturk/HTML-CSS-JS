import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { izinlerData } from "../../data/izinler";
import IzinForm from "../../components/izin/IzinForm/IzinForm";

function IzinEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const izin = izinlerData.find(i => i.id === Number(id));

  const [formData, setFormData] = useState({
    personelId: izin?.personelId || "",
    baslangicTarih: izin?.baslangicTarih || "",
    bitisTarih: izin?.bitisTarih || "",
    izinTuru: izin?.izinTuru || "",
    durum: izin?.durum || "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = () => {
    if (!izin) {
      alert("İzin bulunamadı");
      return;
    }

    izin.personelId = parseInt(formData.personelId);
    izin.baslangicTarih = formData.baslangicTarih;
    izin.bitisTarih = formData.bitisTarih;
    izin.izinTuru = formData.izinTuru;
    izin.durum = formData.durum;

    // refresh reference
    const temp = [...izinlerData];
    izinlerData.length = 0;
    temp.forEach(i => izinlerData.push(i));

    navigate('/izin');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">İzin Düzenle</h1>
      <IzinForm formData={formData} onChange={onChange} onSubmit={onSubmit} buttonText="Güncelle" />
    </div>
  );
}

export default IzinEditPage;

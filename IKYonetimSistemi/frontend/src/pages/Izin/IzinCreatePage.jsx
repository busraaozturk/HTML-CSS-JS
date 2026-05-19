import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { izinlerData } from "../../data/izinler";
import IzinForm from "../../components/izin/IzinForm/IzinForm";

function IzinCreatePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    personelId: "",
    baslangicTarih: "",
    bitisTarih: "",
    izinTuru: "",
    durum: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = () => {
    if (!formData.personelId || !formData.baslangicTarih || !formData.bitisTarih || !formData.izinTuru || !formData.durum) {
      alert("Lütfen tüm alanları doldurunuz");
      return;
    }

    const yeniId = izinlerData.length > 0 ? Math.max(...izinlerData.map(i => i.id)) + 1 : 1;
    const yeniIzin = {
      id: yeniId,
      personelId: parseInt(formData.personelId),
      baslangicTarih: formData.baslangicTarih,
      bitisTarih: formData.bitisTarih,
      izinTuru: formData.izinTuru,
      durum: formData.durum,
    };

    izinlerData.push(yeniIzin);
    // refresh reference
    const temp = [...izinlerData];
    izinlerData.length = 0;
    temp.forEach(i => izinlerData.push(i));

    navigate('/izin');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Yeni İzin Ekle</h1>
      <IzinForm formData={formData} onChange={onChange} onSubmit={onSubmit} buttonText="İzin Kaydet" />
    </div>
  );
}

export default IzinCreatePage;

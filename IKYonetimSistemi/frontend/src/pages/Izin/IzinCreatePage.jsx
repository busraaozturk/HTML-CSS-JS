import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IzinForm from "../../components/izin/IzinForm/IzinForm";
import { createIzin } from "../../api/izinApi";

function IzinCreatePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    personelId: "",
    departmanId: "",
    baslangicTarih: "",
    bitisTarih: "",
    izinTuruId: "",
    durum: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async () => {
    if (!formData.personelId || !formData.departmanId || !formData.baslangicTarih || !formData.bitisTarih || !formData.izinTuruId || !formData.durum) {
      alert("Lütfen tüm alanları doldurunuz!");
      return;
    }

    try {
      setLoading(true);

      await createIzin(formData);

      alert("İzin başarıyla eklendi.");

      navigate("/izin");
    } catch (error) {
      console.error("İzin eklenirken hata oluştu:", error);
      alert("İzin eklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="page-title">Yeni İzin Ekle</h1>
      <IzinForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        buttonText={loading ? "Kaydediliyor..." : "İzin Kaydet"}
      />
    </div>
  );
}

export default IzinCreatePage;

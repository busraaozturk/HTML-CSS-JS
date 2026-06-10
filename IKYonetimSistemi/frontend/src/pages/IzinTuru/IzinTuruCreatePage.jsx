import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IzinTuruForm from "../../components/izinTuru/IzinTuruForm/IzinTuruForm";
import { createIzinTuru } from "../../api/izinTuruApi";

function IzinTuruCreatePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    if (!formData.name) {
      alert("Lütfen tüm alanları doldurunuz!");
      return;
    }

    try {
      setLoading(true);

      await createIzinTuru(formData);

      alert("İzin türü başarıyla eklendi.");

      navigate("/izin-turleri");
    } catch (error) {
      console.error(error);
      alert("İzin türü eklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="page-title">
        Yeni İzin Türü
      </h1>

      <IzinTuruForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        buttonText={
          loading
            ? "Kaydediliyor..."
            : "İzin Türü Ekle"
        }
      />
    </div>
  );
}

export default IzinTuruCreatePage;

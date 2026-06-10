import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IzinTuruForm from "../../components/izinTuru/IzinTuruForm/IzinTuruForm";
import { getIzinTuruById, updateIzinTuru } from "../../api/izinTuruApi";

function IzinTuruEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(true);

  // Get İzin Türü by ID (API)
  useEffect(() => {
    const fetchIzinTuru = async () => {
      try {
        setLoading(true);

        const izinTuru = await getIzinTuruById(id);

        if (izinTuru) {
          setFormData({
            name: izinTuru.name,
          });
        }
      } catch (error) {
        console.error("İzin türü bilgisi getirilirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIzinTuru();
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // update işlemi (API)
  const onSubmit = async () => {
    if (!formData.name) {
      alert("Lütfen tüm alanları doldurunuz!");
      return;
    }

    try {
      await updateIzinTuru(id, formData);

      navigate("/izin-turleri");
    } catch (error) {
      console.error("İzin türü güncellenirken hata oluştu:", error);
    }
  };

  if (loading) {
    return <div className="text-sm text-muted">İzin türü bilgileri yükleniyor...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="page-title">
        İzin Türü Düzenle
      </h1>

      <IzinTuruForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        buttonText="Güncelle"
      />
    </div>
  );
}

export default IzinTuruEditPage;

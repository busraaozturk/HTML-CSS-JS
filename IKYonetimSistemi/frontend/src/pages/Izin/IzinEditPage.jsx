import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IzinForm from "../../components/izin/IzinForm/IzinForm";
import { getIzinById, updateIzin } from "../../api/izinApi";

function IzinEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    personelId: "",
    departmanId: "",
    baslangicTarih: "",
    bitisTarih: "",
    izinTuruId: "",
    durum: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIzin = async () => {
      try {
        setLoading(true);

        const izin = await getIzinById(id);

        if (izin) {
          setFormData({
            personelId: izin.personelId,
            departmanId: izin.departmanId,
            baslangicTarih: izin.baslangicTarih,
            bitisTarih: izin.bitisTarih,
            izinTuruId: izin.izinTuruId,
            durum: izin.durum,
          });
        }
      } catch (error) {
        console.error("İzin bilgisi getirilirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIzin();
  }, [id]);

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
      await updateIzin(id, formData);

      navigate("/izin");
    } catch (error) {
      console.error("İzin güncellenirken hata oluştu:", error);
    }
  };

  if (loading) {
    return <div className="text-sm text-muted">İzin bilgileri yükleniyor...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="page-title">İzin Düzenle</h1>
      <IzinForm formData={formData} onChange={onChange} onSubmit={onSubmit} buttonText="Güncelle" />
    </div>
  );
}

export default IzinEditPage;

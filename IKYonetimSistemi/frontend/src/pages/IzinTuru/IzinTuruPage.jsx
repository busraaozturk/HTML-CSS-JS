import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import { getIzinTurleri, deleteIzinTuru } from "../../api/izinTuruApi";
import IzinTuruTable from "../../components/izinTuru/IzinTuruTable/IzinTuruTable";

function IzinTuruPage() {
  const navigate = useNavigate();
  const [izinTurleri, setIzinTurleri] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET İzin Türleri
  const fetchIzinTurleri = async () => {
    try {
      setLoading(true);
      const data = await getIzinTurleri();
      setIzinTurleri(data);
    } catch (error) {
      console.error("İzin türlerini getirirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIzinTurleri();
  }, []);

  // DELETE İzin Türü
  const onDelete = async (id) => {
    try {
      await deleteIzinTuru(id);
      setIzinTurleri((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("İzin türü silinirken hata oluştu:", error);
    }
  };

  // Edit işlemi
  const onEdit = (id) => {
    navigate(`/izin-turleri/duzenle/${id}`);
  };

  // Create işlemi
  const handleCreate = () => {
    navigate("/izin-turleri/ekle");
  };

  if (loading) {
    return <div className="text-sm text-muted">Yükleniyor...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">İzin Türleri</h1>
        <Button text="Yeni İzin Türü Ekle" onClick={handleCreate} />
      </div>
      <IzinTuruTable
        izinTurleri={izinTurleri}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}

export default IzinTuruPage;

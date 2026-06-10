import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import { getDepartmanlar, deleteDepartman } from "../../api/departmanApi";
import DepartmanTable from "../../components/departman/DepartmanTable/DepartmanTable";

function DepartmanPage() {
  const navigate = useNavigate();
  const [departmanlar, setDepartmanlar] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET Departmanlar
  const fetchDepartmanlar = async () => {
    try {
      setLoading(true);
      const data = await getDepartmanlar();
      setDepartmanlar(data);
    } catch (error) {
      console.error("Departmanları getirirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartmanlar();
  }, []);

  // DELETE Departman
  const onDelete = async (id) => {
    try {
      await deleteDepartman(id);
      setDepartmanlar((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Departman silinirken hata oluştu:", error);
    }
  };

  // Edit işlemi
  const onEdit = (id) => {
    navigate(`/departman/duzenle/${id}`);
  };

  // Create işlemi
  const handleCreate = () => {
    navigate("/departman/ekle");
  };

  if (loading) {
    return <div className="text-sm text-muted">Yükleniyor...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Departmanlar</h1>
        <Button text="Yeni Departman Ekle" onClick={handleCreate} />
      </div>
      <DepartmanTable
        departmanlar={departmanlar}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}

export default DepartmanPage;

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { departmanData } from "../../data/personeller";
import Button from "../../components/common/Button/Button";

function DepartmanEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const departman = departmanData.find((d) => d.id === Number(id));
  const [ad, setAd] = useState(departman?.ad || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (departman) {
      departman.ad = ad;
      // departmanData referansını değiştirerek React'ın güncellemesini tetikle
      const temp = [...departmanData];
      departmanData.length = 0;
      temp.forEach(d => departmanData.push(d));
    }
    navigate("/departman");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Departman Düzenle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Departman Adı"
          value={ad}
          onChange={(e) => setAd(e.target.value)}
          required
        />
        <Button text="Güncelle" type="submit" />
      </form>
    </div>
  );
}

export default DepartmanEditPage;

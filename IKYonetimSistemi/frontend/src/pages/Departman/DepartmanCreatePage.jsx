import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { departmanData } from "../../data/personeller";
import Button from "../../components/common/Button/Button";

function DepartmanCreatePage() {
  const [ad, setAd] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    departmanData.push({ id: Date.now(), ad });
    navigate("/departman");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Departman Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Departman Adı"
          value={ad}
          onChange={(e) => setAd(e.target.value)}
          required
        />
        <Button text="Kaydet" type="submit" />
      </form>
    </div>
  );
}

export default DepartmanCreatePage;

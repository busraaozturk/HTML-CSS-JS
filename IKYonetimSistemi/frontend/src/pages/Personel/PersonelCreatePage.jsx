import { useState } from "react";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

function PersonelCreatePage() {

  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");

  const handleSubmit = () => {

    const yeniPersonel = {
      ad,
      soyad
    };

    console.log("Personel Eklendi:", yeniPersonel);

    // input temizleme
    setAd("");
    setSoyad("");
  };

  return (
    <div className="p-6 max-w-md">

      <h1 className="text-2xl font-bold mb-6">
        Yeni Personel
      </h1>

      <Input
        label="Ad"
        value={ad}
        onChange={(e) => setAd(e.target.value)}
        placeholder="Ad giriniz"
      />

      <Input
        label="Soyad"
        value={soyad}
        onChange={(e) => setSoyad(e.target.value)}
        placeholder="Soyad giriniz"
      />

      <Button
        text="Kaydet"
        onClick={handleSubmit}
      />

    </div>
  );
}

export default PersonelCreatePage;
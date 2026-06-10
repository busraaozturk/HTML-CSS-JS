import { useEffect, useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { getPersonel } from "../../../api/personelApi";
import { getDepartmanlar } from "../../../api/departmanApi";
import { getIzinTurleri } from "../../../api/izinTuruApi";

function IzinForm({ formData, onChange, onSubmit, buttonText = "Kaydet" }) {
  const [personeller, setPersoneller] = useState([]);
  const [departmanlar, setDepartmanlar] = useState([]);
  const [izinTurleri, setIzinTurleri] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personellerData, departmanlarData, izinTurleriData] = await Promise.all([
          getPersonel(),
          getDepartmanlar(),
          getIzinTurleri(),
        ]);
        setPersoneller(personellerData);
        setDepartmanlar(departmanlarData);
        setIzinTurleri(izinTurleriData);
      } catch (error) {
        console.error("Form verileri getirilirken hata oluştu:", error);
      }
    };

    fetchData();
  }, []);

  // Personel seçilince bağlı olduğu departmanı otomatik doldur
  const onPersonelChange = (e) => {
    const personelId = e.target.value;

    onChange({ target: { name: "personelId", value: personelId } });

    const personel = personeller.find((p) => p.id == personelId);
    onChange({
      target: {
        name: "departmanId",
        value: personel ? personel.departmanId : "",
      },
    });
  };

  const departmanAdi =
    departmanlar.find((d) => d.id == formData.departmanId)?.name || "";

  return (
    <div className="card max-w-md p-6 sm:p-8">
      <div className="flex flex-col gap-1 mb-4">
        <label className="field-label">Personel</label>
        <select
          name="personelId"
          value={formData.personelId}
          onChange={onPersonelChange}
          className="field-input"
        >
          <option value="">Personel Seçiniz</option>
          {personeller.map((p) => (
            <option key={p.id} value={p.id}>{`${p.ad} ${p.soyad}`}</option>
          ))}
        </select>
      </div>

      <Input
        label="Departman"
        name="departmanAdi"
        value={departmanAdi}
        onChange={() => {}}
        placeholder="Personel seçildiğinde otomatik dolar"
        disabled
      />

      <Input
        label="Başlangıç Tarihi"
        name="baslangicTarih"
        type="date"
        value={formData.baslangicTarih}
        onChange={onChange}
      />

      <Input
        label="Bitiş Tarihi"
        name="bitisTarih"
        type="date"
        value={formData.bitisTarih}
        onChange={onChange}
      />

      <div className="flex flex-col gap-1 mb-4">
        <label className="field-label">İzin Türü</label>
        <select
          name="izinTuruId"
          value={formData.izinTuruId}
          onChange={onChange}
          className="field-input"
        >
          <option value="">İzin Türü Seçiniz</option>
          {izinTurleri.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <label className="field-label">Durum</label>
        <select
          name="durum"
          value={formData.durum}
          onChange={onChange}
          className="field-input"
        >
          <option value="">Durum Seçiniz</option>
          <option value="Onaylandı">Onaylandı</option>
          <option value="Reddedildi">Reddedildi</option>
          <option value="Beklemede">Beklemede</option>
        </select>
      </div>

      <div className="mt-2">
        <Button text={buttonText} onClick={onSubmit} />
      </div>
    </div>
  );
}

export default IzinForm;

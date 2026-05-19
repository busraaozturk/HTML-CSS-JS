import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { personelData } from "../../../data/personeller";

function IzinForm({ formData, onChange, onSubmit, buttonText = "Kaydet" }) {
  return (
    <div className="max-w-md">
      <div className="flex flex-col gap-1 mb-3">
        <label className="text-sm text-gray-600">Personel</label>
        <select
          name="personelId"
          value={formData.personelId}
          onChange={onChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="">Personel Seçiniz</option>
          {personelData.map((p) => (
            <option key={p.id} value={p.id}>{`${p.ad} ${p.soyad}`}</option>
          ))}
        </select>
      </div>

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

      <div className="flex flex-col gap-1 mb-3">
        <label className="text-sm text-gray-600">İzin Türü</label>
        <select
          name="izinTuru"
          value={formData.izinTuru}
          onChange={onChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="">İzin Türü Seçiniz</option>
          <option value="Yıllık İzin">Yıllık İzin</option>
          <option value="Raporlu">Raporlu</option>
          <option value="Ücretsiz İzin">Ücretsiz İzin</option>
        </select>
      </div>

      <div className="flex flex-col gap-1 mb-3">
        <label className="text-sm text-gray-600">Durum</label>
        <select
          name="durum"
          value={formData.durum}
          onChange={onChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="">Durum Seçiniz</option>
          <option value="Onaylandı">Onaylandı</option>
          <option value="Reddedildi">Reddedildi</option>
          <option value="Beklemede">Beklemede</option>
        </select>
      </div>

      <div className="mt-4">
        <Button text={buttonText} onClick={onSubmit} />
      </div>
    </div>
  );
}

export default IzinForm;

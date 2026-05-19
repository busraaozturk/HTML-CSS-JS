import Button from "../../common/Button/Button";

function IzinTable({ izinler, onEdit, onDelete, getPersonelAdi }) {
  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Personel</th>
          <th className="p-2 border">Başlangıç Tarihi</th>
          <th className="p-2 border">Bitiş Tarihi</th>
          <th className="p-2 border">İzin Türü</th>
          <th className="p-2 border">Durum</th>
          <th className="p-2 border">İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {izinler.map((izin) => (
          <tr key={izin.id} className="text-center">
            <td className="border p-2">{izin.id}</td>
            <td className="border p-2">{getPersonelAdi(izin.personelId)}</td>
            <td className="border p-2">{izin.baslangicTarih}</td>
            <td className="border p-2">{izin.bitisTarih}</td>
            <td className="border p-2">{izin.izinTuru}</td>
            <td className="border p-2">{izin.durum}</td>
            <td className="border p-2">
              <div className="flex justify-center gap-2">
                <Button text="Düzenle" onClick={() => onEdit(izin.id)} />
                <Button text="Sil" onClick={() => onDelete(izin.id)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default IzinTable;

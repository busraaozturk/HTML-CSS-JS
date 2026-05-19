import Button from "../../common/Button/Button";

function DepartmanTable({ departmanlar, onDelete, onEdit }) {
  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Ad</th>
          <th className="p-2 border">İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {departmanlar.map((d) => (
          <tr key={d.id} className="text-center">
            <td className="border p-2">{d.id}</td>
            <td className="border p-2">{d.ad}</td>
            <td className="border p-2">
              <div className="flex justify-center gap-2">
                <Button text="Düzenle" onClick={() => onEdit(d.id)} />
                <Button text="Sil" onClick={() => onDelete(d.id)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DepartmanTable;

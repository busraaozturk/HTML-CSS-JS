import React, {useState} from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false); // Düzenleme modunu kontrol eden state
  const [editedText, setEditedText] = useState(todo.text); // Düzenleme sırasında yeni metni tutacak state

  const handleUpdate = () => {
    onEdit(todo.id, editedText); // Düzenlenen metni Home bileşenine gönder
    setIsEditing(false); // Düzenleme modundan çık
  };

  return (
    <div className="card flex items-center justify-between hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4 flex-1">
        <input
          type="checkbox"
          className="w-5 h-5 text-blue-500 cursor-pointer"
          // TODO: onChange handler'ı ekle
          checked={todo.completed}  // Checkbox'ın durumunu todo.completed değerine bağla
          onChange={() => onToggle(todo.id)} // Checkbox değiştiğinde onToggle fonksiyonunu çağır ve todo'nun id'sini gönder
        />

        {/* Düzenleme modunda ise input göster, değilse görev metnini göster */}
        {isEditing ? (
          <input type='text'
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)} // Düzenleme sırasında metni güncelle
            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoFocus   // Input açıldığında otomatik olarak odaklanır
          />
        ) : (
          <span
            className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
            // TODO: Tamamlanmış görev için dynamik class ekle
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Butonlar Grubu */}
      <div className='flex gap-2 ml-4'>
        {isEditing ? (
          <button
            className="btn-primary text-sm px-3 py-1"
            onClick={handleUpdate} // Güncelleme işlemini gerçekleştir
          >
            Kaydet
          </button>
        ) : (
          <button
            className="btn-secondary text-sm px-3 py-1"
            onClick={() => setIsEditing(true)} // Düzenleme modunu aç
          >
            Düzenle
          </button>
        )}

        <button
        className="btn-secondary"
        onClick={() => onDelete(todo.id)} // Tıklandığında Home'daki deleteTodo çalışır
        // TODO: onClick handler'ı ekle
      >
        Sil
      </button>
      </div>
      
    </div>
  );
};

export default TodoItem;

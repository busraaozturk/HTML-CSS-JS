import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="card flex items-center justify-between hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4 flex-1">
        <input
          type="checkbox"
          className="w-5 h-5 text-blue-500 cursor-pointer"
          // TODO: onChange handler'ı ekle
        />
        <span
          className={`text-lg`}
          // TODO: Tamamlanmış görev için dynamik class ekle
        >
          {todo.text}
        </span>
      </div>
      <button
        className="btn-secondary"
        // TODO: onClick handler'ı ekle
      >
        Sil
      </button>
    </div>
  );
};

export default TodoItem;

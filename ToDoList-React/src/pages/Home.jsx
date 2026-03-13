import React, { useState } from 'react';
import Layout from '../components/Layout';
import TodoList from '../components/TodoList';

const Home = () => {
  // TODO: State'leri burada tanımla
  const [task, setTask] = useState(''); // Yazılan Metni Tutacak State

  const handleAddClick = () => {
    if (task.trim() === '') return; // Boş görev eklenmesini engelle

    console.log('Yeni görev eklendi:', task);
    setTask(''); // Ekleme sonrası inputu temizle
  }

  // TODO: toggleTodo methodunu yaz

  // TODO: deleteTodo methodunu yaz

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Görev Listesi
        </h1>

        <div className="card mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Yeni görev ekleyin..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={task}  // Inputun değerini state ile bağla
              onChange={(e) => setTask(e.target.value)} // Input değiştiğinde state'i güncelle
            />
            <button
              className="btn-primary"
              onClick={handleAddClick}  // Ekle butonuna tıklandığında handleAddClick fonksiyonunu çağır
            >
              Ekle
            </button>
          </div>
        </div>

        <TodoList
          todos={[]}
          onToggle={() => {}}
          onDelete={() => {}}
        />
      </div>
    </Layout>
  );
};

export default Home;

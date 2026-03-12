import React, { useState } from 'react';
import Layout from '../components/Layout';
import TodoList from '../components/TodoList';

const Home = () => {
  // TODO: State'leri burada tanımla

  // TODO: addTodo methodunu yaz

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
            />
            <button
              className="btn-primary"
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

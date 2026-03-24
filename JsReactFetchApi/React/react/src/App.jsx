import { useState, useEffect } from 'react';
import UserCard from './components/UserCard';
import './App.css'; // Stil dosyanı buraya import etmeyi unutma

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        if (!response.ok) {
          throw new Error(`Veri Çekilemedi! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="app-wrapper">
      <h1>Kullanıcı Listesi</h1>

      {/* Durum Mesajları */}
      {loading && <div id="status-message" className="loading">Kullanıcılar yükleniyor...</div>}
      {error && <div id="status-message" className="error">{error}</div>}

      {/* Kullanıcı Kartları */}
      {!loading && !error && (
        <div className="container">
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
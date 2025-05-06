import React, { useEffect, useState } from 'react';
import '../Styles/dashboard.css';
import Sidebar from '../Components/Sidebar';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(storedBooks);

    // Kategoriyalarni avtomatik aniqlab hisoblash
    const counts = {};
    storedBooks.forEach(book => {
      const category = book.category || "Noma'lum";
      counts[category] = (counts[category] || 0) + 1;
    });

    setCategoryCounts(counts);
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="container">
        <main className="main-content">
          <h1 className="dashboard-title">Xush kelibsiz, Kutubxonamizga!</h1>
          <div className="stats-grid">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <div className="stat-card" key={category}>
                <h3>{category}</h3>
                <p>{count} ta</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

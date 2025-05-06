import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import '../Styles/orders.css'
const initialOrders = [
  {
    id: 1,
    customer: "Abdulloh Karimov",
    product: "O'tgan kunlar",
    phone: "+998 91 123 45 67",
    status: "Yangi",
  },
  {
    id: 2,
    customer: "Dilshod Xasanov",
    product: "Sariq devni minib",
    phone: "+998 99 765 43 21",
    status: "Jarayonda",
  },
  {
    id: 3,
    customer: "Nozima Qodirova",
    product: "Alkimyogar",
    phone: "+998 93 888 77 66",
    status: "Yakunlangan",
  },
];
function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");

  const filtered = orders.filter((order) =>
    order.customer.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = (id, newStatus) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm("Buyurtmani o‘chirishni istaysizmi?")) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  return (
    <div className='dashboard-container'>
      <Sidebar/>
      <div className="container">
      <div className="orders-page">
      <h2>Buyurtmalar</h2>

      <input
        type="text"
        placeholder="Mijoz nomi bo‘yicha qidiruv..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="order-list">
        {filtered.map((order) => (
          <div key={order.id} className="order-card">
            <div>
              <h3>{order.customer}</h3>
              <p><strong>Mahsulot:</strong> {order.product}</p>
              <p><strong>Telefon:</strong> {order.phone}</p>
            </div>

            <div className={`status ${order.status}`}>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                <option value="Yangi">Yangi</option>
                <option value="Jarayonda">Jarayonda</option>
                <option value="Yakunlangan">Yakunlangan</option>
              </select>
            </div>

            <div className="order-actions">
              <button onClick={() => handleDelete(order.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
      </div>
      
    </div>
  )
}

export default Orders

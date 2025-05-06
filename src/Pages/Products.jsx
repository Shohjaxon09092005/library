import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import '../Styles/products.css'
import initialBooks from '../js/libraryData';

function Products() {
  const storedBooks = JSON.parse(localStorage.getItem("books"));
  const [books, setBooks] = useState(storedBooks || initialBooks);

  const [form, setForm] = useState({
    name: "",
    author: "",
    category: "",
    price: "",
    status: "Bor",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      ...form,
      id: editId || Date.now(),
      price: parseInt(form.price),
    };

    if (editId) {
      const updated = books.map((b) => b.id === editId ? newBook : b);
      setBooks(updated);
    } else {
      setBooks([...books, newBook]);
    }

    setForm({
      name: "",
      author: "",
      category: "",
      price: "",
      status: "Bor",
    });
    setEditId(null);
  };

  const handleEdit = (book) => {
    setForm({
      name: book.name,
      author: book.author,
      category: book.category,
      price: book.price,
      status: book.status,
    });
    setEditId(book.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Haqiqatan ham o‘chirmoqchimisiz?")) {
      setBooks(books.filter((b) => b.id !== id));
    }
  };

  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='dashboard-container'>
      <Sidebar />
      <div className="container">
        <h2>📚 Kutubxona</h2>
        <p><strong>Jami kitoblar:</strong> {books.length} ta</p>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Kitob nomi"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Muallif"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            required
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value="">Kategoriyani tanlang</option>
            <option value="Jahon adabiyoti">Jahon adabiyoti</option>
            <option value="Tarixiy kitoblar">Tarixiy kitoblar</option>
            <option value="Ilmiy kitoblar">Ilmiy kitoblar</option>
            <option value="Diniy kitoblar">Diniy kitoblar</option>
            <option value="Badiiy kitoblar">Badiiy kitoblar</option>
          </select>
          <input
            type="number"
            placeholder="Narx (so‘m)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="Bor">Bor</option>
            <option value="Tugagan">Tugagan</option>
          </select>
          <button type="submit">{editId ? "Yangilash" : "Qo‘shish"}</button>
        </form>

        <input
          type="text"
          className="search-input"
          placeholder="Kitob nomi bo‘yicha qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="book-list">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.name}</h3>
              <p><strong>Muallif:</strong> {book.author}</p>
              <p><strong>Kategoriya:</strong> {book.category}</p>
              <p><strong>Narxi:</strong> {book.price.toLocaleString()} so‘m</p>
              <p><strong>Status:</strong> {book.status}</p>
              <button onClick={() => handleEdit(book)}>✏️</button>
              <button onClick={() => handleDelete(book.id)}>🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;

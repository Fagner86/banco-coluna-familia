import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    column1: '',
    column2: ''
  });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://banco-coluna-familia-server.onrender.com/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`https://banco-coluna-familia-server.onrender.com/data/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post('https://banco-coluna-familia-server.onrender.com/data', formData);
      }
      setFormData({ column1: '', column2: '' });
      fetchData();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleEdit = (item) => {
    setFormData({ column1: item.column1, column2: item.column2 });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://banco-coluna-familia-server.onrender.com/data/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Banco de Dados Coluna Família</span>
        </div>
      </nav>
      <div className="container mt-5">
        <h2>{editId ? 'Editar dados' : 'Inserir Dados'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="column1" className="form-label">Coluna 1</label>
            <input
              type="text"
              className="form-control"
              id="column1"
              name="column1"
              value={formData.column1}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="column2" className="form-label">Coluna 2</label>
            <input
              type="text"
              className="form-control"
              id="column2"
              name="column2"
              value={formData.column2}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Submit'}</button>
        </form>
        <h2 className="mt-5">Dados List</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Coluna 1</th>
              <th>Coluna 2</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.column1}</td>
                <td>{item.column2}</td>
                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

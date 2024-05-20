import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    column1: '',
    column2: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://banco-coluna-familia-server.onrender.com/data', formData);
      console.log('Data inserted:', response.data);
      // Limpa o formulário após a submissão
      setFormData({ column1: '', column2: '' });
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Insert Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="column1" className="form-label">Column 1</label>
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
          <label htmlFor="column2" className="form-label">Column 2</label>
          <input
            type="text"
            className="form-control"
            id="column2"
            name="column2"
            value={formData.column2}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default App;

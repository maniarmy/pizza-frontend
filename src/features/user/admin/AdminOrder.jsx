import React, { useEffect, useState } from 'react';
import { getAllOrders } from "../../../services/apiRestaurant";

function AdminOrder() {
  const [data, setData] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    unitPrice: '',
    imageUrl: '',
    ingredients: [],
    soldOut: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAddMenuItem, setShowAddMenuItem] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const orders = await getAllOrders();
      setData(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMenuItem({ ...newMenuItem, [name]: value });
  };

  const handleIngredientsChange = (event) => {
    const { value } = event.target;
    // Split ingredients by comma and trim whitespace
    const ingredients = value.split(',').map(ingredient => ingredient.trim());
    setNewMenuItem({ ...newMenuItem, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/menu/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMenuItem),
      });

      if (response.ok) {
        console.log('Menu item added successfully');
        // Optionally, you can fetch updated data after adding the new item
        fetchData();
        // Clear form fields
        setNewMenuItem({
          name: '',
          unitPrice: '',
          imageUrl: '',
          ingredients: [],
          soldOut: false
        });
      } else {
        console.error('Failed to add menu item');
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    border: '1px solid #000',
    padding: '8px',
  };

  const tdStyle = {
    border: '1px solid #000',
    padding: '8px',
  };

  return (
    <div style={{ display: 'flex' }}>
      <div className="w-1/3 mr-5">
  <h2 className="text-2xl text-stone-700 font-extrabold mb-4">Admin Menu</h2>
  <ul className="bg-cyan-300 p-4 rounded-lg shadow-lg">
    <li className="mb-3">
      <button
        onClick={() => setShowAddMenuItem(false)}
        className="w-full bg-stone-300 text-stone-700 py-2 px-4 rounded hover:bg-stone-400 transition duration-300"
      >
        View Pizza Orders
      </button>
    </li>
    <li className="mb-3">
      <button
        onClick={() => setShowAddMenuItem(true)}
        className="w-full bg-stone-300 text-stone-700 py-2 px-4 rounded hover:bg-stone-500 transition duration-300"
      >
        Add Pizza Menu
      </button>
    </li>
    <li>
      <button
        onClick={() => setShowAddMenuItem(true)}
        className="w-full bg-stone-300 text-stone-700 py-2 px-4 rounded hover:bg-stone-600 transition duration-300"
      >
        Update Pizza Menu
      </button>
    </li>
  </ul>
</div>


      <div style={{ flex: 1 }}>
        <h1>{showAddMenuItem ? 'Add Pizza Menu Item' : 'Customer Orders Table'}</h1>
        
        {showAddMenuItem ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={newMenuItem.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="unitPrice">
              Unit Price:
            </label>
            <input
              type="number"
              name="unitPrice"
              id="unitPrice"
              value={newMenuItem.unitPrice}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="imageUrl">
              Image URL:
            </label>
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              value={newMenuItem.imageUrl}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="ingredients">
              Ingredients (comma-separated):
            </label>
            <input
              type="text"
              name="ingredients"
              id="ingredients"
              value={newMenuItem.ingredients}
              onChange={handleIngredientsChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="text-gray-700 font-bold mr-2" htmlFor="soldOut">
              Sold Out:
            </label>
            <input
              type="checkbox"
              name="soldOut"
              id="soldOut"
              checked={newMenuItem.soldOut}
              onChange={() => setNewMenuItem({ ...newMenuItem, soldOut: !newMenuItem.soldOut })}
              className="form-checkbox h-5 w-5 text-gray-600"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-500 text-white p-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            >
              {isLoading ? 'Adding...' : 'Add Menu Item'}
            </button>
          </div>
        </form>
        
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Customer Name</th>
                <th style={thStyle}>Address</th>
                <th style={thStyle}>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td style={tdStyle}>{row.id}</td>
                  <td style={tdStyle}>{row.customer}</td>
                  <td style={tdStyle}>{row.address}</td>
                  <td style={tdStyle}>{row.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminOrder;

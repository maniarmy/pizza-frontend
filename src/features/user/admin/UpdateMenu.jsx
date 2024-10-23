// UpdateMenu.js
import React, { useState, useEffect } from 'react';

const UpdateMenu = ({ menuId, onUpdateMenu }) => {
  const [menuData, setMenuData] = useState({
    name: '',
    unitPrice: '',
    imageUrl: '',
    ingredients: '',
    soldOut: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch menu item data based on menuId
    fetchMenuItem(menuId);
  }, [menuId]);

  const fetchMenuItem = async (id) => {
    try {
      // Simulate fetching menu item from API
      // Replace with actual API call
      const response = await fetch(`http://localhost:8080/menu/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch menu item');
      }
      const data = await response.json();
      setMenuData(data);
    } catch (error) {
      console.error('Error fetching menu item:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMenuData({ ...menuData, [name]: value });
  };

  const handleIngredientsChange = (event) => {
    const { value } = event.target;
    setMenuData({ ...menuData, ingredients: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Simulate update menu item API call
      // Replace with actual API call
      const response = await fetch(`http://localhost:8080/menu/update/${menuId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuData),
      });

      if (response.ok) {
        console.log('Menu item updated successfully');
        onUpdateMenu(menuData); // Notify parent component
      } else {
        console.error('Failed to update menu item');
      }
    } catch (error) {
      console.error('Error updating menu item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Update Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={menuData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Unit Price:
          <input
            type="number"
            name="unitPrice"
            value={menuData.unitPrice}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={menuData.imageUrl}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Ingredients (comma-separated):
          <input
            type="text"
            name="ingredients"
            value={menuData.ingredients}
            onChange={handleIngredientsChange}
          />
        </label>
        <br />
        <label>
          Sold Out:
          <input
            type="checkbox"
            name="soldOut"
            checked={menuData.soldOut}
            onChange={() => setMenuData({ ...menuData, soldOut: !menuData.soldOut })}
          />
        </label>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Menu Item'}
        </button>
      </form>
    </div>
  );
};

export default UpdateMenu;

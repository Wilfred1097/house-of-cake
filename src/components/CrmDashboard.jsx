import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeAuthToken, isAuthenticated } from '../utils/auth';
import { cakeCategories } from '../data/cakes';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import FooterManager from './FooterManager';
import { API_BASE_URL } from '../config/config';

export default function CrmDashboard() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(cakeCategories);
  const [editingCake, setEditingCake] = useState(null);
  const [newCake, setNewCake] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    removeAuthToken();
    navigate('/login');
  };

  const handleImageUpload = async (file, isEditing = false) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (isEditing) {
        setEditingCake(prev => ({ ...prev, image: data.imagePath }));
      } else {
        setNewCake(prev => ({ ...prev, image: data.imagePath }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const updateCakesFile = async (newCategories) => {
    try {
      await fetch(`${API_BASE_URL}/api/updateCakes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categories: newCategories }),
      });
    } catch (error) {
      console.error('Error updating cakes file:', error);
    }
  };

  const handleEditCake = (cake, categoryIndex) => {
    setEditingCake({ ...cake, categoryIndex });
  };

  const handleUpdateCake = async () => {
    if (!editingCake) return;

    const newCategories = [...categories];
    const categoryIndex = editingCake.categoryIndex;
    const cakeIndex = newCategories[categoryIndex].cakes.findIndex(
      cake => cake.name === editingCake.name
    );

    newCategories[categoryIndex].cakes[cakeIndex] = {
      name: editingCake.name,
      description: editingCake.description,
      price: editingCake.price,
      image: editingCake.image
    };

    setCategories(newCategories);
    await updateCakesFile(newCategories);
    setEditingCake(null);
  };

  const handleAddNewCake = async (categoryIndex) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].cakes.push(newCake);
    setCategories(newCategories);
    await updateCakesFile(newCategories);
    setNewCake({
      name: '',
      description: '',
      price: '',
      image: ''
    });
  };

  const handleDeleteCake = async (cakeName, categoryIndex) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].cakes = newCategories[categoryIndex].cakes.filter(
      cake => cake.name !== cakeName
    );
    setCategories(newCategories);
    await updateCakesFile(newCategories);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <a href="/"><h1 className="text-2xl md:text-3xl font-serif text-brand-900">Cake Management</h1></a>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <FooterManager />

        {categories.map((category, categoryIndex) => (
          <div key={category.title} className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-serif text-brand-900 mb-4">{category.title}</h2>
            
            <div className="grid gap-4">
              {category.cakes.map((cake) => (
                <div key={cake.name} className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
                        <img 
                          src={cake.image} 
                          alt={cake.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{cake.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{cake.description}</p>
                        <p className="text-brand-600 font-medium">₱{cake.price}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCake(cake, categoryIndex)}
                        className="p-2 text-brand-600 hover:bg-brand-50 rounded-full"
                      >
                        <FaPen className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCake(cake.name, categoryIndex)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <button
                onClick={() => document.getElementById(`addForm${categoryIndex}`).classList.toggle('hidden')}
                className="flex items-center gap-2 text-brand-600 hover:text-brand-700"
              >
                <FaPlus className="w-4 h-4" />
                <span>Add New Cake</span>
              </button>
              
              <div id={`addForm${categoryIndex}`} className="hidden mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Cake Name"
                    className="border rounded-md p-2"
                    value={newCake.name}
                    onChange={(e) => setNewCake({...newCake, name: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    className="border rounded-md p-2"
                    value={newCake.price}
                    onChange={(e) => setNewCake({...newCake, price: e.target.value})}
                  />
                  <div className="md:col-span-2">
                    <textarea
                      placeholder="Description"
                      className="border rounded-md p-2 w-full"
                      value={newCake.description}
                      onChange={(e) => setNewCake({...newCake, description: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                      accept="image/*"
                    />
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="bg-brand-600 text-white px-4 py-2 rounded-md hover:bg-brand-700"
                    >
                      Upload Image
                    </button>
                    {newCake.image && (
                      <span className="ml-2 text-sm text-gray-600">
                        Image uploaded
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddNewCake(categoryIndex)}
                    className="md:col-span-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Add Cake
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {editingCake && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <h3 className="text-xl font-medium mb-4">Edit Cake</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  value={editingCake.name}
                  onChange={(e) => setEditingCake({...editingCake, name: e.target.value})}
                />
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  value={editingCake.price}
                  onChange={(e) => setEditingCake({...editingCake, price: e.target.value})}
                />
                <textarea
                  className="border rounded-md p-2 w-full"
                  value={editingCake.description}
                  onChange={(e) => setEditingCake({...editingCake, description: e.target.value})}
                />
                <div>
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e.target.files[0], true)}
                    className="mb-2"
                    accept="image/*"
                  />
                  {editingCake.image && (
                    <div className="mt-2">
                      <img
                        src={editingCake.image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingCake(null)}
                    className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateCake}
                    className="bg-brand-600 text-white px-4 py-2 rounded-md hover:bg-brand-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
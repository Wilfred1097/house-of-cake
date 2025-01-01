import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { footerDetails } from '../data/cakes';

export default function FooterManager() {
  const [editing, setEditing] = useState(false);
  const [details, setDetails] = useState(footerDetails);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/updateFooter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ footerDetails: details }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to update footer details');
      }

      const data = await response.json();
      if (data.success) {
        setEditing(false);
        // Refresh the page to show updated details
        window.location.reload();
      } else {
        throw new Error(data.error || 'Failed to update footer details');
      }
    } catch (error) {
      console.error('Error updating footer details:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!editing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-serif text-brand-900">Footer Details</h2>
          <button
            onClick={() => setEditing(true)}
            className="p-2 text-brand-600 hover:bg-brand-50 rounded-full"
          >
            <FaPen className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          <p><strong>Phone:</strong> {details.phone}</p>
          <p><strong>Address:</strong> {details.address}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
      <h2 className="text-xl md:text-2xl font-serif text-brand-900 mb-4">
        {editing ? 'Edit Footer Details' : 'Footer Details'}
      </h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            value={details.phone}
            onChange={(e) => setDetails({ ...details, phone: e.target.value })}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            value={details.address}
            onChange={(e) => setDetails({ ...details, address: e.target.value })}
            className="w-full border rounded-md p-2"
            rows={3}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditing(false)}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
} 
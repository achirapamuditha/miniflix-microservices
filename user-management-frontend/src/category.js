import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './category.css'; // Import the CSS for category page

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [activeTab, setActiveTab] = useState('categories'); // Initialize activeTab to 'categories'
  const navigate = useNavigate(); // Use navigate hook

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8082/content-service/category'); // Change the URL if necessary
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add Category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      setMessage('Category name is required');
      setMessageType('error');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8082/content-service/category', { name: newCategoryName });
      setCategories([...categories, response.data]);
      setNewCategoryName('');
      setShowAddCategoryModal(false);
      setMessage('Category added successfully');
      setMessageType('success');
    } catch (error) {
      console.error('Error adding category:', error);
      setMessage('Error adding category');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // Delete Category
  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:8082/content-service/category/${categoryId}`);
        setCategories(categories.filter((category) => category.id !== categoryId));
        setMessage('Category deleted successfully');
        setMessageType('success');
      } catch (error) {
        console.error('Error deleting category:', error);
        setMessage('Error deleting category');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle navigation back to dashboard
  const goToDashboard = () => {
    navigate('/admin'); // Navigate to the admin dashboard page
  };

  return (
    <div className="admin-category-wrapper">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-accent"></div>
        <h2 className="sidebar-title">MINIFLIX</h2>
        <p className="admin-badge">ADMIN</p>

        <ul className="sidebar-menu">
   
          <li className="sidebar-item">
            <button
              onClick={() => { 
                setActiveTab('users'); // Set activeTab to 'users'
                navigate('/admin'); // Navigate to Manage Users
              }}
              className={`sidebar-link ${activeTab === 'users' ? 'active' : ''}`} // Set active class conditionally
            >
              <span className="sidebar-dot"></span>
              <span>Manage Users</span>
            </button>
          </li>
          <li className="sidebar-item">
            <button
              onClick={() => { 
                setActiveTab('categories'); // Set activeTab to 'categories'
                navigate('/admin/manage-categories'); // Navigate to Manage Categories
              }}
              className={`sidebar-link ${activeTab === 'categories' ? 'active' : ''}`} // Set active class conditionally
            >
              <span className="sidebar-dot"></span>
              <span>Manage Categories</span>
            </button>
          </li>
          <li className="sidebar-item">
            <button
              onClick={() => { 
                setActiveTab('content'); // Set activeTab to 'content'
                navigate('/admin/content'); // Navigate to Manage Content
              }}
              className={`sidebar-link ${activeTab === 'content' ? 'active' : ''}`} // Set active class conditionally
            >
              <span className="sidebar-dot"></span>
              <span>Manage Content</span>
            </button>
          </li>
          <li className="sidebar-item">
            <button
              onClick={() => { 
                setActiveTab('subscription'); // Set activeTab to 'subscription'
                navigate('/admin/subscription'); // Navigate to Manage Subscription
              }}
              className={`sidebar-link ${activeTab === 'subscription' ? 'active' : ''}`} // Set active class conditionally
            >
              <span className="sidebar-dot"></span>
              <span>Manage Subscription</span>
            </button>
          </li>
        </ul>

        {/* Back to Dashboard Button inside Sidebar */}
        <div className="sidebar-footer">
          <button onClick={goToDashboard} className="back-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="admin-con-area">
        <h2 className="category-heading">Manage Categories</h2>

        {/* Display message */}
        {message && <div className={`alert alert-${messageType}`}>{message}</div>}

        {/* Category List */}
        <div className="category-list">
          <h3>All Categories</h3>
          <button onClick={() => setShowAddCategoryModal(true)} className="add-category-button">
            Add Category
          </button>
          <ul>
            {categories.map((category) => (
              <li key={category.categoryId} className="category-item"> {/* Use category.categoryId as key */}
                <div>{category.name}</div>
                <button onClick={() => handleDeleteCategory(category.categoryId)} className="delete-category-button">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Add Category Modal */}
        {showAddCategoryModal && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Add Category</h2>
                <button onClick={() => setShowAddCategoryModal(false)} className="modal-close">
                  ✕
                </button>
              </div>
              <div className="modal-form">
                <div className="form-group">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="modal-buttons">
                <button
                  onClick={handleAddCategory}
                  disabled={loading}
                  className="btn-update"
                >
                  {loading ? 'Adding...' : 'Add Category'}
                </button>
                <button onClick={() => setShowAddCategoryModal(false)} className="btn-close">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;

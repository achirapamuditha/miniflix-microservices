import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './content.css'; // Import the CSS for content page

const Content = () => {
  const [content, setContent] = useState([]);
  const [newContentData, setNewContentData] = useState({ title: '', description: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [contentType, setContentType] = useState('');
  const [editMode, setEditMode] = useState(false); // To track if it's Edit mode
  const [editContentId, setEditContentId] = useState(null); // Track content ID for editing
  
  const navigate = useNavigate(); // Use navigate hook

  // Fetch all content from the backend
  const fetchContent = async () => {
    try {
      const response = await axios.get('http://localhost:8082/content-service/api/content');
      console.log('Fetched content:', response.data); // Log the fetched content
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Add new content
  const handleAddContent = async () => {
    if (!newContentData.title || !newContentData.description || !newContentData.type) {
      setMessage('All fields are required');
      setMessageType('error');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8082/content-service/api/content', newContentData);
      setContent([...content, response.data]);
      setMessage('Content added successfully');
      setMessageType('success');
      setNewContentData({ title: '', description: '', type: '' });
      setShowAddContentModal(false);
    } catch (error) {
      console.error('Error adding content:', error);
      setMessage('Error adding content');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // Delete content
  const handleDeleteContent = async (contentId) => {
    if (!contentId) {
      console.error('No contentId provided');
      setMessage('No contentId provided');
      setMessageType('error');
      return;
    }

    if (window.confirm('Are you sure you want to delete this content?')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:8082/content-service/api/content/${contentId}`);
        setContent(content.filter((contentItem) => contentItem.contentId !== contentId));
        setMessage('Content deleted successfully');
        setMessageType('success');
      } catch (error) {
        console.error('Error deleting content:', error);
        setMessage('Error deleting content');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle content update
  const handleUpdateContent = async () => {
    if (!newContentData.title || !newContentData.description || !newContentData.type) {
      setMessage('All fields are required');
      setMessageType('error');
      return;
    }

    setLoading(true);
    try {
      // Make PUT request to update the content
      const response = await axios.put(`http://localhost:8082/content-service/api/content/${editContentId}`, newContentData);
      console.log('Updated content:', response.data); // Log the updated content

      // Update the content in the frontend state by replacing the existing content
      setContent(content.map((item) => 
        item.contentId === editContentId ? { ...item, ...response.data } : item
      ));

      setMessage('Content updated successfully');
      setMessageType('success');
      setNewContentData({ title: '', description: '', type: '' });
      setShowAddContentModal(false);
      setEditMode(false); // Reset edit mode
      setEditContentId(null); // Reset edit content ID
    } catch (error) {
      console.error('Error updating content:', error);
      setMessage('Error updating content');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit content - populate modal for editing
  const handleEditContent = (contentId) => {
    console.log('Editing content with ID:', contentId); // Log the contentId to ensure it's passed correctly

    const contentToEdit = content.find(item => item.contentId === contentId);

    if (!contentToEdit) {
      console.error(`Content with ID ${contentId} not found.`);
      return; // Exit if the content is not found
    }

    // Populate the modal with content to edit
    setNewContentData({
      title: contentToEdit.title,
      description: contentToEdit.description,
      type: contentToEdit.type
    });

    setEditMode(true);  // Set Edit Mode to true
    setEditContentId(contentId);  // Store the content ID for updating
    setShowAddContentModal(true); // Open modal
  };

  // Handle search by title
  const handleSearchByTitle = async () => {
    if (!searchTitle.trim()) {
      setMessage('Please enter a title');
      setMessageType('error');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8082/content-service/api/content?title=${searchTitle}`);
      setContent(response.data);
      setMessage('Content found');
      setMessageType('success');
    } catch (error) {
      console.error('Error searching content:', error);
      setMessage('Error searching content');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // Handle filter by type
  const handleFilterByType = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8082/content-service/api/content?type=${contentType}`);
      setContent(response.data);
      setMessage('Content filtered by type');
      setMessageType('success');
    } catch (error) {
      console.error('Error filtering content by type:', error);
      setMessage('Error filtering content');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // Handle navigation back to dashboard
  const goToDashboard = () => {
    navigate('/admin-main-page'); // Navigate to the admin dashboard page
  };

  return (
    <div className="admin-dashboard-wrapper">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-accent"></div>
        <h2 className="sidebar-title">MINIFLIX</h2>
        <p className="admin-badge">ADMIN</p>

        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <button
              onClick={() => window.location.href = '/admin'}
              className={`sidebar-link`}
            >
              <span className="sidebar-dot"></span>
              <span>Manage Users</span>
            </button>
          </li>
          <li className="sidebar-item">
            <button
              onClick={() => window.location.href = '/admin/manage-categories'}
              className={`sidebar-link`}
            >
              <span className="sidebar-dot"></span>
              <span>Manage Categories</span>
            </button>
          </li>
          <li className="sidebar-item">
            <button
              onClick={() => window.location.href = '/admin/content'}
              className={`sidebar-link`}
            >
              <span className="sidebar-dot"></span>
              <span>Manage Content</span>
            </button>
          </li>
          <li className="sidebar-item">
            <button
              onClick={() => window.location.href = '/admin/subscription'}
              className={`sidebar-link`}
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
      <div className="admin-content-area">
        <h2 className="content-heading">Manage Content</h2>

        {/* Display message */}
        {message && <div className={`alert alert-${messageType}`}>{message}</div>}

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="Search by Title"
          />
          <button onClick={handleSearchByTitle} disabled={loading}>
            Search
          </button>

          <select onChange={(e) => setContentType(e.target.value)} value={contentType}>
            <option  value="">Select Type</option>
            <option value="movie">Movie</option>
            <option value="tv_series">TV Series</option>
          </select>
          <button onClick={handleFilterByType} disabled={loading}>
            Filter by Type
          </button>
        </div>

        {/* Content List */}
        <div className="content-list">
          <h3>All Content</h3>
          <button onClick={() => setShowAddContentModal(true)} className="add-content-button">
            Add Content
          </button>
          <ul>
            {content.map((contentItem) => (
              <li className="content-item" key={contentItem.contentId}>
                <div>{contentItem.title}</div>
                <button 
                  onClick={() => handleDeleteContent(contentItem.contentId)} 
                  className="delete-content-button">
                  Delete
                </button>
                <button 
                  onClick={() => handleEditContent(contentItem.contentId)} 
                  className="update-content-button">
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Add Content Modal */}
        {showAddContentModal && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">{editMode ? 'Edit Content' : 'Add Content'}</h2> {/* Dynamic title */}
                <button onClick={() => setShowAddContentModal(false)} className="modal-close">
                  ✕
                </button>
              </div>
              <div className="modal-form">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    value={newContentData.title}
                    onChange={(e) => setNewContentData({ ...newContentData, title: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    value={newContentData.description}
                    onChange={(e) => setNewContentData({ ...newContentData, description: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select
                    value={newContentData.type}
                    onChange={(e) => setNewContentData({ ...newContentData, type: e.target.value })}
                    className="form-input"
                  >
                    <option value="">Select Type</option>
                    <option value="movie">Movie</option>
                    <option value="tv_series">TV Series</option>
                  </select>
                </div>
              </div>
              <div className="modal-buttons">
                <button
                  onClick={editMode ? () => handleUpdateContent() : handleAddContent}  
                  disabled={loading}
                  className="btn-update"
                >
                  {loading ? 'Processing...' : editMode ? 'Update Content' : 'Add Content'}
                </button>
                <button onClick={() => setShowAddContentModal(false)} className="btn-close">
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

export default Content;

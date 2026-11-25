import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './adminDashboard.css';

const AdminDashboard = ({ userData }) => {
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const navigate = useNavigate();

  const [searchUserId, setSearchUserId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

   // Handle navigation back to dashboard
  const goToDashboard = () => {
    navigate('/admin-main-page'); // Navigate to the admin dashboard page
  };
  // Use userData from props or localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    if (userData) {
      return userData;
    }

    const stored = localStorage.getItem('userData');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse localStorage:', e);
        return {};
      }
    }

    console.error('No userData available!');
    return {};
  });

  const username = currentUser?.username || 'Admin';
  const email = currentUser?.email || 'N/A';
  const role = currentUser?.role || 'USER'; // ← Check the role state

  // Check if role has ROLE_ prefix and compare the stripped role
  const isAdmin = () => {
    const normalizedRole = role?.replace('ROLE_', '').toUpperCase(); // Remove the ROLE_ prefix
    return normalizedRole === 'ADMIN';
  };

  useEffect(() => {
    // Ensure that non-admin users are redirected
    if (!isAdmin()) {
      console.warn('Not an admin, redirecting to home');
      navigate('/');
    }
  }, [role, navigate]);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleSearchUsers = async () => {
    if (!searchUserId.trim()) {
      setMessage('Please enter a user ID');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const adminEmail = currentUser?.email;
      const adminPassword = currentUser?.password;

      if (!adminEmail || !adminPassword) {
        throw new Error('Admin credentials not found. Please logout and login again.');
      }

      const searchId = searchUserId.trim();
      const url = `http://localhost:8088/user-service1/users/${searchId}`;
      const basicAuth = btoa(`${adminEmail}:${adminPassword}`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${basicAuth}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please logout and login again.');
        } else if (response.status === 404) {
          setMessage('Unknown ID entered');
          setMessageType('error');
          setSelectedUser(null);
          return;
        } else {
          throw new Error(`Error: HTTP ${response.status}`);
        }
      }

      const user = await response.json();

      setSelectedUser(user);
      setEditFormData(user);
      setMessage('User found');
      setMessageType('success');
    } catch (error) {
      console.error('Error:', error.message);
      setMessage(error.message);
      setMessageType('error');
      setSelectedUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser?.id) {
      setMessage('No user selected');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const adminEmail = currentUser?.email;
      const adminPassword = currentUser?.password;

      if (!adminEmail || !adminPassword) {
        throw new Error('Admin credentials missing');
      }

      const basicAuth = btoa(`${adminEmail}:${adminPassword}`);

      const response = await fetch(
        `http://localhost:8088/user-service1/users/${selectedUser.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${basicAuth}`,
          },
          body: JSON.stringify(editFormData),
        }
      );

      if (!response.ok) {
        throw new Error(`Update failed: HTTP ${response.status}`);
      }

      const updated = await response.json();
      setSelectedUser(updated);
      setMessage('User updated');
      setMessageType('success');

      setTimeout(() => closeEditModal(), 1500);
    } catch (error) {
      console.error('Update error:', error);
      setMessage(error.message);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser?.id) {
      setMessage('No user selected');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const adminEmail = currentUser?.email;
      const adminPassword = currentUser?.password;

      if (!adminEmail || !adminPassword) {
        throw new Error('Admin credentials missing');
      }

      const basicAuth = btoa(`${adminEmail}:${adminPassword}`);

      const response = await fetch(
        `http://localhost:8088/user-service1/users/${selectedUser.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${basicAuth}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Delete failed: HTTP ${response.status}`);
      }

      setMessage('User deleted');
      setMessageType('success');
      setDeleteMessage(`User with ID ${selectedUser.id} deleted successfully.`);
      setShowDeleteConfirmation(true);
      setSelectedUser(null);
    } catch (error) {
      console.error('Delete error:', error);
      setMessage(error.message);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
    setEditFormData({});
    setMessage('');
  };

  const navigateToSubscriptionPage = () => {
    navigate('/admin/subscription'); // <-- This navigates to the Subscription Page
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
              onClick={() => setActiveTab('users')}
              className={`sidebar-link ${activeTab === 'users' ? 'active' : ''}`}
            >
              <span className="sidebar-dot"></span>
              <span>Manage Users</span>
            </button>
          </li>
         
   
<li className="sidebar-item">
  <button
    onClick={() => navigate('/admin/manage-categories')}
    className={`sidebar-link ${activeTab === 'categories' ? 'active' : ''}`}
  >
    <span className="sidebar-dot"></span>
    <span>Manage Categories</span>
  </button>
</li>
<li className="sidebar-item">
  <button
    onClick={() => navigate('/admin/content')}
    className={`sidebar-link ${activeTab === 'categories' ? 'active' : ''}`}
  >
    <span className="sidebar-dot"></span>
    <span>Manage Content</span>
  </button>
</li>
<li className="sidebar-item">
  <button
    onClick={() => navigate('/admin/subscription')}
    className={`sidebar-link ${activeTab === 'categories' ? 'active' : ''}`}
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
        {/* Top Bar */}
        <div className="top-bar">
          <h1 className="page-title">
            {activeTab === 'users' ? 'Manage Users' : 'Coming Soon'}
          </h1>

          <div className="user-profile">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="profile-button"
            >
              <div className="profile-info">
                <p className="profile-name">{username}</p>
                <span className="profile-role">{role}</span>
              </div>
              <div className="profile-avatar">
                <span>{username.charAt(0).toUpperCase()}</span>
              </div>
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">Admin Details</div>
                <div className="dropdown-item">Email: {email}</div>
                <div className="dropdown-item">Role: {role}</div>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Message Display */}
        {message && <div className={`alert alert-${messageType}`}>{message}</div>}

        {/* Users Management Tab */}
        {activeTab === 'users' && (
          <div className="tab-content">
            <div className="search-section">
              <h2 className="section-title">Search & Edit Users</h2>
              <p className="search-hint">
                Admin: <strong>{email}</strong>
              </p>
              <div className="search-box">
                <input
                  type="text"
                  value={searchUserId}
                  onChange={(e) => setSearchUserId(e.target.value)}
                  placeholder="Enter user ID"
                  className="search-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchUsers()}
                />
                <button
                  onClick={handleSearchUsers}
                  disabled={loading}
                  className="search-button"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            {/* User Details Display */}
            {selectedUser && (
              <div className="user-details-card">
                <h3 className="card-title">User Information</h3>
                <div className="user-info-grid">
                  <div className="info-item">
                    <label>User ID</label>
                    <p>{selectedUser.id}</p>
                  </div>
                  <div className="info-item">
                    <label>Username</label>
                    <p>{selectedUser.name}</p>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <p>{selectedUser.email}</p>
                  </div>
                  <div className="info-item">
                    <label>Role</label>
                    <p>{selectedUser.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="edit-button"
                >
                  Edit User
                </button>
                <button
                  onClick={handleDeleteUser} // <-- Call delete function here
                  className="delete-button"
                >
                  Delete User
                </button>
              </div>
            )}

            {!selectedUser && (
              <div className="empty-state">
                <p>🔍 Search for a user by ID</p>
              </div>
            )}
          </div>
        )}

        {/* Coming Soon Tab */}
        {activeTab === 'coming-soon' && (
          <div className="tab-content">
            <div className="coming-soon-section">
              <div className="coming-soon-card">
                <h2 className="coming-soon-title">🎬 Movie Management</h2>
                <p className="coming-soon-text">Coming soon...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Edit User</h2>
              <button onClick={closeEditModal} className="modal-close">
                ✕
              </button>
            </div>

            <div className="modal-form">
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  value={editFormData.name || ''}
                  onChange={(e) =>
                    handleFormChange('name', e.target.value)
                  }
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={editFormData.email || ''}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Role</label>
                <select
                  value={editFormData.role || ''}
                  onChange={(e) => handleFormChange('role', e.target.value)}
                  className="form-input"
                >
                  <option value="ROLE_USER">User</option>
                  <option value="ROLE_ADMIN">Admin</option>
                </select>
              </div>
            </div>

            <div className="modal-buttons">
              <button
                onClick={handleUpdateUser}
                disabled={loading}
                className="btn-update"
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
              <button onClick={closeEditModal} className="btn-close">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirmation && (
        <div className="delete-confirmation-dialog">
          <div className="dialog-content">
            <h3>{deleteMessage}</h3>
            <button
              onClick={() => setShowDeleteConfirmation(false)}
              className="btn-close"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

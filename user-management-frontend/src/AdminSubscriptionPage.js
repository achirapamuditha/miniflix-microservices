import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SubscriptionPage.css";

const API_BASE = "http://localhost:8087/subscription-service";

export default function AdminSubscriptionPage() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [userId, setUserId] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [newPlan, setNewPlan] = useState({ name: "", price: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");
  const [editPlan, setEditPlan] = useState(null); // State to store the plan being edited

  // Function to navigate to dashboard
  const goToDashboard = () => {
    navigate("/admin-main-page");
  };

  // Fetch all plans from the backend
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/plan`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPlans(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load plans. Make sure backend is running on port 8087.");
        setLoading(false);
      });
  }, []);

  // Create a new plan (Admin)
  const createPlan = () => {
    if (!newPlan.name.trim() || !newPlan.price) {
      setError("Please enter both plan name and price.");
      return;
    }

    const planData = {
      planName: newPlan.name,
      price: parseFloat(newPlan.price),
    };

    setLoading(true);
    fetch(`${API_BASE}/plan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(planData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`HTTP ${res.status}: ${text}`);
          });
        }
        return res.json();
      })
      .then((createdPlan) => {
        setLoading(false);
        alert(`Plan created successfully! ID: ${createdPlan.id}`);
        setPlans([...plans, createdPlan]);
        setNewPlan({ name: "", price: "" });
        setError("");
      })
      .catch((err) => {
        setError(`Failed to create plan: ${err.message}.`);
        setLoading(false);
      });
  };

  // Update an existing plan (Admin)
  const updatePlan = () => {
    if (!editPlan || !editPlan.name || !editPlan.price) {
      setError("Please enter both plan name and price.");
      return;
    }

    const planData = {
      planName: editPlan.name.trim(),
      price: parseFloat(editPlan.price),
    };

    setLoading(true);
    fetch(`${API_BASE}/plan/${editPlan.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(planData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`HTTP ${res.status}: ${text}`);
          });
        }
        return res.json();
      })
      .then((updatedPlan) => {
        setLoading(false);
        alert(`Plan updated successfully! ID: ${updatedPlan.id}`);
        setPlans(plans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan)));
        setEditPlan(null); // Close the edit form after updating
        setError("");
      })
      .catch((err) => {
        setError(`Failed to update plan: ${err.message}.`);
        setLoading(false);
      });
  };

  // Subscribe user to a plan
  const subscribeUser = () => {
    if (!userId || !selectedPlan) {
      setError("Please provide both User ID and Plan.");
      return;
    }
    setLoading(true);
    fetch(
      `${API_BASE}/subscription/subscribe?userId=${userId}&planId=${selectedPlan}`,
      {
        method: "POST",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setLoading(false);
        alert("Subscription successful!");
      })
      .catch((err) => {
        setError("Failed to subscribe user.");
        setLoading(false);
      });
  };

  // Delete a plan (Admin)
const deletePlan = (planId) => {
  fetch(`${API_BASE}/plan/${planId}`, { method: 'DELETE' })
    .then((response) => {
      if (response.status === 500) {
        // Handle the error if the plan cannot be deleted due to active subscriptions
        setError("This plan cannot be deleted due to active subscriptions.");
      } else if (!response.ok) {
        throw new Error("Failed to delete plan.");
      } else {
        // If deletion is successful, update the UI
        setPlans(plans.filter((plan) => plan.id !== planId));
        setError(""); // Clear any previous error messages
      }
    })
    .catch((error) => {
      setError(error.message);
    });
};






  // Set the plan for editing
  const startEditingPlan = (plan) => {
    setEditPlan({
      ...plan,
      name: plan.name || "", // Default to empty string if undefined
      price: plan.price || "", // Default to empty string if undefined
    });
  };

 return (
  <div className="subscription-page">
    <div className="sidebar">
      <div className="sidebar-accent"></div>
      <h2 className="title">MINIFLIX</h2>
      <p className="admin-badge">ADMIN</p>

      <ul className="sidebar-menu"> {/* Updated to sidebar-menu */}
        <li className="sidebar-item">
          <Link to="/admin/subscription" className="sidebar-link">
            <span className="sidebar-dot"></span>
            <span>Manage Subscription</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin" className="sidebar-link">
            <span className="sidebar-dot"></span>
            <span>Manage Users</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/manage-categories" className="sidebar-link">
            <span className="sidebar-dot"></span>
            <span>Manage Categories</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/content" className="sidebar-link">
            <span className="sidebar-dot"></span>
            <span>Manage Content</span>
          </Link>
        </li>
      </ul>

        {/* Footer with back button */}
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

      <div className="content">
        <h1 className="heading">Subscription Management</h1>

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
            <button onClick={() => setError("")} className="close-error">
              ×
            </button>
          </div>
        )}

        {loading && <div className="loading">Loading...</div>}

        <div className="form-container">
          <h2>Create New Plan (Admin)</h2>
          <input
            type="text"
            placeholder="Plan Name"
            value={newPlan.name}
            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
            className="input-field"
            disabled={loading}
          />
          <input
            type="number"
            placeholder="Price"
            value={newPlan.price}
            onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
            className="input-field"
            disabled={loading}
          />
          <button
            className="button create-button"
            onClick={createPlan}
            disabled={loading || !newPlan.name.trim() || !newPlan.price}
          >
            {loading ? "Creating..." : "Create Plan"}
          </button>
        </div>

        {/* Edit Plan Form */}
        {editPlan && (
          <div className="form-container">
            <h2>Edit Plan (Admin)</h2>
            <input
              type="text"
              placeholder="Plan Name"
              value={editPlan.name}
              onChange={(e) => setEditPlan({ ...editPlan, name: e.target.value })}
              className="input-field"
              disabled={loading}
            />
            <input
              type="number"
              placeholder="Price"
              value={editPlan.price}
              onChange={(e) => setEditPlan({ ...editPlan, price: e.target.value })}
              className="input-field"
              disabled={loading}
            />
            <button
              className="button create-button"
              onClick={updatePlan}
              disabled={loading || !editPlan.name.trim() || !editPlan.price}
            >
              {loading ? "Updating..." : "Update Plan"}
            </button>
          </div>
        )}

        <div className="form-container">
          <h2>Available Plans ({plans.length})</h2>
          {plans.length === 0 ? (
            <p className="no-plans">No plans available. Create one above.</p>
          ) : (
            <ul className="plan-list">
              {plans.map((plan) => (
                <li key={plan.id} className="plan-item">
                  <span className="plan-info">
                    <strong>{plan.planName || plan.name}</strong> - Rs.{plan.price}{" "}
                    <small>ID: {plan.id}</small>
                  </span>
                  <button
                    onClick={() => startEditingPlan(plan)}
                    className="edit-button"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePlan(plan.id)}
                    className="delete-button"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

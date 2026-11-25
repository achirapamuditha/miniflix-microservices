import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SubscriptionPage.css";

const API_BASE = "http://localhost:8087/subscription-service";

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [userId, setUserId] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to navigate to dashboard
  const goToDashboard = () => {
    navigate("/");
  };

  // Fetch all plans from the backend
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/plan`)
      .then((res) => {
        console.log("GET /plan status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Plans loaded:", data);
        setPlans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch plans error:", err);
        setError("Failed to load plans. Make sure backend is running on port 8087.");
        setLoading(false);
      });
  }, []);

  // Subscribe user to a plan
  const subscribeUser = () => {
    if (!userId || !selectedPlan) {
      setError("Please provide both User ID and Plan.");
      return;
    }
    setLoading(true);
    fetch(`${API_BASE}/subscription/subscribe?userId=${userId}&planId=${selectedPlan}`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        alert("Subscription successful!");
        console.log("Subscription response:", data);
      })
      .catch((err) => {
        setError("Failed to subscribe user. Check console for details.");
        setLoading(false);
        console.error("Subscribe error:", err);
      });
  };

  return (
    <div className="subscription-page">
      <div className="sidebar">
        <div className="sidebar-accent"></div>
        <h2 className="sidebar-title">MINIFLIX</h2>

        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <Link to="/ContentPage" className="sidebar-link">
              
              <span>Content</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/subscription" className="sidebar-link">
             
              <span>Subscription</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/coming-soon" className="sidebar-link">
             
              <span>Coming Soon</span>
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
          <h2>Subscribe User to Plan</h2>
          <input
            type="number"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="input-field"
            disabled={loading}
          />

          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="input-field"
            disabled={loading}
          >
            <option value="">-- Select Plan --</option>
            {plans.length === 0 ? (
              <option disabled>No plans available</option>
            ) : (
              plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.planName || p.name} - Rs.{p.price}
                </option>
              ))
            )}
          </select>

          <button
            className="button subscribe-button"
            onClick={subscribeUser}
            disabled={loading || !userId || !selectedPlan}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

      </div>
    </div>
  );
}

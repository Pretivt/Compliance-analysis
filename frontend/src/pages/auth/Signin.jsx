import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext.jsx";
import { useAppTheme } from "../../context/ThemeContext.jsx";

import "./Signin.css";

const Signin = () => {
  const { mode } = useAppTheme();
  const { login } = useAuth();

  const navigate = useNavigate();

  const isDark = mode === "dark";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await login(formData);

      if (response.status === 200) {
        toast.success("Signin successful!");
        const userRole =response?.data?.data?.role;
        
        console.log("Logged in user role is:", userRole);
        if (userRole === "admin") {
          navigate("/admin"); // Admin seedhe admin layout par jayega
        } else {
          navigate("/"); // Normal user main application dashboard par jayega
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-container ${isDark ? "auth-dark" : "auth-light"}`}>
      {/* BACKGROUND GLOW */}
      <div className="auth-glow auth-glow-1"></div>
      <div className="auth-glow auth-glow-2"></div>

      <motion.div
        className="auth-wrapper"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* LEFT SECTION */}
        <div className="auth-left">
          <motion.div
            className="auth-logo"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <ShieldCheck size={42} color="#ffffff" />
          </motion.div>

          <h1 className="auth-title">Welcome Back</h1>

          <p className="auth-description">
            Sign in to access your AI-powered compliance dashboard with smart
            regulatory analysis, semantic search, and intelligent reporting.
          </p>

          <div className="auth-features">
            <div className="auth-feature">
              <Sparkles size={18} />
              AI Compliance Detection
            </div>

            <div className="auth-feature">
              <Sparkles size={18} />
              Qdrant Semantic Search
            </div>

            <div className="auth-feature">
              <Sparkles size={18} />
              Smart Risk Assessment
            </div>

            <div className="auth-feature">
              <Sparkles size={18} />
              Downloadable Reports
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="auth-right">
          <motion.div
            className="auth-form-area"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="form-title" style={{ color: '#ffffff' }}>Sign In ✨</h2>

            <p className="form-subtitle">Access your compliance workspace</p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div className="input-group">
                <label className="input-label">Email Address</label>

                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="auth-input"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="input-group">
                <label className="input-label">Password</label>

                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />

                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="auth-input"
                  />
                </div>
              </div>

              {/* <div className="forgot-row">
                <span></span>

                <Link
                  to="/forgot-password"
                  className="forgot-link"
                >
                  Forgot Password?
                </Link>
              </div> */}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="auth-button"
              >
                {loading ? "Signing In..." : "Sign In"}
              </motion.button>
            </form>

            <div className="auth-footer">
              Don’t have an account?{" "}
              <Link to="/signup" className="auth-link">
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signin;

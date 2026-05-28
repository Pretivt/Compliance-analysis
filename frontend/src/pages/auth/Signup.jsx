


//new   


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAppTheme } from "../../context/ThemeContext.jsx";

import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import "./signup.css";

const Signup = () => {
  const { mode } = useAppTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [validationError, setValidationError] =
    useState("");
  const [loading, setLoading] = useState(false);

  const isDark = mode === "dark";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  useEffect(() => {
    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      setValidationError("Passwords do not match");
    } else {
      setValidationError("");
    }
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "/auth/signup",
        {
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 201) {
        navigate("/signin");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`signupPage ${isDark ? "dark" : "light"
        }`}
    >
      {/* BACKGROUND */}
      <div className="signupBackground">
        <div className="blurCircle1"></div>
        <div className="blurCircle2"></div>
        <div className="blurCircle3"></div>
      </div>

      {/* CARD */}
      <motion.div
        className="signupCard"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* LOGO */}
        <motion.div
          className="logoBox"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <ShieldCheck size={38} />
        </motion.div>

        {/* TITLE */}
        <h1 className="signupTitle">
          Create Your Account
        </h1>

        <p className="signupSubtitle">
          Smart AI-powered compliance platform
          with semantic analysis and automated
          regulatory reporting.
        </p>

        {/* ERROR */}
        {error && (
          <div className="errorBox">{error}</div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="formGrid">
            {/* USERNAME */}
            <div className="inputGroup">
              <label className="inputLabel">
                Username
              </label>

              <div className="inputWrapper">
                <User className="inputIcon" />

                <input
                  type="text"
                  name="userName"
                  placeholder="Enter username"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  className="inputField"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="inputGroup">
              <label className="inputLabel">
                Email Address
              </label>

              <div className="inputWrapper">
                <Mail className="inputIcon" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="inputField"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="inputGroup">
              <label className="inputLabel">
                Password
              </label>

              <div className="inputWrapper">
                <Lock className="inputIcon" />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="inputField"
                />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="inputGroup">
              <label className="inputLabel">
                Confirm Password
              </label>

              <div className="inputWrapper">
                <Lock className="inputIcon" />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  required
                  className="inputField"
                  style={{
                    border: validationError
                      ? "1px solid #ef4444"
                      : "",
                  }}
                />
              </div>
            </div>
          </div>

          {/* VALIDATION ERROR */}
          {validationError && (
            <div className="validationText">
              {validationError}
            </div>
          )}

          

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={
              loading || !!validationError
            }
            className="submitBtn"
          >
            {loading
              ? "Creating Account..."
              : "Sign Up"}
          </motion.button>
        </form>

        {/* FOOTER */}
        {/* FOOTER */}
        <p className="footerText">
          Already have an account?
          <Link
            to="/signin"
            className="footerLink"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;




// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   User,
//   Mail,
//   Lock,
//   ShieldCheck,
//   Sparkles,
// } from "lucide-react";
// import { motion } from "framer-motion";

// import api from "../../api/api";
// import { useAppTheme } from "../../context/ThemeContext.jsx";

// import "./auth.css";

// const Signup = () => {
//   const { mode } = useAppTheme();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     userName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [validationError, setValidationError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const isDark = mode === "dark";

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (error) setError("");
//   };

//   useEffect(() => {
//     if (
//       formData.confirmPassword &&
//       formData.password !== formData.confirmPassword
//     ) {
//       setValidationError("Passwords do not match");
//     } else {
//       setValidationError("");
//     }
//   }, [formData.password, formData.confirmPassword]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords don't match");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await api.post("/auth/signup", {
//         userName: formData.userName,
//         email: formData.email,
//         password: formData.password,
//       });

//       if (response.status === 201) {
//         navigate("/signin");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Network error. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className={`auth-container ${
//         isDark ? "auth-dark" : "auth-light"
//       }`}
//     >
//       {/* Glow Effects */}
//       <div className="auth-glow auth-glow-1"></div>
//       <div className="auth-glow auth-glow-2"></div>

//       <motion.div
//         className="auth-wrapper"
//         initial={{ opacity: 0, y: 35 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//       >
//         {/* LEFT SECTION */}
//         <div className="auth-left">
//           <motion.div
//             className="auth-logo"
//             animate={{ y: [0, -8, 0] }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//             }}
//           >
//             <ShieldCheck size={42} color="#ffffff" />
//           </motion.div>

//           <h1 className="auth-title">
//             Smart Compliance Analysis Platform
//           </h1>

//           <p className="auth-description">
//             Securely analyze regulatory compliance using AI,
//             semantic search, vector databases, and intelligent
//             report generation.
//           </p>

//           <div className="auth-features">
//             <div className="auth-feature">
//               <Sparkles size={18} />
//               AI Compliance Detection
//             </div>

//             <div className="auth-feature">
//               <Sparkles size={18} />
//               Semantic Search with Qdrant
//             </div>

//             <div className="auth-feature">
//               <Sparkles size={18} />
//               Risk Assessment & Analysis
//             </div>

//             <div className="auth-feature">
//               <Sparkles size={18} />
//               Downloadable Smart Reports
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SECTION */}
//         <div className="auth-right">
//           <h2 className="form-title">Create Account ✨</h2>

//           <p className="form-subtitle">
//             Start your AI-powered compliance journey.
//           </p>

//           {error && (
//             <div className="auth-error">{error}</div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="form-grid">
//               {/* USERNAME */}
//               <div className="input-group">
//                 <label className="input-label">
//                   Username
//                 </label>

//                 <div className="input-wrapper">
//                   <User
//                     size={18}
//                     className="input-icon"
//                   />

//                   <input
//                     type="text"
//                     name="userName"
//                     placeholder="Enter username"
//                     value={formData.userName}
//                     onChange={handleChange}
//                     required
//                     className="auth-input"
//                   />
//                 </div>
//               </div>

//               {/* EMAIL */}
//               <div className="input-group">
//                 <label className="input-label">
//                   Email Address
//                 </label>

//                 <div className="input-wrapper">
//                   <Mail
//                     size={18}
//                     className="input-icon"
//                   />

//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Enter email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="auth-input"
//                   />
//                 </div>
//               </div>

//               {/* PASSWORD */}
//               <div className="input-group">
//                 <label className="input-label">
//                   Password
//                 </label>

//                 <div className="input-wrapper">
//                   <Lock
//                     size={18}
//                     className="input-icon"
//                   />

//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Enter password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className="auth-input"
//                   />
//                 </div>
//               </div>

//               {/* CONFIRM PASSWORD */}
//               <div className="input-group">
//                 <label className="input-label">
//                   Confirm Password
//                 </label>

//                 <div className="input-wrapper">
//                   <Lock
//                     size={18}
//                     className="input-icon"
//                   />

//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     placeholder="Confirm password"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                     className="auth-input"
//                     style={{
//                       border: validationError
//                         ? "1px solid #ef4444"
//                         : "",
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {validationError && (
//               <div className="auth-error">
//                 {validationError}
//               </div>
//             )}

//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               disabled={loading || !!validationError}
//               className="auth-button"
//               style={{
//                 opacity: loading ? 0.7 : 1,
//               }}
//             >
//               {loading
//                 ? "Creating Account..."
//                 : "Sign Up"}
//             </motion.button>
//           </form>

//           <div className="auth-footer">
//             Already have an account?{" "}
//             <Link to="/signin" className="auth-link">
//               Sign In
//             </Link>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;
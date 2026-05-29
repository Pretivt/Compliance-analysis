

import React, { useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    const loggingOut = async () => {
      if (hasRun.current) return; // prevent double execution
      hasRun.current = true;

      try {
        await logout();
        toast.success("Logged out successfully");
        navigate("/");
      } catch (err) {
        console.log(err.message);
        toast.error("Logout failed");
      }
    };

    loggingOut();
  }, [logout, navigate]);

  // return <div>Logging out...</div>;
};

export default Logout;

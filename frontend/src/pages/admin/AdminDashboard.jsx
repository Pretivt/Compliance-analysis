import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import { 
  Layers, 
  Rule, 
  ShieldOutlined, 
  AssessmentOutlined, 
  TrendingUp, 
  AccessTime 
} from '@mui/icons-material';
import { useAppTheme } from '../../context/ThemeContext.jsx'; // 👈 Check path to your ThemeContext
import api from '../../api/api.js';
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  const { mode } = useAppTheme(); // 👈 Global mode extract kiya
  const isDark = mode === 'dark';
  
  const [frameworks, setFrameworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/api/framework/get-frameworks', { withCredentials: true });
        const response = await api.get('/framework/get-frameworks');
        setFrameworks(response.data?.data || response.data || []);
      } catch (error) {
        console.error("Error fetching dashboard metadata:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const totalFrameworks = frameworks.length;
  const totalControls = frameworks.reduce((acc, fw) => acc + (fw.controls?.length || 0), 0);
  const mandatoryControls = frameworks.reduce((acc, fw) => 
    acc + (fw.controls?.filter(c => c.mandatory)?.length || 0), 0
  );

  const stats = [
    { title: "Active Frameworks", value: totalFrameworks, icon: <Layers sx={{ fontSize: 24 }} />, color: "linear-gradient(135deg, #2563eb, #3b82f6)" },
    { title: "Total Audit Rules", value: totalControls, icon: <Rule sx={{ fontSize: 24 }} />, color: "linear-gradient(135deg, #7c3aed, #8b5cf6)" },
    { title: "Mandatory Controls", value: mandatoryControls, icon: <ShieldOutlined sx={{ fontSize: 24 }} />, color: "linear-gradient(135deg, #10b981, #059669)" },
    { title: "System Security Level", value: "98%", icon: <AssessmentOutlined sx={{ fontSize: 24 }} />, color: "linear-gradient(135deg, #f59e0b, #d97706)" }
  ];

  return (
    //  Yahan dynamic class add ki hai conditional routing ke liye
    <div className={`dashboard-wrapper ${isDark ? 'admin-theme-dark' : 'admin-theme-light'}`}>
      
      {/* HEADER NODES */}
      <div className="dashboard-header-block">
        <h1 className="dashboard-title">Admin Intelligence Console</h1>
        <p className="dashboard-subtitle">Real-time compliance analytics, governance framework control registries, and structural metrics.</p>
      </div>

      {/* METRIC BOXES GRID */}
      <div className="metric-grid">
        {loading ? (
          [1, 2, 3, 4].map((n) => (
            <Skeleton key={n} variant="rounded" height={130} sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', borderRadius: '22px' }} />
          ))
        ) : (
          stats.map((stat, i) => (
            <div className="metric-card" key={i}>
              <div className="metric-header">
                <span className="metric-label">{stat.title}</span>
                <div className="metric-icon-box" style={{ background: stat.color }}>
                  {stat.icon}
                </div>
              </div>
              <div className="metric-value">{stat.value}</div>
            </div>
          ))
        )}
      </div>

      {/* LOWER LAYER SPLIT LAYOUT */}
      <div className="split-section">
        
        {/* LEFT COMPACT FRAMEWORK PANEL */}
        <div className="panel-card">
          <h3 className="panel-title">
            <TrendingUp sx={{ color: '#3b82f6', fontSize: 22 }} /> Active Framework Index
          </h3>
          
          {loading ? (
            <div className="index-list">
              <Skeleton variant="rounded" height={56} sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderRadius: '14px' }} />
            </div>
          ) : frameworks.length === 0 ? (
            <p className="empty-storage-text">No active frameworks found in storage node.</p>
          ) : (
            <div className="index-list">
              {frameworks.slice(0, 4).map((fw) => (
                <div className="index-strip" key={fw._id}>
                  <div>
                    <div className="strip-title">{fw.name}</div>
                    <div className="strip-code">{fw.shortCode}</div>
                  </div>
                  <div>
                    <div className="strip-count">{fw.controls?.length || 0} Rules</div>
                    <div className="strip-version">v{fw.version || '1.0'}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SYSTEM RECENT LOG PANEL */}
        <div className="panel-card">
          <h3 className="panel-title">
            <AccessTime sx={{ color: '#8b5cf6', fontSize: 22 }} /> Operational Activity Log
          </h3>
          
          <div className="log-list">
            {[
              { primary: "Global Framework published successfully", secondary: "ISO 27001 standard configuration committed", time: "Just Now", color: "#10b981" },
              { primary: "System compliance benchmark calculation", secondary: "Calculated structural risk ratio limits", time: "10 mins ago", color: "#3b82f6" },
              { primary: "Database core indices optimized", secondary: "Refreshed nested rule schema nodes", time: "2 hours ago", color: "#f59e0b" },
            ].map((log, index) => (
              <div className="log-item" key={index}>
                <div className="log-dot" style={{ backgroundColor: log.color }} />
                <div className="log-content">
                  <div className="log-primary">{log.primary}</div>
                  <div className="log-secondary">{log.secondary}</div>
                </div>
                <div className="log-time">{log.time}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
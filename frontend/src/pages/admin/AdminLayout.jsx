import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Button, IconButton } from "@mui/material";
import { LayoutDashboard, FileSpreadsheet, PlusCircle, LogOut, ShieldCheck, Sun, Moon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAppTheme } from "../../context/ThemeContext.jsx"; // 👈 Is path ko check kar lena
import "./AdminLayout.css"; 

const drawerWidth = 260;

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Aapke global context se values nikal rahe hain
  const { mode, toggleTheme } = useAppTheme();
  const isDark = mode === "dark";

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  const menuItems = [
    { text: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { text: "All Frameworks", icon: <FileSpreadsheet size={20} />, path: "/admin/frameworks" },
    { text: "Create Framework", icon: <PlusCircle size={20} />, path: "/admin/framework/create" },
  ];

  return (
    <Box className={`admin-layout-container ${isDark ? 'admin-dark' : 'admin-light'}`}>
      
      {/* 🧭 SIDEBAR DRAWER */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { 
            width: drawerWidth, 
            boxSizing: "border-box", 
            bgcolor: isDark ? "#020617" : "#ffffff", 
            color: isDark ? "#cbd5e1" : "#334155", 
            borderRight: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`, 
            position: "relative",
            transition: "all 0.3s ease"
          },
        }}
      >
        <Box className="sidebar-scroll-area">
          {/* Header jahan Toggle Button laga hai */}
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px", marginBottom: "24px", marginTop: "16px" }}>
            <Box style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <ShieldCheck size={32} color="#6366f1" />
              <Typography variant="h6" style={{ fontWeight: 800, color: isDark ? '#fff' : '#0f172a', letterSpacing: "1px" }}>
                ADMIN HUB
              </Typography>
            </Box>
            
            {/* ☀️ TOGGLE ICON SWITCH 🌙 */}
            <IconButton onClick={toggleTheme} color="inherit" sx={{ color: isDark ? '#fbbf24' : '#6366f1' }}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </IconButton>
          </Box>
          <Divider sx={{ bgcolor: isDark ? "#1e293b" : "#e2e8f0", mb: 2 }} />

          {/* Sidebar Menu Links */}
          <List sx={{ p: 0 }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    className={`sidebar-link-btn ${isActive ? 'sidebar-link-active' : ''}`}
                    sx={{ 
                      color: isActive ? "#fff" : (isDark ? "#94a3b8" : "#475569"), 
                      "&:hover": { bgcolor: isActive ? "" : (isDark ? "#1e293b" : "#f1f5f9"), color: isActive ? "#fff" : (isDark ? "#fff" : "#0f172a") } 
                    }}
                  >
                    <ListItemIcon sx={{ color: isActive ? "#6366f1" : (isDark ? "#64748b" : "#94a3b8"), minWidth: "40px" }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: "14px", fontWeight: 600 }} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* 🚪 BOTTOM LOGOUT SECTION */}
       {/* 🚪 PREMIUM ICONIC LOGOUT SECTION AT BOTTOM */}
<Box 
  className="sidebar-bottom-logout" 
  sx={{ 
    bgcolor: isDark ? "#020617" : "#ffffff", 
    borderTop: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    px: 2,
    py: 1.5
  }}
>
  {/* Left Side: Mock Admin Avatar (Initials) */}
  <Box 
    sx={{ 
      width: 40, 
      height: 40, 
      borderRadius: "50%", 
      bgcolor: isDark ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.1)", 
      color: "#6366f1", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      fontWeight: 700,
      fontSize: "14px",
      letterSpacing: "0.5px",
      border: "1px solid rgba(99, 102, 241, 0.2)"
    }}
  >
    AD
  </Box>

  {/* Right Side: Clean Power/Logout Icon Button */}
  <IconButton 
    onClick={handleLogout}
    sx={{
      width: 40,
      height: 40,
      borderRadius: "12px",
      color: "#f87171",
      bgcolor: "rgba(239, 68, 68, 0.05)",
      border: `1px solid ${isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)'}`,
      "&:hover": {
        bgcolor: "#ef4444",
        color: "#ffffff",
        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
        transform: "scale(1.03)"
      },
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
    }}
  >
    <LogOut size={18} />
  </IconButton>
</Box>
      </Drawer>

      {/* 💻 MAIN VIEWPORT */}
      <Box component="main" className="admin-main-viewport">
        <Box className="admin-content-wrapper">
          <Outlet />
        </Box>
      </Box>

    </Box>
  );
};

export default AdminLayout;
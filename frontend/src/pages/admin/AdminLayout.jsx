


import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Button, IconButton } from "@mui/material";
import { LayoutDashboard, FileSpreadsheet, PlusCircle, LogOut, ShieldCheck, Sun, Moon, Menu } from "lucide-react"; // 👈 Menu icon added
import { useAuth } from "../../context/AuthContext";
import { useAppTheme } from "../../context/ThemeContext.jsx"; 
import "./AdminLayout.css"; 

const drawerWidth = 260;

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useAppTheme();
  const isDark = mode === "dark";

  // 🔄 Sidebar Open/Close Toggle State (For both mobile and desktop)
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
      
      {/*  PREMIUM RESPONSIVE DRAWER */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarOpen ? drawerWidth : 70, 
          flexShrink: 0,
          whiteSpace: "nowrap",
          "& .MuiDrawer-paper": { 
            width: sidebarOpen ? drawerWidth : 70, 
            boxSizing: "border-box", 
            bgcolor: isDark ? "#020617" : "#ffffff", 
            color: isDark ? "#cbd5e1" : "#334155", 
            borderRight: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`, 
            position: "fixed",
            height: "100vh",
            overflowX: "hidden", // Prevents horizontal scrolls when collapsed
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", // Smooth sliding effect
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          },
        }}
      >
        <Box className="sidebar-scroll-area" sx={{ p: sidebarOpen ? 2 : 1 }}>
      
          <Box style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", marginTop: "8px" }}>
            
            {/* 3 Lines Toggle Icon (Top Left Corner) */}
            <IconButton onClick={handleDrawerToggle} color="inherit" sx={{ p: 1 }}>
              <Menu size={22} />
            </IconButton>

            {/* Brand text scales away when sidebar is closed */}
            {sidebarOpen && (
              <Typography variant="h6" style={{ fontWeight: 800, color: isDark ? '#fff' : '#0f172a', letterSpacing: "0.5px", fontSize: "16px" }}>
                Compliance Hub
              </Typography>
            )}
          </Box>
          
          <Divider sx={{ bgcolor: isDark ? "#1e293b" : "#e2e8f0", mb: 2 }} />

          {/* Navigation Links */}
          <List sx={{ p: 0 }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    className={`sidebar-link-btn ${isActive ? 'sidebar-link-active' : ''}`}
                    sx={{ 
                      minHeight: 48,
                      justifyContent: sidebarOpen ? "initial" : "center",
                      px: 2.5,
                      color: isActive ? "#fff" : (isDark ? "#94a3b8" : "#475569"), 
                      "&:hover": { bgcolor: isActive ? "" : (isDark ? "#1e293b" : "#f1f5f9"), color: isActive ? "#fff" : (isDark ? "#fff" : "#0f172a") } 
                    }}
                  >
                    <ListItemIcon sx={{ color: isActive ? "#6366f1" : (isDark ? "#64748b" : "#94a3b8"), minWidth: 0, mr: sidebarOpen ? 3 : "auto", justifyContent: "center" }}>
                      {item.icon}
                    </ListItemIcon>
                    
                    {/* Text hides gracefully when sidebar closes */}
                    <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: "14px", fontWeight: 600 }} sx={{ opacity: sidebarOpen ? 1 : 0, transition: "opacity 0.2s" }} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* 🚪 BOTTOM FIXED FOOTER: SUN/MOON + LOGOUT */}
        <Box 
          className="sidebar-bottom-logout" 
          sx={{ 
            bgcolor: isDark ? "#020617" : "#ffffff", 
            borderTop: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
            display: "flex",
            flexDirection: sidebarOpen ? "row" : "column", // Stack items on collapse
            alignItems: "center",
            justifyContent: "space-between",
            gap: sidebarOpen ? 0 : 2,
            px: 2,
            py: 1.5,
            transition: "all 0.3s"
          }}
        >
          {/* Theme Switch Icon */}
          <IconButton onClick={toggleTheme} color="inherit" sx={{ color: isDark ? '#fbbf24' : '#6366f1', width: 40, height: 40 }}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>

          {/* Logout Action */}
          <IconButton 
            onClick={handleLogout}
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              color: "#f87171",
              bgcolor: "rgba(239, 68, 68, 0.05)",
              border: `1px solid ${isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)'}`,
              "&:hover": { bgcolor: "#ef4444", color: "#ffffff" }
            }}
          >
            <LogOut size={18} />
          </IconButton>
        </Box>
      </Drawer>

      {/* 💻 MAIN CONTENT SCREEN VIEWPORT */}
      <Box 
        component="main" 
        className="admin-main-viewport"
        sx={{ 
          flexGrow: 1,
          width: `calc(100% - ${sidebarOpen ? drawerWidth : 70}px)`,
          ml: `${sidebarOpen ? drawerWidth : 70}px`, // Adjust margin dynamically
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Box className="admin-content-wrapper">
          <Outlet />
        </Box>
      </Box>

    </Box>
  );
};

export default AdminLayout;




import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, IconButton, AppBar, Toolbar } from "@mui/material";
import { LayoutDashboard, FileSpreadsheet, PlusCircle, LogOut, ShieldCheck, Sun, Moon, Menu } from "lucide-react";
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

  // 📱 Mobile Drawer View Toggle State
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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

  // 📝 Sidebar Content (Common for both mobile and desktop views)
  const drawerContent = (
    <Box style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <Box className="sidebar-scroll-area" sx={{ p: 2 }}>
        <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", marginTop: "8px" }}>
          <Box style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ShieldCheck size={28} color="#6366f1" />
            <Typography variant="h6" style={{ fontWeight: 800, color: isDark ? '#fff' : '#0f172a', fontSize: "16px", letterSpacing: "0.5px" }}>
              Compliance Hub
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ bgcolor: isDark ? "#1e293b" : "#e2e8f0", mb: 2 }} />

        <List sx={{ p: 0 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() => setMobileOpen(false)} // Mobile menu standard behavior
                  className={`sidebar-link-btn ${isActive ? 'sidebar-link-active' : ''}`}
                  sx={{ 
                    minHeight: 48,
                    px: 2,
                    color: isActive ? "#fff" : (isDark ? "#94a3b8" : "#475569"), 
                    "&:hover": { bgcolor: isActive ? "" : (isDark ? "#1e293b" : "#f1f5f9"), color: isActive ? "#fff" : (isDark ? "#fff" : "#0f172a") } 
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? "#6366f1" : (isDark ? "#64748b" : "#94a3b8"), minWidth: "40px" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: "14px", fontWeight: 600 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* BOTTOM ACTION BAR */}
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
        <IconButton onClick={toggleTheme} color="inherit" sx={{ color: isDark ? '#fbbf24' : '#6366f1', width: 40, height: 40 }}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </IconButton>

        <IconButton onClick={handleLogout} sx={{ width: 40, height: 40, borderRadius: "12px", color: "#f87171", bgcolor: "rgba(239, 68, 68, 0.05)", border: `1px solid ${isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)'}`, "&:hover": { bgcolor: "#ef4444", color: "#ffffff" } }}>
          <LogOut size={18} />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box className={`admin-layout-container ${isDark ? 'admin-dark' : 'admin-light'}`}>
      
      {/* 📱 MOBILE TOP NAVBAR (Only visible on small mobile viewports) */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          display: { xs: 'block', sm: 'none' }, // Desktop pe gayab
          bgcolor: isDark ? "#020617" : "#ffffff", 
          borderBottom: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
          color: isDark ? '#fff' : '#0f172a',
          zIndex: 1201
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
            <Menu size={24} />
          </IconButton>
          <Typography variant="h6" style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '0.5px' }}>
            Compliance Hub
          </Typography>
          <Box sx={{ width: 24 }} /> {/* Counterweight balance */}
        </Toolbar>
      </AppBar>

      {/* 🧭 NAVIGATION DRAWERS SYSTEM */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        
        {/* 📱 Mobile temporary slide drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} 
          sx={{
            display: { xs: 'block', sm: 'none' },
            "& .MuiDrawer-paper": { 
              width: drawerWidth, 
              boxSizing: "border-box", 
              bgcolor: isDark ? "#020617" : "#ffffff",
              borderRight: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* 💻 Desktop fixed layout view */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            "& .MuiDrawer-paper": { 
              width: drawerWidth, 
              boxSizing: "border-box", 
              bgcolor: isDark ? "#020617" : "#ffffff", 
              borderRight: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
              position: "fixed",
              height: "100vh"
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* 💻 MAIN WORKSPACE VIEWPORT */}
      <Box 
        component="main" 
        className="admin-main-viewport"
        sx={{ 
          flexGrow: 1,
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, sm: `${drawerWidth}px` },
          pt: { xs: '80px', sm: '32px' }, // Mobile layout moves top header safe zone down
          transition: "all 0.3s ease",
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
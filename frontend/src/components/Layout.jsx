import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import { useAppTheme } from "../context/ThemeContext";
import GetNavigation from "./GetNavigation";
import { useAuth } from "../context/AuthContext";

function CustomThemeToggle() {
  const { mode, toggleTheme } = useAppTheme();
  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
}

function Layout() {
  const { user } = useAuth();
  const { theme, mode } = useAppTheme();

  const NAVIGATION = GetNavigation(user);

  const location = useLocation();
  const navigate = useNavigate();
  const router = {
    pathname: location.pathname,
    navigate: (path) => navigate(path),
  };
  
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={theme}
      branding={{
        title: "Compliance Analysis",
        logo: <></>,
      }}
    >
      <DashboardLayout slots={{ toolbarActions: CustomThemeToggle }}>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}

export default Layout;

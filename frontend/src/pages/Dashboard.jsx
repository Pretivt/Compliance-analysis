


import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
  Grid,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import { useAppTheme } from "../context/ThemeContext.jsx";

import ShieldIcon from "@mui/icons-material/Shield";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StorageIcon from "@mui/icons-material/Storage";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SecurityIcon from "@mui/icons-material/Security";
import api from "../api/api.js";
import axios from "axios";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { user } = useAuth();
  const { mode } = useAppTheme();

  const isDark = mode === "dark";

  const [stats, setStats] = useState({
    complianceScore: 0,
    frameworksCount: 0,
    productsCount: 0,
    reportsCount: 0,
    loading: true,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // try {
    //   const [reportsRes, frameworksRes, productsRes] = await Promise.all([
    //     axios.get("http://localhost:5000/api/compliance/get-reports", {
    //       withCredentials: true,
    //     }),
    //     axios.get("http://localhost:5000/api/framework/get-frameworks", {
    //       withCredentials: true,
    //     }),
    //     axios.get("http://localhost:5000/api/product/get-products", {
    //       withCredentials: true,
    //     }),
    //   ]);
try {
  
  const [reportsRes, frameworksRes, productsRes] = await Promise.all([
    api.get("/compliance/get-reports"),
    api.get("/framework/get-frameworks"),
    api.get("/product/get-products"),
  ]);

  




      const reports = reportsRes.data?.data || [];
      const frameworks = frameworksRes.data?.data || [];
      const products = productsRes.data?.data || [];

      const avgScore =
        reports.length > 0
          ? Math.round(
              reports.reduce(
                (acc, r) => acc + (r.complianceScore || 0),
                0
              ) / reports.length
            )
          : 0;

      setStats({
        complianceScore: avgScore,
        frameworksCount: frameworks.length,
        productsCount: products.length,
        reportsCount: reports.length,
        loading: false,
      });
    } catch (error) {
      console.error("Dashboard Error:", error);

      setStats((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  const dashboardCards = [
    {
      title: "Compliance Score",
      value:
        stats.complianceScore > 0
          ? `${stats.complianceScore}%`
          : "N/A",
      subtitle: "Overall compliance performance",
      icon: <ShieldIcon sx={{ fontSize: 38 }} />,
      primary: true,
    },
    {
      title: "Active Frameworks",
      value: stats.frameworksCount,
      subtitle: "Global standards integrated",
      icon: <AssignmentIcon sx={{ fontSize: 38 }} />,
    },
    {
      title: "Products Tracked",
      value: stats.productsCount,
      subtitle: "Products under monitoring",
      icon: <StorageIcon sx={{ fontSize: 38 }} />,
    },
    {
      title: "Generated Reports",
      value: stats.reportsCount,
      subtitle: "AI reports successfully generated",
      icon: <TrendingUpIcon sx={{ fontSize: 38 }} />,
    },
  ];

  return (
    <Box
      className={`${styles.dashboardWrapper} ${
        isDark ? styles.dark : styles.light
      }`}
    >
      {/* Header */}
      <div className={styles.dashboardHeader}>
        <Typography className={styles.dashboardTitle}>
          Compliance Dashboard
        </Typography>

        <Typography className={styles.dashboardSubtitle}>
          Welcome back,{" "}
          <strong>
            {user?.name || user?.userName || "User"}
          </strong>
          . Here’s your AI-powered compliance overview.
        </Typography>
      </div>

      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          mb: 5,
          borderRadius: "28px",
          overflow: "hidden",
          position: "relative",
          background: isDark
            ? "linear-gradient(135deg, #0f172a, #1e293b)"
            : "linear-gradient(135deg, #2563eb, #4f46e5)",
          color: "#fff",
          p: { xs: 3, md: 5 },
          border: isDark
            ? "1px solid rgba(255,255,255,0.06)"
            : "none",
        }}
      >
        <div className={styles.glowEffect}></div>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography
              variant="h3"
              fontWeight="800"
              sx={{
                mb: 2,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              AI Regulatory Intelligence
            </Typography>

            <Typography
              variant="body1"
              sx={{
                opacity: 0.9,
                maxWidth: "700px",
                lineHeight: 1.8,
              }}
            >
              Monitor products, analyze compliance frameworks,
              generate AI-powered reports, and track
              regulatory performance in real-time.
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography sx={{ mb: 1, fontWeight: 600 }}>
                System Security Level
              </Typography>

              <LinearProgress
                variant="determinate"
                value={stats.complianceScore || 80}
                sx={{
                  height: 10,
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.2)",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  background:
                    "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border:
                    "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <SecurityIcon
                  sx={{
                    fontSize: 90,
                    opacity: 0.9,
                  }}
                />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Cards */}
      <Grid container spacing={4}>
        {dashboardCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              className={`${styles.statsCard} ${
                card.primary
                  ? styles.primaryCard
                  : styles.secondaryCard
              } ${styles.floatCard}`}
            >
              <div className={styles.glowEffect}></div>

              <div className={styles.cardIcon}>
                {card.icon}
              </div>

              <Typography className={styles.cardLabel}>
                {card.title}
              </Typography>

              {stats.loading ? (
                <div className={styles.loaderWrapper}>
                  <CircularProgress
                    size={35}
                    color={
                      card.primary
                        ? "inherit"
                        : "primary"
                    }
                  />
                </div>
              ) : (
                <>
                  <Typography className={styles.cardValue}>
                    {card.value}
                  </Typography>

                  <Typography className={styles.cardSubText}>
                    {card.subtitle}
                  </Typography>
                </>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
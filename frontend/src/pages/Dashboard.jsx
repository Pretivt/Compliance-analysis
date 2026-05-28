// import React, { useState, useEffect } from 'react';
// import { Typography, Box, Paper, Grid, CircularProgress } from '@mui/material';
// import { useAuth } from "../context/AuthContext.jsx";
// import ShieldIcon from '@mui/icons-material/Shield';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import StorageIcon from '@mui/icons-material/Storage';
// import axios from 'axios';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     complianceScore: 0,
//     frameworksCount: 0,
//     productsCount: 0,
//     loading: true
//   });
  
//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const [reportsRes, frameworksRes, productsRes] = await Promise.all([
//         axios.get("http://localhost:5000/api/compliance/get-reports", { withCredentials: true }),
//         axios.get("http://localhost:5000/api/framework/get-frameworks", { withCredentials: true }),
//         axios.get("http://localhost:5000/api/product/get-products", { withCredentials: true })
//       ]);

//       const reports = reportsRes.data?.data || [];
//       const frameworks = frameworksRes.data?.data || [];
//       const products = productsRes.data?.data || [];

//       // Calculate average score across all reports
//       const avgScore = reports.length > 0 
//         ? Math.round(reports.reduce((acc, r) => acc + r.complianceScore, 0) / reports.length) 
//         : 0;

//       setStats({
//         complianceScore: avgScore,
//         frameworksCount: frameworks.length,
//         productsCount: products.length,
//         loading: false
//       });
//     } catch (error) {
//       console.error("Failed to fetch dashboard data:", error);
//       setStats(prev => ({ ...prev, loading: false }));
//     }
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 } }}>
//       <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
//         Dashboard Overview
//       </Typography>
//       <Typography variant="body1" gutterBottom color="text.secondary" sx={{ mb: 4 }}>
//         Welcome back, {user?.name || user?.userName || 'User'}. Here is your real-time compliance summary.
//       </Typography>
      
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={4}>
//           <Paper elevation={4} sx={{ p: 4, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', color: 'white' }}>
//             <ShieldIcon sx={{ fontSize: 50, mb: 2, opacity: 0.9 }} />
//             <Typography variant="h6" fontWeight="500" sx={{ opacity: 0.9 }}>Overall Compliance Score</Typography>
//             {stats.loading ? <CircularProgress color="inherit" sx={{ mt: 2 }} /> : (
//               <Typography variant="h2" fontWeight="bold" sx={{ mt: 1 }}>{stats.complianceScore > 0 ? `${stats.complianceScore}%` : 'N/A'}</Typography>
//             )}
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
//             <AssignmentIcon sx={{ fontSize: 50, mb: 2, color: 'primary.main', opacity: 0.9 }} />
//             <Typography variant="h6" color="text.secondary" fontWeight="500">Active Frameworks</Typography>
//             {stats.loading ? <CircularProgress sx={{ mt: 2 }} /> : (
//               <Typography variant="h2" color="primary" fontWeight="bold" sx={{ mt: 1 }}>{stats.frameworksCount}</Typography>
//             )}
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
//             <StorageIcon sx={{ fontSize: 50, mb: 2, color: 'secondary.main', opacity: 0.9 }} />
//             <Typography variant="h6" color="text.secondary" fontWeight="500">Products Tracked</Typography>
//             {stats.loading ? <CircularProgress sx={{ mt: 2, color: 'secondary.main' }} /> : (
//               <Typography variant="h2" color="secondary" fontWeight="bold" sx={{ mt: 1 }}>{stats.productsCount}</Typography>
//             )}
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Box,
//   Paper,
//   Grid,
//   CircularProgress,
//   Chip,
//   Divider,
// } from "@mui/material";

// import { motion } from "framer-motion";

// import { useAuth } from "../context/AuthContext.jsx";
// import { useAppTheme } from "../context/ThemeContext.jsx";

// import ShieldIcon from "@mui/icons-material/Shield";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import StorageIcon from "@mui/icons-material/Storage";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";

// import axios from "axios";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const { mode } = useAppTheme();

//   const isDark = mode === "dark";

//   const [stats, setStats] = useState({
//     complianceScore: 0,
//     frameworksCount: 0,
//     productsCount: 0,
//     reportsCount: 0,
//     loading: true,
//   });

//   // THEME COLORS
//   const theme = {
//     background: isDark
//       ? "linear-gradient(135deg,#020617,#0f172a,#1e293b)"
//       : "linear-gradient(135deg,#eef2ff,#f8fafc,#ffffff)",

//     card: isDark
//       ? "rgba(15,23,42,0.72)"
//       : "rgba(255,255,255,0.82)",

//     border: isDark
//       ? "1px solid rgba(255,255,255,0.08)"
//       : "1px solid rgba(15,23,42,0.08)",

//     text: isDark ? "#ffffff" : "#0f172a",

//     secondary: isDark
//       ? "#94a3b8"
//       : "#475569",

//     shadow: isDark
//       ? "0 20px 50px rgba(0,0,0,0.35)"
//       : "0 20px 50px rgba(15,23,42,0.08)",

//     blue: "#60a5fa",

//     purple: "#8b5cf6",

//     green: "#10b981",

//     orange: "#f59e0b",
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const [
//         reportsRes,
//         frameworksRes,
//         productsRes,
//       ] = await Promise.all([
//         axios.get(
//           "http://localhost:5000/api/compliance/get-reports",
//           {
//             withCredentials: true,
//           }
//         ),

//         axios.get(
//           "http://localhost:5000/api/framework/get-frameworks",
//           {
//             withCredentials: true,
//           }
//         ),

//         axios.get(
//           "http://localhost:5000/api/product/get-products",
//           {
//             withCredentials: true,
//           }
//         ),
//       ]);

//       const reports =
//         reportsRes.data?.data || [];

//       const frameworks =
//         frameworksRes.data?.data || [];

//       const products =
//         productsRes.data?.data || [];

//       const avgScore =
//         reports.length > 0
//           ? Math.round(
//               reports.reduce(
//                 (acc, r) =>
//                   acc + r.complianceScore,
//                 0
//               ) / reports.length
//             )
//           : 0;

//       setStats({
//         complianceScore: avgScore,
//         frameworksCount: frameworks.length,
//         productsCount: products.length,
//         reportsCount: reports.length,
//         loading: false,
//       });
//     } catch (error) {
//       console.error(
//         "Failed to fetch dashboard data:",
//         error
//       );

//       setStats((prev) => ({
//         ...prev,
//         loading: false,
//       }));
//     }
//   };

//   const cards = [
//     {
//       title: "Compliance Score",
//       value:
//         stats.complianceScore > 0
//           ? `${stats.complianceScore}%`
//           : "N/A",
//       icon: <ShieldIcon sx={{ fontSize: 42 }} />,
//       color: theme.blue,
//       gradient:
//         "linear-gradient(135deg,#2563eb,#3b82f6)",
//     },

//     {
//       title: "Frameworks",
//       value: stats.frameworksCount,
//       icon: (
//         <AssignmentIcon
//           sx={{ fontSize: 42 }}
//         />
//       ),
//       color: theme.purple,
//       gradient:
//         "linear-gradient(135deg,#7c3aed,#8b5cf6)",
//     },

//     {
//       title: "Products",
//       value: stats.productsCount,
//       icon: (
//         <StorageIcon sx={{ fontSize: 42 }} />
//       ),
//       color: theme.green,
//       gradient:
//         "linear-gradient(135deg,#059669,#10b981)",
//     },

//     {
//       title: "Reports Generated",
//       value: stats.reportsCount,
//       icon: (
//         <VerifiedIcon sx={{ fontSize: 42 }} />
//       ),
//       color: theme.orange,
//       gradient:
//         "linear-gradient(135deg,#d97706,#f59e0b)",
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: theme.background,
//         p: { xs: 2, md: 4 },
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* GLOW EFFECTS */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: -100,
//           left: -100,
//           width: 300,
//           height: 300,
//           borderRadius: "50%",
//           background:
//             "rgba(96,165,250,0.18)",
//           filter: "blur(100px)",
//         }}
//       />

//       <Box
//         sx={{
//           position: "absolute",
//           bottom: -100,
//           right: -100,
//           width: 300,
//           height: 300,
//           borderRadius: "50%",
//           background:
//             "rgba(139,92,246,0.18)",
//           filter: "blur(100px)",
//         }}
//       />

//       {/* HEADER */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <Box
//           sx={{
//             mb: 5,
//             position: "relative",
//             zIndex: 2,
//           }}
//         >
//           <Chip
//             icon={<AutoAwesomeIcon />}
//             label="AI Compliance Dashboard"
//             sx={{
//               mb: 3,
//               bgcolor: isDark
//                 ? "rgba(96,165,250,0.12)"
//                 : "rgba(59,130,246,0.1)",

//               color: theme.blue,

//               border: theme.border,

//               backdropFilter: "blur(10px)",
//             }}
//           />

//           <Typography
//             variant="h3"
//             fontWeight="800"
//             sx={{
//               background:
//                 "linear-gradient(90deg,#60a5fa,#8b5cf6)",

//               WebkitBackgroundClip: "text",

//               WebkitTextFillColor:
//                 "transparent",

//               mb: 2,
//             }}
//           >
//             Dashboard Overview
//           </Typography>

//           <Typography
//             sx={{
//               color: theme.secondary,
//               fontSize: "1.05rem",
//               lineHeight: 1.8,
//               maxWidth: "760px",
//             }}
//           >
//             Welcome back,{" "}
//             <strong>
//               {user?.name ||
//                 user?.userName ||
//                 "User"}
//             </strong>
//             . Monitor your compliance
//             ecosystem, frameworks, reports,
//             and product analytics in
//             real-time.
//           </Typography>
//         </Box>
//       </motion.div>

//       {/* STATS CARDS */}
//       <Grid
//         container
//         spacing={4}
//         sx={{
//           position: "relative",
//           zIndex: 2,
//         }}
//       >
//         {cards.map((card, index) => (
//           <Grid item xs={12} sm={6} md={3}>
//             <motion.div
//               initial={{
//                 opacity: 0,
//                 y: 40,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               transition={{
//                 delay: index * 0.15,
//               }}
//               whileHover={{
//                 y: -10,
//               }}
//             >
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 4,

//                   borderRadius: "28px",

//                   background: theme.card,

//                   backdropFilter:
//                     "blur(18px)",

//                   border: theme.border,

//                   boxShadow: theme.shadow,

//                   overflow: "hidden",

//                   position: "relative",

//                   transition: "0.4s ease",

//                   "&:hover": {
//                     transform:
//                       "translateY(-6px)",
//                   },
//                 }}
//               >
//                 {/* TOP GLOW */}
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: -30,
//                     right: -30,
//                     width: 120,
//                     height: 120,
//                     borderRadius: "50%",
//                     background:
//                       "rgba(255,255,255,0.06)",
//                   }}
//                 />

//                 <Box
//                   sx={{
//                     width: 72,
//                     height: 72,
//                     borderRadius: "22px",

//                     background:
//                       card.gradient,

//                     display: "flex",

//                     alignItems: "center",

//                     justifyContent:
//                       "center",

//                     color: "#fff",

//                     mb: 3,

//                     boxShadow:
//                       "0 12px 30px rgba(0,0,0,0.2)",
//                   }}
//                 >
//                   {card.icon}
//                 </Box>

//                 <Typography
//                   sx={{
//                     color: theme.secondary,
//                     fontWeight: 600,
//                     mb: 1,
//                   }}
//                 >
//                   {card.title}
//                 </Typography>

//                 {stats.loading ? (
//                   <CircularProgress
//                     sx={{
//                       mt: 2,
//                       color: card.color,
//                     }}
//                   />
//                 ) : (
//                   <Typography
//                     variant="h3"
//                     fontWeight="800"
//                     sx={{
//                       color: theme.text,
//                     }}
//                   >
//                     {card.value}
//                   </Typography>
//                 )}
//               </Paper>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>

//       {/* ANALYTICS SECTION */}
//       <Grid
//         container
//         spacing={4}
//         sx={{
//           mt: 1,
//           position: "relative",
//           zIndex: 2,
//         }}
//       >
//         {/* LEFT PANEL */}
//         <Grid item xs={12} md={8}>
//           <motion.div
//             initial={{
//               opacity: 0,
//               x: -30,
//             }}
//             animate={{
//               opacity: 1,
//               x: 0,
//             }}
//             transition={{
//               delay: 0.4,
//             }}
//           >
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 4,

//                 borderRadius: "30px",

//                 background: theme.card,

//                 backdropFilter:
//                   "blur(18px)",

//                 border: theme.border,

//                 boxShadow: theme.shadow,

//                 minHeight: 320,
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1.5,
//                   mb: 3,
//                 }}
//               >
//                 <TrendingUpIcon
//                   sx={{
//                     color: theme.blue,
//                     fontSize: 32,
//                   }}
//                 />

//                 <Typography
//                   variant="h5"
//                   fontWeight="700"
//                   sx={{
//                     color: theme.text,
//                   }}
//                 >
//                   System Insights
//                 </Typography>
//               </Box>

//               <Divider
//                 sx={{
//                   borderColor: isDark
//                     ? "rgba(255,255,255,0.08)"
//                     : "rgba(15,23,42,0.08)",

//                   mb: 4,
//                 }}
//               />

//               <Box
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns:
//                     {
//                       xs: "1fr",
//                       md: "1fr 1fr",
//                     },

//                   gap: 3,
//                 }}
//               >
//                 <Paper
//                   sx={{
//                     p: 3,

//                     borderRadius: "20px",

//                     bgcolor: isDark
//                       ? "rgba(255,255,255,0.03)"
//                       : "rgba(15,23,42,0.03)",

//                     border: theme.border,
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       color: theme.secondary,
//                       mb: 1,
//                     }}
//                   >
//                     AI Engine Status
//                   </Typography>

//                   <Typography
//                     variant="h6"
//                     fontWeight="700"
//                     sx={{
//                       color: theme.green,
//                     }}
//                   >
//                     Operational
//                   </Typography>
//                 </Paper>

//                 <Paper
//                   sx={{
//                     p: 3,

//                     borderRadius: "20px",

//                     bgcolor: isDark
//                       ? "rgba(255,255,255,0.03)"
//                       : "rgba(15,23,42,0.03)",

//                     border: theme.border,
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       color: theme.secondary,
//                       mb: 1,
//                     }}
//                   >
//                     Embedding Model
//                   </Typography>

//                   <Typography
//                     variant="h6"
//                     fontWeight="700"
//                     sx={{
//                       color: theme.purple,
//                     }}
//                   >
//                     Hugging Face
//                   </Typography>
//                 </Paper>

//                 <Paper
//                   sx={{
//                     p: 3,

//                     borderRadius: "20px",

//                     bgcolor: isDark
//                       ? "rgba(255,255,255,0.03)"
//                       : "rgba(15,23,42,0.03)",

//                     border: theme.border,
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       color: theme.secondary,
//                       mb: 1,
//                     }}
//                   >
//                     Vector Database
//                   </Typography>

//                   <Typography
//                     variant="h6"
//                     fontWeight="700"
//                     sx={{
//                       color: theme.blue,
//                     }}
//                   >
//                     Qdrant Active
//                   </Typography>
//                 </Paper>

//                 <Paper
//                   sx={{
//                     p: 3,

//                     borderRadius: "20px",

//                     bgcolor: isDark
//                       ? "rgba(255,255,255,0.03)"
//                       : "rgba(15,23,42,0.03)",

//                     border: theme.border,
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       color: theme.secondary,
//                       mb: 1,
//                     }}
//                   >
//                     Security Status
//                   </Typography>

//                   <Typography
//                     variant="h6"
//                     fontWeight="700"
//                     sx={{
//                       color: theme.orange,
//                     }}
//                   >
//                     Protected
//                   </Typography>
//                 </Paper>
//               </Box>
//             </Paper>
//           </motion.div>
//         </Grid>

//         {/* RIGHT PANEL */}
//         <Grid item xs={12} md={4}>
//           <motion.div
//             initial={{
//               opacity: 0,
//               x: 30,
//             }}
//             animate={{
//               opacity: 1,
//               x: 0,
//             }}
//             transition={{
//               delay: 0.5,
//             }}
//           >
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 4,

//                 borderRadius: "30px",

//                 background:
//                   "linear-gradient(135deg,#2563eb,#7c3aed)",

//                 color: "#fff",

//                 boxShadow:
//                   "0 20px 50px rgba(59,130,246,0.35)",

//                 minHeight: 320,

//                 position: "relative",

//                 overflow: "hidden",
//               }}
//             >
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: -40,
//                   right: -40,
//                   width: 160,
//                   height: 160,
//                   borderRadius: "50%",
//                   background:
//                     "rgba(255,255,255,0.08)",
//                 }}
//               />

//               <AutoAwesomeIcon
//                 sx={{
//                   fontSize: 56,
//                   mb: 3,
//                 }}
//               />

//               <Typography
//                 variant="h4"
//                 fontWeight="800"
//                 sx={{ mb: 2 }}
//               >
//                 Smart Compliance AI
//               </Typography>

//               <Typography
//                 sx={{
//                   opacity: 0.92,
//                   lineHeight: 1.9,
//                 }}
//               >
//                 Your intelligent compliance
//                 assistant powered by LLMs,
//                 semantic search, vector
//                 embeddings, and regulatory
//                 analysis automation.
//               </Typography>

//               <Box
//                 sx={{
//                   mt: 4,
//                   display: "flex",
//                   gap: 1,
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <Chip
//                   label="AI Powered"
//                   sx={{
//                     bgcolor:
//                       "rgba(255,255,255,0.16)",

//                     color: "#fff",
//                   }}
//                 />

//                 <Chip
//                   label="Secure"
//                   sx={{
//                     bgcolor:
//                       "rgba(255,255,255,0.16)",

//                     color: "#fff",
//                   }}
//                 />

//                 <Chip
//                   label="Realtime"
//                   sx={{
//                     bgcolor:
//                       "rgba(255,255,255,0.16)",

//                     color: "#fff",
//                   }}
//                 />
//               </Box>
//             </Paper>
//           </motion.div>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;


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
    try {
      const [reportsRes, frameworksRes, productsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/compliance/get-reports", {
          withCredentials: true,
        }),
        axios.get("http://localhost:5000/api/framework/get-frameworks", {
          withCredentials: true,
        }),
        axios.get("http://localhost:5000/api/product/get-products", {
          withCredentials: true,
        }),
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
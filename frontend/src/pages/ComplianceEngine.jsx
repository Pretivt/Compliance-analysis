// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Box,
//   Paper,
//   Grid,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Button,
//   CircularProgress,
//   Divider,
// } from "@mui/material";
// import axios from "axios";
// import { toast } from "react-toastify";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// const ComplianceEngine = () => {
//   const [products, setProducts] = useState([]);
//   const [frameworks, setFrameworks] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [selectedFramework, setSelectedFramework] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [report, setReport] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [productRes, frameworkRes] = await Promise.all([
//         axios.get("http://localhost:5000/api/product/get-products", { withCredentials: true }),
//         axios.get("http://localhost:5000/api/framework/get-frameworks", { withCredentials: true })
//       ]);
//       setProducts(productRes.data?.data || []);
//       setFrameworks(frameworkRes.data?.data || []);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to load products and frameworks");
//     }
//   };

//   const handleAnalyze = async () => {
//     if (!selectedProduct || !selectedFramework) {
//       toast.warning("Please select both a Product and a Framework");
//       return;
//     }

//     setLoading(true);
//     setReport("");
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/compliance/analyze",
//         {
//           productId: selectedProduct,
//           frameworkId: selectedFramework,
//         },
//         { withCredentials: true }
//       );
      
//       setReport(response.data?.data?.report);
//       toast.success("Compliance report generated successfully!");
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Analysis failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 } }}>
//       <Typography variant="h4" gutterBottom fontWeight="bold" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//         <AutoAwesomeIcon fontSize="large" /> Compliance Engine
//       </Typography>
//       <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
//         Select a product and a regulatory framework to perform an AI-powered RAG analysis.
//       </Typography>

//       <Grid container spacing={4}>
//         {/* Controls Section */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
//             <Typography variant="h6" fontWeight="600" mb={3}>
//               Analysis Parameters
//             </Typography>

//             <FormControl fullWidth sx={{ mb: 3 }}>
//               <InputLabel id="product-select-label">Select Product</InputLabel>
//               <Select
//                 labelId="product-select-label"
//                 value={selectedProduct}
//                 label="Select Product"
//                 onChange={(e) => setSelectedProduct(e.target.value)}
//               >
//                 {products.map((p) => (
//                   <MenuItem key={p._id} value={p._id}>
//                     {p.productName}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             <FormControl fullWidth sx={{ mb: 4 }}>
//               <InputLabel id="framework-select-label">Select Framework</InputLabel>
//               <Select
//                 labelId="framework-select-label"
//                 value={selectedFramework}
//                 label="Select Framework"
//                 onChange={(e) => setSelectedFramework(e.target.value)}
//               >
//                 {frameworks.map((f) => (
//                   <MenuItem key={f._id} value={f._id}>
//                     {f.name} ({f.shortCode})
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               size="large"
//               onClick={handleAnalyze}
//               disabled={loading || !selectedProduct || !selectedFramework}
//               startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
//               sx={{ py: 1.5, borderRadius: 2, textTransform: 'none', fontSize: '1.05rem', boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)' }}
//             >
//               {loading ? "Generating Report..." : "Analyze Compliance"}
//             </Button>
//           </Paper>
//         </Grid>

//         {/* Report Section */}
//         <Grid item xs={12} md={8}>
//           <Paper 
//             elevation={3} 
//             sx={{ 
//               p: 4, 
//               borderRadius: 2, 
//               minHeight: '60vh',
//               background: report ? '#ffffff' : '#f8f9fa',
//               display: 'flex',
//               flexDirection: 'column'
//             }}
//           >
//             {!report && !loading && (
//               <Box sx={{ m: 'auto', textAlign: 'center', opacity: 0.6 }}>
//                 <AutoAwesomeIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
//                 <Typography variant="h5" color="text.secondary">
//                   Ready for Analysis
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                   Configure your parameters on the left and run the AI engine.
//                 </Typography>
//               </Box>
//             )}

//             {loading && (
//               <Box sx={{ m: 'auto', textAlign: 'center' }}>
//                 <CircularProgress size={50} sx={{ mb: 3 }} />
//                 <Typography variant="h6" color="primary" sx={{ animation: 'pulse 1.5s infinite' }}>
//                   Querying Vector Database & Analyzing...
//                 </Typography>
//               </Box>
//             )}

//             {report && !loading && (
//               <Box className="markdown-body">
//                 <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
//                   AI Compliance Analysis Report
//                 </Typography>
//                 <Divider sx={{ mb: 4 }} />
//                 <Box sx={{ 
//                   '& h1, & h2, & h3': { color: '#1a237e', mt: 4, mb: 2, fontWeight: 600 },
//                   '& p': { lineHeight: 1.8, mb: 2, color: '#333' },
//                   '& ul': { pl: 3, mb: 2, color: '#333' },
//                   '& li': { mb: 1 },
//                   '& strong': { color: '#000' }
//                 }}>
//                   <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                     {report}
//                   </ReactMarkdown>
//                 </Box>
//               </Box>
//             )}
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ComplianceEngine;


import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  CircularProgress,
  Divider,
  Chip,
  Fade,
} from "@mui/material";

import axios from "axios";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ShieldIcon from "@mui/icons-material/Shield";
import VerifiedIcon from "@mui/icons-material/Verified";
import ScienceIcon from "@mui/icons-material/Science";
import HubIcon from "@mui/icons-material/Hub";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { motion } from "framer-motion";
import api from "../api/api.js";


import { useAppTheme } from "../context/ThemeContext.jsx";

const ComplianceEngine = () => {
  const { mode } = useAppTheme();

  const isDark = mode === "dark";

  const [products, setProducts] = useState([]);
  const [frameworks, setFrameworks] = useState([]);

  const [selectedProduct, setSelectedProduct] =
    useState("");

  const [selectedFramework, setSelectedFramework] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [report, setReport] = useState("");

  // THEME COLORS
  const theme = {
    background: isDark
      ? "linear-gradient(135deg,#020617,#0f172a,#1e293b)"
      : "linear-gradient(135deg,#eef2ff,#f8fafc,#ffffff)",

    card: isDark
      ? "rgba(15,23,42,0.75)"
      : "rgba(255,255,255,0.85)",

    border: isDark
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(15,23,42,0.08)",

    text: isDark ? "#ffffff" : "#0f172a",

    secondary: isDark
      ? "#94a3b8"
      : "#475569",

    blue: "#60a5fa",

    purple: "#a78bfa",

    shadow: isDark
      ? "0 20px 50px rgba(0,0,0,0.35)"
      : "0 20px 50px rgba(15,23,42,0.08)",
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // try {
    //   const [productRes, frameworkRes] =
    //     await Promise.all([
    //       axios.get(
    //         "http://localhost:5000/api/product/get-products",
    //         {
    //           withCredentials: true,
    //         }
    //       ),

    //       axios.get(
    //         "http://localhost:5000/api/framework/get-frameworks",
    //         {
    //           withCredentials: true,
    //         }
    //       ),
    //     ]);

      try {
      const [productRes, frameworkRes] =
        await Promise.all([
          axios.get(
            "http://localhost:5000/api/product/get-products",
            {
              withCredentials: true,
            }
          ),

          axios.get(
            "http://localhost:5000/api/framework/get-frameworks",
            {
              withCredentials: true,
            }
          ),
        ]);
      setProducts(productRes.data?.data || []);

      setFrameworks(frameworkRes.data?.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load products and frameworks"
      );
    }
  };

  const handleAnalyze = async () => {
    if (!selectedProduct || !selectedFramework) {
      toast.warning(
        "Please select both Product and Framework"
      );

      return;
    }

    setLoading(true);

    setReport("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/compliance/analyze",
        {
          productId: selectedProduct,
          frameworkId: selectedFramework,
        },
        {
          withCredentials: true,
        }
      );

      setReport(response.data?.data?.report);

      toast.success(
        "Compliance report generated successfully!"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Analysis failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: theme.background,
        transition: "all 0.4s ease",
        overflow: "hidden",
        position: "relative",
        p: { xs: 2, md: 4 },
      }}
    >
      {/* BACKGROUND GLOW */}
      <Box
        sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "rgba(96,165,250,0.18)",
          filter: "blur(120px)",
          top: -100,
          left: -100,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "rgba(167,139,250,0.16)",
          filter: "blur(120px)",
          bottom: -100,
          right: -100,
        }}
      />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Box
          sx={{
            mb: 5,
            position: "relative",
            zIndex: 2,
          }}
        >
          <Chip
            icon={
              isDark ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )
            }
            label={
              isDark
                ? "Dark Mode Enabled"
                : "Light Mode Enabled"
            }
            sx={{
              mb: 3,
              bgcolor: isDark
                ? "rgba(96,165,250,0.12)"
                : "rgba(59,130,246,0.1)",

              color: theme.blue,

              border: theme.border,

              backdropFilter: "blur(12px)",
            }}
          />

          <Typography
            variant="h3"
            fontWeight="800"
            sx={{
              background:
                "linear-gradient(90deg,#60a5fa,#8b5cf6)",

              WebkitBackgroundClip: "text",

              WebkitTextFillColor:
                "transparent",

              mb: 2,
            }}
          >
            AI Compliance Engine
          </Typography>

          <Typography
            sx={{
              color: theme.secondary,
              maxWidth: "760px",
              lineHeight: 1.9,
              fontSize: "1.05rem",
            }}
          >
            Analyze product compliance using
            AI-powered semantic search, Hugging
            Face embeddings, vector databases,
            and intelligent regulatory framework
            analysis.
          </Typography>
        </Box>
      </motion.div>

      <Grid
        container
        spacing={4}
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LEFT PANEL */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "30px",

                background: theme.card,

                backdropFilter: "blur(20px)",

                border: theme.border,

                boxShadow: theme.shadow,

                position: "sticky",

                top: 20,

                transition: "0.4s ease",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 4,
                }}
              >
                <ShieldIcon
                  sx={{
                    color: theme.blue,
                    fontSize: 32,
                  }}
                />

                <Typography
                  variant="h5"
                  fontWeight="700"
                  sx={{
                    color: theme.text,
                  }}
                >
                  Analysis Setup
                </Typography>
              </Box>

              {/* PRODUCT */}
              <FormControl
                fullWidth
                sx={{ mb: 3 }}
              >
                <InputLabel
                  sx={{
                    color: theme.secondary,
                  }}
                >
                  Select Product
                </InputLabel>

                <Select
                  value={selectedProduct}
                  label="Select Product"
                  onChange={(e) =>
                    setSelectedProduct(
                      e.target.value
                    )
                  }
                  sx={{
                    borderRadius: "18px",

                    color: theme.text,

                    bgcolor: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(15,23,42,0.02)",

                    transition: "0.3s",

                    ".MuiOutlinedInput-notchedOutline":
                      {
                        border: theme.border,
                      },

                    "&:hover .MuiOutlinedInput-notchedOutline":
                      {
                        border:
                          "1px solid #3b82f6",
                      },
                  }}
                >
                  {products.map((p) => (
                    <MenuItem
                      key={p._id}
                      value={p._id}
                    >
                      {p.productName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* FRAMEWORK */}
              <FormControl
                fullWidth
                sx={{ mb: 4 }}
              >
                <InputLabel
                  sx={{
                    color: theme.secondary,
                  }}
                >
                  Select Framework
                </InputLabel>

                <Select
                  value={selectedFramework}
                  label="Select Framework"
                  onChange={(e) =>
                    setSelectedFramework(
                      e.target.value
                    )
                  }
                  sx={{
                    borderRadius: "18px",

                    color: theme.text,

                    bgcolor: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(15,23,42,0.02)",

                    transition: "0.3s",

                    ".MuiOutlinedInput-notchedOutline":
                      {
                        border: theme.border,
                      },

                    "&:hover .MuiOutlinedInput-notchedOutline":
                      {
                        border:
                          "1px solid #8b5cf6",
                      },
                  }}
                >
                  {frameworks.map((f) => (
                    <MenuItem
                      key={f._id}
                      value={f._id}
                    >
                      {f.name} ({f.shortCode})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* TECH STACK */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  mb: 4,
                }}
              >
                <Chip
                  icon={<HubIcon />}
                  label="Qdrant"
                  sx={{
                    bgcolor:
                      "rgba(37,99,235,0.12)",

                    color: theme.blue,
                  }}
                />

                <Chip
                  icon={<ScienceIcon />}
                  label="Hugging Face"
                  sx={{
                    bgcolor:
                      "rgba(139,92,246,0.12)",

                    color: theme.purple,
                  }}
                />

                <Chip
                  icon={<AutoAwesomeIcon />}
                  label="LLM AI"
                  sx={{
                    bgcolor:
                      "rgba(16,185,129,0.12)",

                    color: "#10b981",
                  }}
                />
              </Box>

              {/* BUTTON */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={
                    loading ||
                    !selectedProduct ||
                    !selectedFramework
                  }
                  onClick={handleAnalyze}
                  startIcon={
                    loading ? (
                      <CircularProgress
                        size={20}
                        color="inherit"
                      />
                    ) : (
                      <AutoAwesomeIcon />
                    )
                  }
                  sx={{
                    py: 1.8,

                    borderRadius: "18px",

                    textTransform: "none",

                    fontSize: "1rem",

                    fontWeight: "700",

                    background:
                      "linear-gradient(135deg,#2563eb,#7c3aed)",

                    boxShadow:
                      "0 12px 35px rgba(59,130,246,0.35)",

                    transition: "0.4s",

                    "&:hover": {
                      background:
                        "linear-gradient(135deg,#1d4ed8,#6d28d9)",

                      boxShadow:
                        "0 16px 40px rgba(59,130,246,0.45)",
                    },
                  }}
                >
                  {loading
                    ? "Generating Report..."
                    : "Run AI Analysis"}
                </Button>
              </motion.div>
            </Paper>
          </motion.div>
        </Grid>

        {/* RIGHT PANEL */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,

                borderRadius: "30px",

                minHeight: "78vh",

                background: theme.card,

                backdropFilter: "blur(20px)",

                border: theme.border,

                boxShadow: theme.shadow,

                transition: "0.4s ease",
              }}
            >
              {/* EMPTY STATE */}
              {!report && !loading && (
                <Fade in timeout={1000}>
                  <Box
                    sx={{
                      textAlign: "center",
                      mt: 12,
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    >
                      <AutoAwesomeIcon
                        sx={{
                          fontSize: 90,
                          color: theme.blue,
                          mb: 3,
                        }}
                      />
                    </motion.div>

                    <Typography
                      variant="h4"
                      fontWeight="700"
                      sx={{
                        color: theme.text,
                        mb: 2,
                      }}
                    >
                      Ready for AI Analysis
                    </Typography>

                    <Typography
                      sx={{
                        color: theme.secondary,
                        maxWidth: "520px",
                        mx: "auto",
                        lineHeight: 1.9,
                      }}
                    >
                      Select a product and
                      regulatory framework to
                      generate an intelligent
                      compliance analysis report.
                    </Typography>
                  </Box>
                </Fade>
              )}

              {/* LOADING */}
              {loading && (
                <Box
                  sx={{
                    textAlign: "center",
                    mt: 14,
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                    }}
                  >
                    <CircularProgress
                      size={80}
                      thickness={4}
                      sx={{
                        color: theme.blue,
                        mb: 4,
                      }}
                    />
                  </motion.div>

                  <Typography
                    variant="h5"
                    fontWeight="700"
                    sx={{
                      color: theme.text,
                      mb: 2,
                    }}
                  >
                    AI Processing Started...
                  </Typography>

                  <Typography
                    sx={{
                      color: theme.secondary,
                    }}
                  >
                    Querying Vector Database &
                    Generating Smart Report
                  </Typography>
                </Box>
              )}

              {/* REPORT */}
              {report && !loading && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="800"
                    sx={{
                      color: theme.blue,
                      mb: 2,
                    }}
                  >
                    AI Compliance Report
                  </Typography>

                  <Divider
                    sx={{
                      borderColor: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(15,23,42,0.08)",

                      mb: 4,
                    }}
                  />

                  <Box
                    sx={{
                      "& h1, & h2, & h3": {
                        color: theme.text,

                        mt: 4,

                        mb: 2,

                        fontWeight: 700,
                      },

                      "& p": {
                        color: theme.secondary,

                        lineHeight: 1.9,

                        mb: 2,
                      },

                      "& ul": {
                        pl: 3,
                        color: theme.secondary,
                      },

                      "& li": {
                        mb: 1,
                      },

                      "& strong": {
                        color: theme.text,
                      },

                      "& code": {
                        background: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(15,23,42,0.05)",

                        px: 1,

                        py: 0.5,

                        borderRadius: "6px",
                      },
                    }}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                    >
                      {report}
                    </ReactMarkdown>
                  </Box>
                </motion.div>
              )}
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComplianceEngine;
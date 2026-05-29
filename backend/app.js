// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import authrouter from "./api/routes/auth.routes.js";
// import organizationRouter from "./api/routes/organization.routes.js";
// import frameworkRouter from "./api/routes/framework.route.js";
// import productRoute from "./api/routes/product.routes.js";
// import cors from "cors";
// dotenv.config();
// const app = express();

// console.log("🔥 SERVER IS RUNNING");

// //  cors:
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credentials: true,
//   }),
// );
// //  middleware:
// app.use(express.json());
// app.use(cookieParser());

// //  routes
// app.use("/api/auth", authrouter);
// app.use("/api/organization", organizationRouter);
// app.use("/api/framework", frameworkRouter);
// app.use("/api/product", productRoute);



// // app.use((err, req, res, next) => {

// //   console.log("🔥 GLOBAL ERROR:");
// //   console.error(err);

// //   return res.status(500).json({
// //     success: false,
// //     message: err.message,
// //     stack: err.stack,
// //   });
// // });
// export default app;




// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import authrouter from "./api/routes/auth.routes.js";
// import organizationRouter from "./api/routes/organization.routes.js";
// import frameworkRouter from "./api/routes/framework.route.js";
// import productRoute from "./api/routes/product.routes.js";
// import complianceRoute from "./api/routes/compliance.routes.js";
// import cors from "cors";
// dotenv.config();
// const app = express();

// //  cors:
// app.use(
//   cors({
//     origin: ["http://localhost:5173",  "http://localhost:5174", "https://compliance-analysis-pi.vercel.app"],
//     // origin: ["http://localhost:5173", "http://localhost:5174"],
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credentials: true,
//   }),
// );
// //  middleware:
// app.use(express.json()); // for parsing the json data 
// app.use(cookieParser());

// //  routes
// app.use("/api/auth", authrouter);
// app.use("/api/organization", organizationRouter);
// app.use("/api/framework", frameworkRouter);
// app.use("/api/product", productRoute);
// app.use("/api/compliance", complianceRoute);

// export default app;




import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authrouter from "./api/routes/auth.routes.js";
import organizationRouter from "./api/routes/organization.routes.js";
import frameworkRouter from "./api/routes/framework.route.js";
import productRoute from "./api/routes/product.routes.js";
import complianceRoute from "./api/routes/compliance.routes.js";
import cors from "cors";

dotenv.config();
const app = express();

// 🌐 DYNAMIC CORS ENGINE CONFIGURATION (Fixes Credentials & Multi-Origin Blocking)
const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:5174", 
  "https://compliance-analysis-pi.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Added OPTIONS for pre-flight safety
    credentials: true, // Crucial for passing cookies/tokens
  })
);

// ⚙️ STANDARD PARSING MIDDLEWARES
app.use(express.json()); 
app.use(cookieParser());

// 📜 CORE ROUTE SEGMENTS
app.use("/api/auth", authrouter);
app.use("/api/organization", organizationRouter);
app.use("/api/framework", frameworkRouter);
app.use("/api/product", productRoute);
app.use("/api/compliance", complianceRoute);

// 🚨 GLOBAL BACKEND ERROR HANDLER (Isse exact error frontend par dikhega, crash nahi hoga)
app.use((err, req, res, next) => {
  console.log("🔥 SERVER INFRASTRUCTURE ERROR:");
  console.error(err);

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Structural Mismatch",
    error: err.stack ? "Schema / Token Validation Failed" : err
  });
});

export default app;




import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    // 1. Cookie se token uthayein
    const token = req.cookies.token;

    console.log("Cookie:", req.cookies);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // 2. Token verify karein (Try-Catch handles invalid/expired tokens)
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // decoded mein wahi data hoga jo aapne genToken mein daala tha (id, name, role)
      req.user = decoded; // attach authenticated uses's info to request
      next();
    } catch (jwtErr) {
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Admin check
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access Denied: Admins only" });
  }
};

// User check
export const isUser = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    next();
  } else {
    return res.status(403).json({ message: "Access Denied: Users only" });
  }
};
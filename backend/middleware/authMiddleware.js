// middleware/authMiddleware.js
module.exports = (req, res, next) => {
    // Simulate auth (replace with real logic like JWT)
    req.user = { id: 1 }; // Example hardcoded ID
    next();
  };
  
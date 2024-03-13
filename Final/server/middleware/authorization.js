// بسم الله

const usersModel = require("../models/users");

module.exports = {
  async parseAuthorizationToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return next(); // Continue without user info if no token
    }

    try {
      const payload = await usersModel.verifyJWT(token);
      req.user = payload; // Attach user payload to the request
      next();
    } catch (error) {
      return next({
        status: 403,
        message: "Invalid or expired token. Please logout and sign in again.",
      });
    }
  },

  requireUser(adminOnly = false) {
    return function (req, res, next) {
      if (!req.user) {
        return next({
          status: 401,
          message: "You are not able to access this action.",
        });
      }
      if (adminOnly && req.user.role !== "admin") {
        return next({
          status: 403,
          message: "You must be an admin to perform this action.",
        });
      }

      next();
    };
  },
};

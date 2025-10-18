import { AuthRepository } from "../models/AuthRepository.js";
import { userPool as pool } from "../config/db.js";

export function requireAuth(req, res, next) {
  if (req.session && req.session?.user && req.session?.user?.id) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
}

export async function attachUser(req, res, next) {
  if (req.session && req.session?.user && req.session?.user?.id) {
    try {
      const user = await AuthRepository.getUserById(pool, req.session.user.id);
      req.user = user;
    } catch (err) {
      console.error("attachUser error:", err);
    }
  }
  next();
}

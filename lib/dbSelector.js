import { userPool, adminPool } from "../config/db.js";

export function getPoolFor(req) {
  const roleId = req.session.user.role_id;
  console.log("Role ID in getPoolFor:", roleId);
  return Number(roleId) === 1 ? adminPool : userPool;
}

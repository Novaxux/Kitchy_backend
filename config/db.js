import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// Application user pool (least privileges)
const userPool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER_APP,
  password: process.env.DB_PASSWORD_APP,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
});

// Admin pool (higher privileges) - used only for admin-only operations
const adminPool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER_ADMIN,
  password: process.env.DB_PASSWORD_ADMIN,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
});

export { userPool, adminPool };
export default userPool; // default for backward compatibility
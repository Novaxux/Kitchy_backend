import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// Application user pool (least privileges)
const userPool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER_APP || process.env.DB_USER || process.env.MYSQL_USER,
  password:
    process.env.DB_PASSWORD_APP || process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD,
  database: process.env.DB_NAME || process.env.MYSQL_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
});

// Admin pool (higher privileges) - used only for admin-only operations
const adminPool = createPool({
  host: process.env.DB_HOST,
  user:
    process.env.DB_USER_ADMIN || process.env.DB_ADMIN_USER || process.env.MYSQL_USER,
  password:
    process.env.DB_PASSWORD_ADMIN || process.env.DB_ADMIN_PASSWORD || process.env.MYSQL_PASSWORD,
  database: process.env.DB_NAME || process.env.MYSQL_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
});

export { userPool, adminPool };
export default userPool; // default for backward compatibility
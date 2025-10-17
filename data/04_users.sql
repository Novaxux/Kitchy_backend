-- permisos para el usuario kitchy;

-- NOTE: Replace `your_database_name` with the actual database name used by the project
-- Example: if DB_NAME=kitchy then set DB_NAME_IN_SQL=kitchy

-- Create application user with least privileges
CREATE USER IF NOT EXISTS 'app_user'@'%' IDENTIFIED BY 'app_password';

-- Grant minimal privileges to app_user for application operations
-- Adjust table list if your app needs more/less access
GRANT SELECT, INSERT, UPDATE ON kitchy.recipes TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON kitchy.recipe_ingredients TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON kitchy.ingredients TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON kitchy.units TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON kitchy.favorites TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON kitchy.likes TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON kitchy.users TO 'app_user'@'%';

-- Create admin user with broader privileges for migrations/maintenance
CREATE USER IF NOT EXISTS 'admin_user'@'%' IDENTIFIED BY 'admin_password';
GRANT ALL PRIVILEGES ON your_database_name.* TO 'admin_user'@'%';

-- SQL initializer to create application and admin DB users and grant privileges.
-- WARNING: this SQL contains plaintext passwords. Ensure .env and repository
-- are secured and replace passwords with production-secure values before deploy.

-- Database name used by this project (created by MYSQL_DATABASE)
USE `kitchy`;

-- Create application user (least privileges)
CREATE USER IF NOT EXISTS 'app_user'@'%' IDENTIFIED BY 'app_password';

GRANT SELECT, INSERT, UPDATE ON `kitchy`.`recipes` TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON `kitchy`.`recipe_ingredients` TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON `kitchy`.`ingredients` TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON `kitchy`.`units` TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON `kitchy`.`favorites` TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON `kitchy`.`likes` TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON `kitchy`.`users` TO 'app_user'@'%';

-- Create admin user with broad privileges
CREATE USER IF NOT EXISTS 'admin_user'@'%' IDENTIFIED BY 'admin_password';
GRANT ALL PRIVILEGES ON `kitchy`.* TO 'admin_user'@'%';

FLUSH PRIVILEGES;

-- End of SQL initializer

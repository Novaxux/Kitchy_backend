
-- Crear usuario de aplicación (permisos mínimos)
CREATE USER IF NOT EXISTS 'app_user'@'%' IDENTIFIED BY 'app_password';
GRANT SELECT, INSERT, UPDATE ON `kitchy`.`recipes` TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON `kitchy`.`recipe_ingredients` TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON `kitchy`.`ingredients` TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON `kitchy`.`units` TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON `kitchy`.`favorites` TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON `kitchy`.`likes` TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE ON `kitchy`.`users` TO 'app_user'@'%';

-- Crear usuario admin (permisos amplios)
CREATE USER IF NOT EXISTS 'admin_user'@'%' IDENTIFIED BY 'admin_password';
GRANT ALL PRIVILEGES ON `kitchy`.* TO 'admin_user'@'%';

FLUSH PRIVILEGES;

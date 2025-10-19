INSERT INTO units (name, type) VALUES 
('g', 'weight'),
('kg', 'weight'),
('mg', 'weight'),
('ml', 'volume'),
('l', 'volume'),
('cup', 'volume'),
('tbsp', 'volume'),
('tsp', 'volume'),
('piece', 'piece'),
('slice', 'piece');

-- ----------------------------
-- Countries (con SVG simplificado)
-- ----------------------------
INSERT INTO countries (name, icon) VALUES
('México', '🇲🇽'),
('Italia', '🇮🇹'),
('Francia', '🇫🇷'),
('Japón', '🇯🇵'),
('India', '🇮🇳');

-- ----------------------------
-- Ingredients
-- ----------------------------
INSERT INTO ingredients (name) VALUES
('Tomate'),
('Cebolla'),
('Ajo'),
('Pimiento'),
('Aceite de oliva'),
('Sal'),
('Pimienta'),
('Queso'),
('Leche'),
('Harina');

-- ----------------------------
-- Categories
-- ----------------------------
INSERT INTO categories (name) VALUES
('Desayuno'),
('Almuerzo'),
('Cena'),
('Postre'),
('Snack'),
('Bebida'),
('Sopa'),
('Ensalada'),
('Pizza'),
('Pasta');

-- ----------------------------
-- Recipes
-- ----------------------------
INSERT INTO recipes (title, description, instructions, image_url, category_id, country_id)
VALUES
('Tacos al Pastor', 'Deliciosos tacos mexicanos', 'Preparar la carne y servir en tortillas.', '', 2, 1),
('Pizza Margherita', 'Pizza italiana clásica', 'Preparar masa, agregar tomate y queso, hornear.', '', 9, 2),
('Croissant', 'Panecillo francés', 'Amasar y hornear la masa con mantequilla.', '', 4, 3),
('Sushi', 'Arroz con pescado crudo', 'Formar rollos de sushi con arroz y pescado.', '', 3, 4),
('Curry de Pollo', 'Plato indio picante', 'Cocinar pollo con especias y salsa.', '', 2, 5),
('Ensalada Caprese', 'Tomate, mozzarella y albahaca', 'Cortar y mezclar ingredientes.', '', 8, 2),
('Crepas', 'Postre francés relleno', 'Preparar masa y rellenar con chocolate o frutas.', '', 4, 3),
('Sopa de Tomate', 'Sopa caliente de tomate', 'Cocinar tomates y licuar.', '', 7, 1),
('Lassi', 'Bebida india de yogur', 'Mezclar yogur con agua y especias.', '', 6, 5),
('Spaghetti Carbonara', 'Pasta italiana con salsa cremosa', 'Cocinar pasta y mezclar con huevo y queso.', '', 10, 2);

-- ----------------------------
-- Recipe_Ingredients
-- ----------------------------
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, unit_id, quantity) VALUES
(1, 1, 1, 200), -- Tomate en g
(1, 2, 1, 50),  -- Cebolla
(1, 3, 1, 10),  -- Ajo
(2, 9, 2, 200), -- Queso en g
(2, 1, 1, 150), -- Tomate
(3, 10, 2, 100), -- Harina
(3, 5, 3, 50),  -- Aceite de oliva
(4, 1, 1, 100), -- Tomate
(4, 3, 1, 10),  -- Ajo
(5, 3, 1, 20);  -- Ajo

-- ----------------------------
-- Roles
-- ----------------------------
INSERT INTO roles (name) VALUES 
('admin'),
('user');

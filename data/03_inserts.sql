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
-- Categories
-- ----------------------------
INSERT INTO categories (name) VALUES
('Desayunos'),
('Postres'),
('Almuerzos'),
('Cenas'),
('Snacks'),
('Bebidas'),
('Sopas'),
('Ensaladas');

-- ----------------------------
-- Countries (con SVG simplificado)
-- ----------------------------
INSERT INTO countries (name, svg_icon) VALUES
('México', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"><rect width="213" height="480" fill="#006847"/><rect x="213" width="214" height="480" fill="#fff"/><rect x="427" width="213" height="480" fill="#ce1126"/></svg>'),
('Italia', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"><rect width="213" height="480" fill="#009246"/><rect x="213" width="214" height="480" fill="#fff"/><rect x="427" width="213" height="480" fill="#ce2b37"/></svg>'),
('Francia', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"><rect width="213" height="480" fill="#0055A4"/><rect x="213" width="214" height="480" fill="#fff"/><rect x="427" width="213" height="480" fill="#EF4135"/></svg>'),
('Japón', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"><rect width="640" height="480" fill="#fff"/><circle cx="320" cy="240" r="96" fill="#bc002d"/></svg>'),
('India', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"><rect width="640" height="160" fill="#ff9933"/><rect y="160" width="640" height="160" fill="#fff"/><rect y="320" width="640" height="160" fill="#138808"/><circle cx="320" cy="240" r="40" fill="#000088"/></svg>');

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
INSERT INTO recipes (title, description, instructions, image_url, category_id, country_id, likes_count)
VALUES
('Tacos al Pastor', 'Deliciosos tacos mexicanos', 'Preparar la carne y servir en tortillas.', '', 2, 1, 0),
('Pizza Margherita', 'Pizza italiana clásica', 'Preparar masa, agregar tomate y queso, hornear.', '', 9, 2, 0),
('Croissant', 'Panecillo francés', 'Amasar y hornear la masa con mantequilla.', '', 4, 3, 0),
('Sushi', 'Arroz con pescado crudo', 'Formar rollos de sushi con arroz y pescado.', '', 3, 4, 0),
('Curry de Pollo', 'Plato indio picante', 'Cocinar pollo con especias y salsa.', '', 2, 5, 0),
('Ensalada Caprese', 'Tomate, mozzarella y albahaca', 'Cortar y mezclar ingredientes.', '', 8, 2, 0),
('Crepas', 'Postre francés relleno', 'Preparar masa y rellenar con chocolate o frutas.', '', 4, 3, 0),
('Sopa de Tomate', 'Sopa caliente de tomate', 'Cocinar tomates y licuar.', '', 7, 1, 0),
('Lassi', 'Bebida india de yogur', 'Mezclar yogur con agua y especias.', '', 6, 5, 0),
('Spaghetti Carbonara', 'Pasta italiana con salsa cremosa', 'Cocinar pasta y mezclar con huevo y queso.', '', 10, 2, 0);

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

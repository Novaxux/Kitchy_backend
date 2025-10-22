-- ============================================================
-- UNITS
-- ============================================================
INSERT INTO units (name, type) VALUES 
('g', 'weight'),
('kg', 'weight'),
('ml', 'volume'),
('l', 'volume'),
('tsp', 'volume'),
('tbsp', 'volume'),
('cup', 'volume'),
('piece', 'piece'),
('slice', 'piece');

-- ============================================================
-- COUNTRIES
-- ============================================================
INSERT INTO countries (name, icon) VALUES
('México', '🇲🇽'),
('Italia', '🇮🇹'),
('Francia', '🇫🇷'),
('Japón', '🇯🇵'),
('India', '🇮🇳');

-- ============================================================
-- INGREDIENTS
-- ============================================================
INSERT INTO ingredients (name) VALUES
('Tortilla de maíz'),
('Carne de cerdo'),
('Piña'),
('Cebolla'),
('Cilantro'),
('Tomate'),
('Queso mozzarella'),
('Masa para pizza'),
('Albahaca fresca'),
('Huevo'),
('Espagueti'),
('Panceta'),
('Crema'),
('Curry en polvo'),
('Pollo'),
('Arroz jazmín'),
('Yogur natural'),
('Miel'),
('Mango'),
('Leche');

-- ============================================================
-- CATEGORIES
-- ============================================================
INSERT INTO categories (name) VALUES
('Desayuno'),
('Almuerzo'),
('Cena'),
('Postre'),
('Snack'),
('Bebida');

-- ============================================================
-- RECIPES
-- ============================================================
INSERT INTO recipes (title, description, instructions, image_url, category_id, country_id)
VALUES
-- 1. Desayuno mexicano
('Chilaquiles Verdes', 
 'Clásico desayuno mexicano con totopos bañados en salsa verde, crema y queso.',
 '1. Freír los totopos hasta que estén crujientes. 
 2. Calentar la salsa verde y verterla sobre los totopos. 
 3. Agregar crema, queso fresco y cebolla al gusto. 
 4. Servir con huevo o pollo deshebrado.', 
 'https://pipoham274.netlify.app/img/breakfast/trans-chilaquiles-verdes.png', 
 1, 1),

-- 2. Almuerzo italiano
('Spaghetti Carbonara', 
 'Pasta italiana cremosa con huevo, panceta y queso parmesano.',
 '1. Cocinar la pasta al dente. 
 2. Freír la panceta hasta dorar. 
 3. Mezclar huevo batido con queso rallado y un poco del agua de cocción. 
 4. Incorporar la pasta caliente con la mezcla para formar la salsa.', 
 'https://cdn.shopify.com/s/files/1/0343/3175/4633/files/PLATO.png?v=1598302402', 
 2, 2),

-- 3. Cena india
('Curry de Pollo', 
 'Pollo cocinado con especias y salsa cremosa, típico de la cocina india.',
 '1. Sofreír cebolla, ajo y jengibre. 
 2. Agregar el curry en polvo y cocinar ligeramente. 
 3. Incorporar el pollo en cubos y dorar. 
 4. Añadir crema o leche de coco y cocinar hasta espesar.', 
 'https://pastamiacr.com/wp-content/uploads/2024/07/pollo-al-curry-2-1024x930.png', 
 3, 5),

-- 4. Postre francés
('Crepas con Miel y Mango', 
 'Dulce postre francés con frutas tropicales y miel.',
 '1. Preparar la masa de crepas con harina, huevo, leche y mantequilla. 
 2. Cocinar las crepas en sartén. 
 3. Rellenar con mango fresco y rociar con miel antes de servir.', 
 'https://png.pngtree.com/png-clipart/20240209/original/pngtree-honey-and-pancakes-pancake-photo-png-image_14270767.png', 
 4, 3),

-- 5. Bebida india
('Lassi de Mango', 
 'Refrescante bebida india elaborada con yogur, mango y miel.',
 '1. Colocar mango pelado, yogur y miel en la licuadora. 
 2. Agregar hielo y un poco de agua fría. 
 3. Licuar hasta obtener una textura cremosa. 
 4. Servir frío y decorar con menta.', 
 'https://png.pngtree.com/png-vector/20240812/ourmid/pngtree-fresh-smoothie-mango-lassi-with-fruit-in-isolated-on-transparent-background-png-image_13459333.png', 
 6, 5);

-- ============================================================
-- RECIPE_INGREDIENTS
-- ============================================================
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, unit_id, quantity) VALUES
-- Chilaquiles Verdes
(1, 1, 8, 10),      -- 10 piezas de tortilla
(1, 4, 1, 50),      -- 50g cebolla
(1, 6, 1, 100),     -- 100g tomate
(1, 5, 1, 10),      -- 10g cilantro
(1, 10, 8, 1),      -- 1 huevo

-- Spaghetti Carbonara
(2, 11, 1, 200),    -- 200g espagueti
(2, 12, 1, 100),    -- 100g panceta
(2, 10, 8, 2),      -- 2 huevos
(2, 13, 1, 50),     -- 50g crema

-- Curry de Pollo
(3, 14, 1, 15),     -- 15g curry en polvo
(3, 15, 1, 200),    -- 200g pollo
(3, 4, 1, 50),      -- 50g cebolla
(3, 20, 3, 100),    -- 100ml leche

-- Crepas con Miel y Mango
(4, 10, 8, 2),      -- 2 huevos
(4, 20, 3, 250),    -- 250ml leche
(4, 19, 1, 100),    -- 100g mango
(4, 18, 3, 30),     -- 30ml miel

-- Lassi de Mango
(5, 17, 3, 150),    -- 150ml yogur
(5, 19, 1, 100),    -- 100g mango
(5, 18, 3, 20);     -- 20ml miel

-- ============================================================
-- ROLES
-- ============================================================
INSERT INTO roles (name) VALUES 
('admin'),
('user');

import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";

import { PORT, CORS_ORIGIN, SESSION_SECRET } from "./config/config.js";

// Rutas
import authRoutes from "./routes/auth.routes.js";
import recipesRoutes from "./routes/recipes.routes.js";
import ingredientsRoutes from "./routes/ingredients.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import countryRoutes from "./routes/country.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import likeRoutes from "./routes/like.routes.js";

// Middlewares
import { attachUser } from "./middlewares/auth.middleware.js";

const app = express();

// --- Middlewares base ---
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

// --- Configuración de sesión ---
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // cambia a true si usas HTTPS
      sameSite: "lax", // "none" puede causar errores en desarrollo local
        maxAge: 1000 * 60 * 60 * 24, // 1 día
    },
  })
);

// --- Adjunta usuario autenticado a req.user ---
app.use(attachUser);

// --- Rutas ---
app.use("/auth", authRoutes);
app.use("/recipes", likeRoutes);
app.use("/recipes", favoritesRoutes);
app.use("/recipes", recipesRoutes);
app.use("/ingredients", ingredientsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/countries", countryRoutes);

// --- Servidor ---
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

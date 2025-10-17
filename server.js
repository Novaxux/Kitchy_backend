import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT, CORS_ORIGIN } from "./config/config.js";
import recipesRoutes from "./routes/recipes.routes.js";
import ingredientsRoutes from "./routes/ingredients.routes.js";
import likeRoute from "./routes/like.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import authRoutes from "./routes/auth.routes.js";
import session from "express-session";
import { SESSION_SECRET } from "./config/config.js";
import { attachUser } from "./middlewares/auth.middleware.js";

const app = express();
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Attach user info to req.user when session exists
app.use(attachUser);

// Routes
app.use("/auth", authRoutes);
// Mount specific /recipes subroutes before the general recipes router
app.use("/recipes", likeRoute);
app.use("/recipes", favoritesRoutes);
app.use("/recipes", recipesRoutes);
app.use("/ingredients", ingredientsRoutes);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

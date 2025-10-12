import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT } from "./config/config.js";
import recipesRoutes from "./routes/recipes.routes.js";
import ingredientsRoutes from "./routes/ingredients.routes.js";
import likeRoute from "./routes/like.routes.js";
import favoritesRoutes  from "./routes/favorites.routes.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


// Routes
app.use("/recipes", recipesRoutes);
app.use("/ingredients", ingredientsRoutes);
app.use("/recipes", likeRoute);
app.use("/recipes", favoritesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
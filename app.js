import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import db from './src/config/db.js';
import recipeRoutes from './src/routes/RecipeRoutes.js ';

dotenv.config(); // Charge les variables d'environnement depuis un fichier .env

const app = express();

app.use(bodyParser.json());

app.use('/api', recipeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

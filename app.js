import express from 'express';
import dotenv from 'dotenv';
import recipeRoutes from './src/routes/RecipeRoutes.js '; 

dotenv.config(); 

const app = express();

app.use(express.json());

app.use('/api', recipeRoutes); 

const PORT = process.env.PORT; 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

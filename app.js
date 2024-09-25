import express from 'express';
import dotenv from 'dotenv';
import RecipeRoutes from './src/routes/RecipeRoutes.js ';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api', RecipeRoutes);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

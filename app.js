import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import RecipeRoutes from './src/routes/RecipeRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3090;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost'
}));
app.use(cors());

// Routes
app.use('/api', RecipeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

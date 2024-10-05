import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/routes/recipeRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3090;

// Middleware
app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
};
app.use(cors(corsOptions));
app.use(router);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

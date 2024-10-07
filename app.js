import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/routes/recipeRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(router);

const port = process.env.PORT || 3090;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

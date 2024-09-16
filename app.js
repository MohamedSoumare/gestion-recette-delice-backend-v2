const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./src/config/db');
const recipeRoutes = require('./src/routes/recipeRoutes');

dotenv.config(); // Charger les variables d'environnement

const app = express();
app.use(bodyParser.json()); // Parser le corps des requêtes JSON

app.use('/api', recipeRoutes); // Utiliser les routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

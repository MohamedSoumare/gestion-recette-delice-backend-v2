const express = require('express'); // Importe le framework Express
const bodyParser = require('body-parser'); // Importe body-parser pour traiter les données JSON dans le corps des requêtes
const dotenv = require('dotenv'); // Importe dotenv pour charger les variables d'environnement
const db = require('./src/config/db'); // Importe la configuration de la base de données
const recipeRoutes = require('./src/routes/recipeRoutes'); // Importe les routes liées aux recettes

dotenv.config(); // Charge les variables d'environnement depuis un fichier .env

const app = express(); // Crée une application Express

app.use(bodyParser.json()); // Utilise body-parser pour parser les requêtes en JSON

// Définir le chemin de base des routes liées aux recettes (tout ce qui commence par '/api' sera dirigé vers recipeRoutes)
app.use('/api', recipeRoutes); 

// Définir le port à utiliser pour l'application, soit depuis les variables d'environnement ou 3000 par défaut
const PORT = process.env.PORT || 3000; 

// Démarrer le serveur sur le port défini
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

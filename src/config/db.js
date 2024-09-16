const mysql = require('mysql2');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();


// Créer la connexion à la base de données
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Tester la connexion
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err.message);
  } else {
    console.log('Connexion à la base de données réussie !');
  }
});

// Exporter la connexion
module.exports = connection;

##  gestion-recette-api-express

Ceci est l'API backend pour l'application de gestion de recettes, développée avec Express.js. Elle fournit une interface RESTful pour gérer les recettes, permettant de créer, lire, mettre à jour et supprimer des recettes dans une base de données. L'API est conçue pour être consommée par le frontend afin de gérer les opérations sur les recettes.

## Mise en place du projet

Pour configurer le projet, suivez ces étapes :

1. Cloner le dépôt :

    ```bash
   git clone https://github.com/FatimataAliouSall/gestion-recette-api-express.git
   cd gestion-recette-api-express

   ```
2. Installer les dépendances :  

    ```bash
   npm install

   ```
3. Démarrer le serveur :
  
    ```bash
   npm start

   ```

L'API sera accessible à l'adresse http://localhost:3000.

##  Endpoints de l'API

Créer une recette

- Méthode : POST
- Endpoint : /api/recettes
- Description : Ajoute une nouvelle recette dans la base de données.

Obtenir toutes les recettes

- Méthode : GET
- Endpoint : /api/recettes
- Description : Récupère toutes les recettes de la base de données.

Obtenir une recette par ID

- Méthode : GET
- Endpoint : /api/recettes/:id
- Description : Récupère une recette par son ID.

Mettre à jour une recette

- Méthode : PUT
- Endpoint : /api/recettes/:id
- Description : Met à jour une recette par son ID.

Supprimer une recette

- Méthode : DELETE
- Endpoint : /api/recettes/:id
- Description : Supprime une recette par son ID.

##  Configuration de la base de données

La connexion à la base de données est configurée manuellement sans utiliser d'ORM. Pour configurer la base de données, créez une base MySQL nommée gestion_recettes, puis modifiez les informations de connexion tellesques DB_HOST, DB_USER, DB_PASS, DB_NAME dans le fichier ./env .


## Auteurs

- **[Fatimata Aliou Sall](https://github.com/fatimata-sall)** - Développeuse Full Stack
- **[Mohamed Soumare](https://github.com/MohamedSoumare)** - Développeur Full Stack

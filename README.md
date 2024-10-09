## gestion-recette-api-express

Ceci est l'API backend pour l'application de gestion de recettes, développée avec Express.js. Elle fournit une interface RESTful pour gérer les recettes, permettant de créer, lire, mettre à jour et supprimer des recettes dans une base de données. L'API est conçue pour être consommée par le frontend afin de gérer les opérations sur les recettes.

## Prérequis

- Node.js (version 18 ou supérieure)
- MySQL (version 8 ou supérieure)
- Docker (version 20 ou supérieure)

## Mise en place du projet

Pour configurer le projet, suivez ces étapes :

1. Cloner le dépôt :

```bash
   git https://github.com/MohamedSoumare/gestion-recette-delice-backend-v2.git
   cd  gestion-recette-delice-backend-v2
```

2. Installer les dépendances :

```bash
   npm install
```

3. Démarrer le serveur :

```bash
  npm start
```

4. Créez un fichier .env à la racine du projet et configurez les variables d'environnement pour la connexion à la base de données :

```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your-password
    DB_NAME=your-database
    PORT=3090
```

L'API sera accessible à l'adresse http://localhost:3090.

## Endpoints de l'API

1. Créer une recette

- Méthode : POST
- URL : http://localhost:3090/recipes/add
- Description : Ajoute une nouvelle recette dans la base de données.
- Corps du requête:

```json
{
  "title": "Salade César",
  "type": "Entrée",
  "ingrédient": "Laitue, Poulet, Parmesan, Croutons",
  "categorie_id": 4
}
```

- **Réponse** :

```json
{
  "message": "Recette ajoutée avec succès"
}
```

2. Obtenir toutes les recettes

- Méthode : GET
- URL : http://localhost:3090/recipes
- Description : Récupère toutes les recettes de la base de données.

- **Réponse** :

```json
[
  {
    "id": 2,
    "title": "Chocolate Cake",
    "type": "Dessert",
    "ingredient": "Poulet, Beurre, Ail, Herbes",
    "categorie_id": 2
  }
]
```

3. Obtenir une recette par ID

- Méthode : GET
- URL : http://localhost:3090/recipes/3
- Description : Récupère une recette par son ID.

- **Réponse** :

```json
{
  "id": 2,
  "title": "Chocolate Cake",
  "type": "Plat Principal",
  "ingredient": "Poulet, Beurre, Ail, Herbes",
  "categorie_id": 2
}
```

4. Mettre à jour une recette

- Méthode : PUT
- URL : http://localhost:3090/recipes/edit/3
- Description : Met à jour une recette par son ID.

- **Corps de la requête** :

```json
{
  "title": "Pizza",
  "type": "Plat principal",
  "ingrédient": "Tomates, Fromage, Pâte, Basilic",
  "categorie_id": 4
}
```

- **Réponse** :

```json
{
  "message": "Recette mise à jour avec succès"
}
```

5. Supprimer une recette.

- Méthode : DELETE
- URL : http://localhost:3090/recipes/delete/3
- Description : Supprime une recette par son ID.

- **Réponse** :

```json
{
  "message": "Recette supprimée avec succès"
}
```

### **Categories**

### GET

-**URL :** http://localhost:3090/categories

- **Description** : Récupère toutes les categories.
- **Réponse** :

```json
[
  {
    "id": 1,
    "nom": "Breakfast"
  },
  {
    "id": 2,
    "nom": "Starter"
  }
]
```

### POST

-**URL :** http://localhost:3090/categories/add

- **Description** : Crée une nouvelle categorie.
- **Corps de la requête** :

```json
{
  "nom": "Soup"
}
```

- **Réponse** :

```json
{
  "message": "Categorie ajoutée avec succès"
}
```

### PUT

-**URL :** http://localhost:3090/categories/edit/3

- **Description** : Met à jour une categorie.
- **Corps de la requête** :

```json
{
  "nom": "Apéri"
}
```

- **Réponse** :

```json
{
  "message": "Categorie modifiée avec succès"
}
```

### DELETE

-**URL :** http://localhost:3090/categories/delete/3

- **Description** : Supprime une categorie par ID.

- **Réponse** :

````json
{
  "message": "Categorie supprimer avec succès"
}

## Tests

Les tests unitaires sont écrits avec Jasmine. Pour les exécuter, utilisez la commande :

```bash
  npm test
````

## Configuration de la base de données

La connexion à la base de données est configurée manuellement sans utiliser d'ORM. Pour configurer la base de données, créez une base MySQL nommée gestion_recettes, puis modifiez les informations de connexion tellesques DB_HOST, DB_USER, DB_PASS, DB_NAME dans le fichier ./env .

## Auteurs

- **[Mohamed Soumare](https://github.com/MohamedSoumare)** - Développeur Full Stack

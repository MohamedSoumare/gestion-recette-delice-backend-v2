CREATE DATABASE  IF NOT EXISTS `recipes_mangement` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `recipes_mangement`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: recipes_mangement
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Starter'),(3,'SSALI26'),(6,'Appetizer'),(7,'Beverage'),(8,'Breakfast'),(9,'SS526'),(14,'SD'),(34,'SASS'),(45,'fr'),(46,'Plat principal'),(49,'Plat principal'),(50,'Plat principal'),(51,'Dessert'),(54,'Main Course'),(55,'Side Dish'),(56,'Soup'),(57,'Salad'),(58,'Grill'),(59,'Pizza'),(60,'Sandwich'),(61,'Dessert'),(62,'Drink'),(63,'Appetizer'),(64,'Breakfast'),(65,'Seafood'),(66,'Vegan'),(67,'Vegetarian'),(68,'Gluten-Free'),(69,'BBQ');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `ingredient` text NOT NULL,
  `categorie_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `recipes_ibfk_1` (`categorie_id`),
  CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (4,'Caesar Salad','starter','Lettuce, Croutons, Parmesan, Caesar Dressing, Chicken',2),(6,'Lemon Tart','dessert','Flour, Butter, Sugar, Lemon, Eggs',3),(7,'French Onion Soup','starter','Onions, Beef Broth, Cheese, Bread, Butter',2),(8,'Lasagna','main_course','Lasagna Noodles, Beef, Tomato Sauce, Cheese, Onion, Garlic',8),(9,'Apple Pie','dessert','Apples, Flour, Butter, Sugar, Cinnamon, Nutmeg',3),(10,'Chicken Curry','main_course','Chicken, Curry Powder, Coconut Milk, Onion, Garlic, Ginger',7),(12,'Pancakes','dessert','Flour, Milk, Eggs, Sugar, Butter, Maple Syrup',6),(13,'Garlic Bread','starter','Bread, Garlic, Butter, Parsley',2),(15,'Fruit Salad','dessert','Strawberries, Blueberries, Kiwi, Orange, Mint',3),(18,'Tiramisu','dessert','Mascarpone, Coffee, Ladyfingers, Cocoa, Sugar',3),(51,'alisdd','dessert','sqdfg nonl',34),(55,'Nouvelle Recette 543','Dessert','Sucre, Farine, Œufs',3),(64,'Nouvelle receette3','Dessert','Sucre, Farine, Œufs',3),(66,'Grilled Salmon','Main Course','Salmon, Olive Oil, Lemon, Salt, Pepper, Herbs',54),(67,'Caesar Salad','Salad','Lettuce, Parmesan, Croutons, Caesar Dressing',57),(68,'Vegetable Soup','Soup','Carrots, Potatoes, Onions, Celery, Broth',56),(69,'Beef Burger','Main Course','Ground Beef, Bun, Lettuce, Tomato, Cheese',60),(70,'Margherita Pizza','Pizza','Pizza Dough, Tomato Sauce, Mozzarella, Basil',59),(71,'Fruit Smoothie','Drink','Banana, Strawberries, Yogurt, Honey, Ice',62),(72,'Garlic Mashed Potatoes','Side Dish','Potatoes, Garlic, Butter, Milk',55),(73,'French Fries','Side Dish','Potatoes, Salt, Oil',55),(74,'Chocolate Brownie','Dessert','Flour, Cocoa, Butter, Sugar, Eggs',61),(75,'Vegan Tacos','Vegan','Tortilla, Black Beans, Corn, Avocado, Salsa',66),(76,'Vegetarian Lasagna','Vegetarian','Lasagna Noodles, Tomato Sauce, Spinach, Cheese',67),(77,'BBQ Ribs','BBQ','Pork Ribs, BBQ Sauce, Spices',69),(78,'Grilled Chicken Skewers','Grill','Chicken, Peppers, Onions, Spices, Olive Oil',58),(79,'Shrimp Scampi','Seafood','Shrimp, Garlic, Butter, Lemon, Parsley',65),(80,'Omelette','Breakfast','Eggs, Cheese, Ham, Onions, Peppers',64),(81,'Gluten-Free Bread','Gluten-Free','Gluten-Free Flour, Yeast, Water, Salt',68),(82,'Pesto Pasta','Main Course','Pasta, Pesto, Parmesan, Olive Oil',54),(83,'Tomato Soup','Soup','Tomatoes, Basil, Onion, Garlic, Broth',56),(84,'Chicken Caesar Wrap','Sandwich','Tortilla, Chicken, Caesar Dressing, Lettuce',60),(85,'Mango Sorbet','Dessert','Mango, Sugar, Lemon Juice, Water',61),(86,'BBQ Chicken Wings','BBQ','Chicken Wings, BBQ Sauce, Spices',69),(87,'Grilled Vegetables','Grill','Zucchini, Eggplant, Peppers, Olive Oil, Spices',58),(88,'Seafood Paella','Seafood','Rice, Shrimp, Mussels, Peppers, Saffron',65),(89,'Falafel','Vegan','Chickpeas, Garlic, Parsley, Spices',66),(90,'Quinoa Salad','Vegetarian','Quinoa, Cucumber, Tomato, Feta, Lemon Dressing',67),(91,'Pineapple Juice','Drink','Pineapple, Water, Sugar',62),(92,'Grilled Cheese Sandwich','Sandwich','Bread, Cheese, Butter',60),(93,'Apple Crumble','Dessert','Apples, Sugar, Butter, Flour, Oats',61),(94,'Spaghetti Carbonara','Main Course','Spaghetti, Bacon, Eggs, Parmesan, Pepper',54);
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-09 21:30:10

CREATE DATABASE  IF NOT EXISTS `an` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `an`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: an
-- ------------------------------------------------------
-- Server version	5.5.5-10.2.6-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `food` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(200) NOT NULL,
  `PHOTO` varchar(500) NOT NULL,
  `MIN_PHOTO` varchar(500) NOT NULL,
  `MED_PHOTO` varchar(500) NOT NULL,
  `MAX_PHOTO` varchar(500) NOT NULL,
  `PROTEINS` double NOT NULL,
  `CARBON_HYDRATES` double NOT NULL,
  `LIPIDS` double NOT NULL,
  `KCAL` double NOT NULL,
  `V_A` double NOT NULL,
  `V_D` double NOT NULL,
  `V_E` double NOT NULL,
  `V_C` double NOT NULL,
  `CALCIUM` double NOT NULL,
  `IRON` double NOT NULL,
  `MAGNESIUM` double NOT NULL,
  `PHOSPHORUS` double NOT NULL,
  `POTASSIUM` double NOT NULL,
  `SODIUM` double NOT NULL,
  `CHOLESTEROL` double NOT NULL,
  `SATURATED` double NOT NULL,
  `MIN_AMOUNT` double NOT NULL,
  `MED_AMOUNT` double NOT NULL,
  `MAX_AMOUNT` double NOT NULL,
  `CREATETIME` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (17,'Leche de vaca desnatada','/static/img/foods/milk_625x300_41416559876.jpg','/static/img/foods/tazaleche.jpg','/static/img/foods/vaso.png','/static/img/foods/cuenco.jpg',3.89,4.9,0.2,37,1,1.7,1,0,120.9,0.09,28.6,0,150,53,2.6,0.091,0.5,2,2.5,'2017-08-29 18:01:47'),(20,'Test','/static/img/foods/breakfast1502836076831.jpg','/static/img/foods/breakfast1502836076831.jpg','/static/img/foods/pizza61502836076831.png','/static/img/foods/pizza_margarita1502836076831.jpg',234,24234,234,234,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'2017-08-15 22:27:56'),(21,'hyhndsfhn','/static/img/foods/pizza61502893429201.png','/static/img/foods/oreo1502893429201.jpg','/static/img/foods/oreo1502893429201.jpg','/static/img/foods/patata1502893429201.jpg',245,2345,234,0,0,0,0,0,0,0,0,0,0,0,0,0,123,123,234,'2017-08-16 14:23:49'),(22,'n yun ykmn76ik','/static/img/foods/breakfast.jpg','/static/img/foods/background_login.jpg','/static/img/foods/498601900_xs.jpg','/static/img/foods/galleta_maria.gif',467,467,467,0,0,0,0,0,0,0,0,0,0,0,4,0,1,2,3,'2017-08-16 14:25:36'),(23,'Pizza margarita','/static/img/foods/pizza_margarita.jpg','/static/img/foods/portion.jpg','/static/img/foods/half.jpg','/static/img/foods/pizza6.png',8.2,22.2,7.79,195,90,3,1,0,118,1.3,19,0,201,520,16,4.3,0.25,0.75,1.2,'2017-08-16 14:02:37'),(25,'oreo','/static/img/foods/oreo1502895340814.jpg','/static/img/foods/oreo1502895340814.jpg','/static/img/foods/oreo1502895340814.jpg','/static/img/foods/oreo1502895340814.jpg',35,345,2345,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,'2017-08-16 14:55:40'),(26,'wtbverbyjun','/static/img/foods/milk_625x300_414165598761504026918953.jpg','/static/img/foods/oreo1504026918953.jpg','/static/img/foods/patata1504026918953.jpg','/static/img/foods/half1504026918953.jpg',245,235,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'2017-08-29 17:15:18'),(27,'Agua','/static/img/foods/glass_water.jpg','/static/img/foods/glass_water.jpg','/static/img/foods/glass_water.jpg','/static/img/foods/glass_water.jpg',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,'2017-08-29 17:38:36');
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-08-30 17:17:19

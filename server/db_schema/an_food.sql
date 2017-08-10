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
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (17,'Leche de vaca desnatada','/static/img/foods/milk_625x300_41416559876.jpg','/static/img/foods/tazaleche.jpg','/static/img/foods/vaso.png','/static/img/foods/cuenco.jpg',3.89,4.9,0.2,37,1,1.7,1,0,120.9,0.09,28.6,0,150,53,2.6,0.09,0,0,0),(18,'Pizza margarita ','/static/img/foods/pizza_margarita.jpg','/static/img/foods/portion.jpg','/static/img/foods/half.jpg','/static/img/foods/pizza6.png',8.2,22.2,7.79,195,90,3,1,0,118,1.3,19,0,201,520,16,4.3,0.7,2.2,4.4);
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

-- Dump completed on 2017-08-10 18:50:05

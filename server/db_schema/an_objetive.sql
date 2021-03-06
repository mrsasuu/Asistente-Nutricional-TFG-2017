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
-- Table structure for table `objetive`
--

DROP TABLE IF EXISTS `objetive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `objetive` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NUTRITIONIST_ID` int(11) NOT NULL,
  `PATIENT_ID` int(11) NOT NULL,
  `FOOD_ID` int(11) NOT NULL,
  `AMOUNT` double NOT NULL,
  `START_DATE` date NOT NULL,
  `END_DATE` date NOT NULL,
  `COMPLETED` int(11) NOT NULL,
  `FOODHOUR` varchar(45) DEFAULT NULL,
  `PROGRESS` double NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objetive`
--

LOCK TABLES `objetive` WRITE;
/*!40000 ALTER TABLE `objetive` DISABLE KEYS */;
INSERT INTO `objetive` VALUES (22,1,2,17,2,'2017-08-07','2017-08-10',1,NULL,3),(26,1,2,17,1,'2017-08-10','2017-08-12',0,NULL,0),(27,1,5,17,1,'2017-08-08','2017-08-11',1,NULL,4),(29,1,5,17,3,'2017-08-12','2017-08-14',1,'DESAYUNO',4),(31,1,13,17,1,'2017-08-08','2017-08-10',1,'DESAYUNO',4),(32,1,13,17,1,'2017-08-11','2017-08-13',0,'DESAYUNO',0);
/*!40000 ALTER TABLE `objetive` ENABLE KEYS */;
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

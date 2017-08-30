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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(190) NOT NULL DEFAULT 'UNIQUE',
  `PASSWORD` varchar(500) NOT NULL,
  `NAME` varchar(200) NOT NULL,
  `SURNAME` varchar(200) NOT NULL,
  `PHOTO` varchar(500) DEFAULT NULL,
  `RESET_TOKEN` varchar(500) DEFAULT NULL,
  `FAIL_LOGIN` int(11) DEFAULT NULL,
  `ADMIN` int(11) NOT NULL,
  `SUPER_ADMIN` int(11) NOT NULL,
  `ACTIVE` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `EMAIL` (`EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'mrsasuu@gmail.com','43bd20e24c2eadbf3034ee65e761a5f18e01f71d','Antonio Javier','Benítez Guijarro','/static/img/users/fotoperfil.png','',1,1,1,1),(8,'pepa@gmail.com','43bd20e24c2eadbf3034ee65e761a5f18e01f71d','carlos','wrfwefwerf','/static/img/users/logo.png','',0,1,0,1),(9,'mrsas23e23euu@gmail.com','43bd20e24c2eadbf3034ee65e761a5f18e01f71d','2s23s2','s2s2s2es','/static/img/users/splashscreen.jpg','',0,0,0,1),(11,'test@hotmail.com','a94a8fe5ccb19ba61c4c0873d391e987982fbbd3','test','test','/static/img/users/inugwuu1499388185110.gif','',0,1,0,1),(12,'asistente@test.es','55e5b6b1299763ee823c9648c03637dac1235563','Asistente Test','Test','/static/img/users/498601900_xs.jpg','',0,1,1,1),(14,'asistente@as.es','55e5b6b1299763ee823c9648c03637dac1235563','Asistente','Test','/static/img/users/carlos.jpg','',1,1,1,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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

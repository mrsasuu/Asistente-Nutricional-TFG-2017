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
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DNI` varchar(50) NOT NULL,
  `NAME` varchar(200) NOT NULL,
  `SURNAME` varchar(400) NOT NULL,
  `AGE` int(11) NOT NULL,
  `GENDER` int(11) NOT NULL,
  `ADDRESS` varchar(300) NOT NULL,
  `PHONE` int(11) NOT NULL,
  `EMAIL` varchar(190) NOT NULL,
  `USERNAME` varchar(100) NOT NULL,
  `PASSWORD` varchar(500) NOT NULL,
  `WEIGHT` int(11) NOT NULL,
  `HEIGHT` int(11) NOT NULL,
  `ACTIVITY_LEVEL` int(11) NOT NULL,
  `RESET_TOKEN` varchar(500) DEFAULT NULL,
  `NEWS` int(11) NOT NULL,
  `NUTRICIONIST_ID` int(11) NOT NULL,
  `PHOTO` varchar(500) DEFAULT NULL,
  `TOKEN` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `DNI` (`DNI`),
  UNIQUE KEY `EMAIL` (`EMAIL`),
  UNIQUE KEY `PHONE_UNIQUE` (`PHONE`),
  UNIQUE KEY `USERNAME_UNIQUE` (`USERNAME`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'75571654W','Antonio','Benítez Guijarro',21,0,'C/ Imperio 32',648899446,'mrsasuu@gmail.com','mrsasuu','pepito11',72,178,2,NULL,0,8,NULL,NULL),(2,'75571653W','Juan','Hernández Pozo',67,0,'C/ Jamaica 54',958784455,'mrsasuu2@gmail.com','juancho','pepito11',80,165,0,NULL,0,1,NULL,NULL),(5,'75545632K','Pepa','Del Río Montes',57,1,'Av/ Cervantes 24',958899663,'pepapig@gmail.com','pepita','43bd20e24c2eadbf3034ee65e761a5f18e01f71d',65,170,2,'',0,1,NULL,NULL),(6,'12344325X','Angel','Ceballos Pérez',62,0,'C/ Elvira 12',965432234,'angelito@hotmail.com','angel','43bd20e24c2eadbf3034ee65e761a5f18e01f71d',52,157,1,'',0,1,NULL,NULL),(7,'89765465P','Carmen','López López',45,1,'c/ Pedro Antonio de Alarcón 23',678546372,'carmenLL@gmail.com','carmen','43bd20e24c2eadbf3034ee65e761a5f18e01f71d',45,155,1,'',0,1,NULL,NULL),(8,'12345678E','Test ','test',56,1,'test',123123,'test@ges.es','edesed','43bd20e24c2eadbf3034ee65e761a5f18e01f71d',123,123,0,'',0,1,NULL,NULL),(9,'Ghcrhg','Vxgvx','Vfhcf',25,0,'Gzfh',550468,'hfth@jgvb.j','Hgbuh','b22cb4c4aa76bb1caeedb5cece8be25b1a0eacfb',54287,5852,0,'',0,11,NULL,NULL),(10,'96634587D','Carlos','Del Pino Molinos',22,0,'C/ Molinos 12',698756412,'carlos@gmail.com','Carlos','43bd20e24c2eadbf3034ee65e761a5f18e01f71d',72,185,3,'',0,1,NULL,NULL),(11,'74123654T','Carlos','Ureña Sánchez',67,0,'Calle Cuba 12',632145789,'carlitos@hotmail.com','Carlitos','43bd20e24c2eadbf3034ee65e761a5f18e01f71d',88,167,0,'',0,14,NULL,NULL),(12,'41234567D','Aurora','Pedrajas Molina',37,1,'Calle Monachil 9',958745632,'aurora@hotmail.com','aurora','43bd20e24c2eadbf3034ee65e761a5f18e01f71d',67,162,1,'',0,14,NULL,NULL),(14,'etgwetg','test23','webw',234,0,'ewb',546456846,'webwreb@gbrvgb.es','pepito11','dfa607d40045e66cce578df67c6d988b7690d304',234,234,1,'',0,1,NULL,'b9ef0e1e537d12ac0f713a520797bce57fef6777d4b3b60f331a8a1c6328116e7dacb94dfca70c3e6cbd7dc7abfc7d2f37e197076ec9f02d6726cbcfc8a7ae4a'),(16,'24r2','ereverv','erfe',2424,1,'2342df23',234234234,'efcvevergerg@eese.es','pepitotest','f7c3bc1d808e04732adf679965ccc34ca7ae3441',234,234,1,'',0,1,NULL,'fb7ddef77802eac2448a1e2d1cf2c52a8da9af1785ac0526437eb853a9fe81a2fd268bda8b252fc30843829c50eb8bad4c2f9f3a17a6a0df22a3904c78777055');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-08-30 17:17:18

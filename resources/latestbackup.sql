-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: intranet
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `announcement`
--

DROP TABLE IF EXISTS `announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(100) NOT NULL,
  `department` varchar(200) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(300) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `notify` varchar(5) NOT NULL,
  `companyId` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `companyId` (`companyId`),
  KEY `company_name` (`company_name`),
  CONSTRAINT `announcement_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companymanagement` (`id`) ON DELETE CASCADE,
  CONSTRAINT `announcement_ibfk_2` FOREIGN KEY (`company_name`) REFERENCES `companymanagement` (`company_name`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcement`
--

LOCK TABLES `announcement` WRITE;
/*!40000 ALTER TABLE `announcement` DISABLE KEYS */;
INSERT INTO `announcement` VALUES (1,'Brightcomgroup India','management,software','Test (edited)','test0 (edited)','2024-02-02','2024-02-04','no','ca4dda03-1f2c-48ea-a596-7eda79901d67'),(3,'Brightcomgroup India','management','Reminder Testing0','test 0','2024-02-02','2024-02-06','yes','ca4dda03-1f2c-48ea-a596-7eda79901d67'),(4,'Brightcomgroup India','software,accounts','Reminder Testing1','test1','2024-02-02','2024-02-06','yes','ca4dda03-1f2c-48ea-a596-7eda79901d67');
/*!40000 ALTER TABLE `announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applyleaves`
--

DROP TABLE IF EXISTS `applyleaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applyleaves` (
  `no` int NOT NULL AUTO_INCREMENT,
  `id` varchar(40) NOT NULL,
  `mail_approved_by` varchar(100) NOT NULL,
  `cc_mail` varchar(300) NOT NULL,
  `leave_type` varchar(30) NOT NULL,
  `leave_option` varchar(30) NOT NULL,
  `from_date` varchar(10) NOT NULL,
  `to_date` varchar(10) NOT NULL,
  `selected_dates` varchar(300) NOT NULL,
  `half_day` varchar(10) NOT NULL,
  `total_leaves` float NOT NULL,
  `reason` varchar(300) NOT NULL,
  `status` varchar(30) NOT NULL,
  `emp_id` int NOT NULL,
  `applicant_name` varchar(150) NOT NULL,
  `applicant_email` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `no` (`no`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `applyleaves_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `usermanagement` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applyleaves`
--

LOCK TABLES `applyleaves` WRITE;
/*!40000 ALTER TABLE `applyleaves` DISABLE KEYS */;
INSERT INTO `applyleaves` VALUES (1,'395bd73b-9ef5-46ef-9c0e-ba5e6358e0bc','dibyakantid@brightcomgroup.com','','Casual','NA','2024-01-02','2024-01-02','2024-01-02','',1,'sick','approved',1250,'Akash Dandge','akashd@brightcomgroup.com'),(2,'397cc680-ab87-4ec9-bdeb-ae19a9a6023a','dibyakantid@brightcomgroup.com','','Casual','NA','','','','2024-02-19',0.5,'test','approved',1250,'Akash Dandge','akashd@brightcomgroup.com'),(3,'51d44c15-a1ff-480d-ab76-c1d3a45fdfcf','dibyakantid@brightcomgroup.com','','Casual','NA','','','','2024-01-19',0.5,'test0','approved',1250,'Akash Dandge','akashd@brightcomgroup.com'),(4,'5918d80d-274a-4c96-b5e7-f8c4ab0a6f07','dibyakantid@brightcomgroup.com','','Casual','NA','','','','2024-02-05',0.5,'test1','approved',1250,'Akash Dandge','akashd@brightcomgroup.com');
/*!40000 ALTER TABLE `applyleaves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int NOT NULL,
  `pdate` varchar(10) NOT NULL,
  `firstin` float NOT NULL,
  `lastout` float NOT NULL,
  `status` varchar(5) NOT NULL,
  `totalhrs` float NOT NULL,
  `updated_status` varchar(5) NOT NULL DEFAULT 'AA',
  PRIMARY KEY (`id`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `usermanagement` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=260 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,1250,'2023-11-26',0,0,'WH',0,'WH'),(2,1250,'2023-11-27',9.25,19.11,'XX',9.46,'XX'),(3,1250,'2023-11-28',9.22,18.3,'XX',9.08,'XX'),(4,1250,'2023-11-29',9.01,16,'XA',6.59,'XX'),(5,1250,'2023-11-30',0,0,'HH',0,'AA'),(6,1250,'2023-12-01',9.13,18.33,'XX',9.2,'XX'),(7,1250,'2023-12-02',0,0,'WH',0,'WH'),(8,1250,'2023-12-03',0,0,'WH',0,'WH'),(9,1250,'2023-12-04',0,0,'AA',0,'AA'),(10,1250,'2023-12-05',9.11,18.32,'XX',9.21,'XX'),(12,1250,'2023-12-07',9.2,18.23,'XA',9.03,'XX'),(13,1250,'2023-12-08',0,0,'AA',0,'AA'),(14,1250,'2023-12-09',0,0,'WH',0,'WH'),(15,1250,'2023-12-10',0,0,'WH',0,'WH'),(16,1250,'2023-12-11',9.42,18.46,'XX',9.04,'XX'),(17,1250,'2023-12-12',9.15,18.52,'XX',9.37,'XX'),(18,1250,'2023-12-13',10.22,19.18,'XX',8.56,'XX'),(19,1250,'2023-12-14',9.42,20.03,'XX',10.21,'XX'),(20,1250,'2023-12-15',9.32,18.1,'XX',8.38,'XX'),(21,1250,'2023-12-16',0,0,'WH',0,'WH'),(22,1250,'2023-12-17',0,0,'WH',0,'WH'),(23,1250,'2023-12-18',9.3,15.53,'XA',6.23,'XX'),(24,1250,'2023-12-19',9.56,19.16,'XX',9.2,'XX'),(25,1250,'2023-12-20',9.22,20.25,'XX',11.03,'XX'),(26,1250,'2023-12-21',9.05,18.18,'XX',9.13,'XX'),(27,1250,'2023-12-22',9.22,16.48,'XA',7.26,'XX'),(28,1250,'2023-12-23',0,0,'WH',0,'WH'),(29,1250,'2023-12-24',0,0,'WH',0,'WH'),(30,1250,'2023-12-25',0,0,'HH',0,'AA'),(31,1250,'2023-12-26',9.09,18.27,'XX',9.18,'XX'),(183,1250,'2023-12-06',9.09,18.27,'XX',9.18,'XX'),(184,1250,'2023-12-27',9.11,18.13,'XX',9.02,'XX'),(185,1250,'2023-12-28',9.28,18.42,'XX',9.14,'XX'),(186,1250,'2023-12-29',9.19,18.04,'XX',8.45,'XX'),(187,1250,'2023-12-30',0,0,'AA',0,'WH'),(188,1250,'2023-12-31',0,0,'WH',0,'WH'),(189,1250,'2024-01-01',0,0,'HH',0,'AA'),(190,1250,'2024-01-02',0,0,'AA',0,'EL'),(191,1250,'2024-01-03',9.34,19.28,'XX',9.54,'XX'),(192,1250,'2024-01-04',9.12,18.36,'XX',9.24,'XX'),(193,1250,'2024-01-05',9.36,18.19,'XX',8.43,'XX'),(194,1250,'2024-01-06',0,0,'WH',0,'WH'),(195,1250,'2024-01-07',0,0,'WH',0,'WH'),(196,1250,'2024-01-08',9.29,18.35,'XX',9.06,'XX'),(197,1250,'2024-01-09',9.18,18.36,'XX',9.18,'XX'),(198,1250,'2024-01-10',9.21,18.2,'XX',8.59,'XX'),(199,1250,'2024-01-11',9.42,18.27,'XX',8.45,'XX'),(200,1250,'2024-01-12',9.11,17.58,'XX',8.47,'XX'),(201,1250,'2024-01-13',0,0,'WH',0,'WH'),(202,1250,'2024-01-14',0,0,'WH',0,'WH'),(203,1250,'2024-01-15',0,0,'HH',0,'AA'),(204,1250,'2024-01-16',9.17,18.14,'XX',8.57,'XX'),(205,1250,'2024-01-17',9.09,18.27,'XX',9.18,'XX'),(206,1250,'2024-01-18',9.36,19.16,'XX',9.4,'XX'),(207,1250,'2024-01-19',9.47,16.28,'XA',6.41,'XL'),(208,1250,'2024-01-20',0,0,'WH',0,'WH'),(209,1250,'2024-01-21',0,0,'WH',0,'WH'),(210,1250,'2024-01-22',9.33,19.4,'XX',10.07,'XX'),(211,1250,'2024-01-23',9.38,18.24,'XX',8.46,'XX'),(212,1250,'2024-01-24',9.29,18.35,'XX',9.06,'XX'),(213,1250,'2024-01-25',9.16,18.49,'XX',9.33,'XX'),(214,1250,'2024-01-26',0,0,'HH',0,'AA'),(215,1250,'2024-01-27',0,0,'WH',0,'WH'),(216,1250,'2024-01-28',0,0,'WH',0,'WH'),(217,1250,'2024-01-29',9.32,18.07,'XX',8.35,'XX'),(218,1250,'2024-01-30',9.35,18.59,'XX',9.24,'XX'),(219,1250,'2024-01-31',9.36,18.56,'XX',9.2,'XX'),(220,1250,'2024-02-01',9.38,19,'XX',9.22,'XX'),(221,1250,'2024-02-02',9.25,18.53,'XX',9.28,'XX'),(222,1250,'2024-02-03',0,0,'WH',0,'WH'),(223,1250,'2024-02-04',0,0,'WH',0,'WH'),(224,1250,'2024-02-05',9.34,13.3,'AA',3.56,'XL'),(225,1250,'2024-02-06',9.4,18.38,'XX',8.58,'XX'),(226,1250,'2024-02-07',9.35,18.38,'XX',9.03,'XX'),(227,1250,'2024-02-08',9.37,19.46,'XX',10.09,'XX'),(228,1250,'2024-02-09',9.21,18.13,'XX',8.52,'XX'),(229,1250,'2024-02-10',18.08,18.11,'WH',0.03,'WH'),(230,1250,'2024-02-11',0,0,'WH',0,'WH'),(231,1250,'2024-02-12',9.25,18.42,'XX',9.17,'XX'),(232,1250,'2024-02-13',9.4,18.41,'XX',9.01,'XX'),(233,1250,'2024-02-14',9.24,19.28,'XX',10.04,'XX'),(234,1250,'2024-02-15',9.29,19.13,'XX',9.44,'XX'),(235,1250,'2024-02-16',9.28,16.25,'XA',6.57,'XX'),(236,1250,'2024-02-17',0,0,'WH',0,'WH'),(237,1250,'2024-02-18',0,0,'WH',0,'WH'),(238,1250,'2024-02-19',0,0,'AA',0,'XL'),(239,1250,'2024-02-20',0,0,'AA',0,'AA'),(240,1250,'2024-02-21',0,0,'AA',0,'AA'),(241,1250,'2024-02-22',0,0,'AA',0,'AA'),(242,1250,'2024-02-23',0,0,'AA',0,'AA'),(243,1250,'2024-02-24',0,0,'WH',0,'WH'),(244,1250,'2024-02-25',0,0,'WH',0,'WH'),(245,1250,'2024-02-26',9.18,18.4,'XX',9.22,'XX'),(246,1250,'2024-02-27',9.5,10.32,'AA',0.42,'AA'),(247,1250,'2024-02-28',9.54,18.44,'XX',8.5,'XX'),(248,1250,'2024-02-29',9.07,18.59,'XX',9.52,'XX'),(249,1250,'2024-03-01',9.05,19.09,'XX',10.04,'XX'),(250,1250,'2024-03-02',0,0,'WH',0,'WH'),(251,1250,'2024-03-03',0,0,'WH',0,'WH'),(252,1250,'2024-03-04',9.39,18.39,'XX',9,'XX'),(253,1250,'2024-03-05',9.11,18.55,'XX',9.44,'XX'),(254,1250,'2024-03-06',9.38,18.14,'XX',8.36,'XX'),(255,1250,'2024-03-07',8.57,18.42,'XX',9.45,'XX'),(256,1250,'2024-03-08',0,0,'HH',0,'AA'),(257,1250,'2024-03-09',0,0,'WH',0,'WH'),(258,1250,'2024-03-10',0,0,'WH',0,'WH'),(259,1250,'2024-03-11',9.03,18.5,'XX',9.47,'XX');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `balanceleaves`
--

DROP TABLE IF EXISTS `balanceleaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `balanceleaves` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int NOT NULL,
  `credit` float NOT NULL DEFAULT '0',
  `debit` float NOT NULL DEFAULT '0',
  `date` date NOT NULL,
  `total_leaves` float NOT NULL,
  `reference` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `balanceleaves_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `usermanagement` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `balanceleaves`
--

LOCK TABLES `balanceleaves` WRITE;
/*!40000 ALTER TABLE `balanceleaves` DISABLE KEYS */;
INSERT INTO `balanceleaves` VALUES (1,1,20,0,'2024-01-01',20,'Annual Leaves'),(2,1196,20,0,'2024-01-01',20,'Annual Leaves'),(3,1247,20,0,'2024-01-01',20,'Annual Leaves'),(4,1248,20,0,'2024-01-01',20,'Annual Leaves'),(5,1249,20,0,'2024-01-01',20,'Annual Leaves'),(6,1250,20,0,'2024-01-01',20,'Annual Leaves'),(7,1252,20,0,'2024-01-01',20,'Annual Leaves'),(8,1255,20,0,'2024-01-01',20,'Annual Leaves'),(9,1196,2,0,'2024-03-04',22,'month add on'),(10,1,1,0,'2024-03-05',21,'test'),(11,1196,1,0,'2024-03-05',23,'test'),(12,1247,1,0,'2024-03-05',21,'test'),(13,1248,1,0,'2024-03-05',21,'test'),(14,1249,1,0,'2024-03-05',21,'test'),(15,1250,1,0,'2024-03-05',21,'test'),(16,1252,1,0,'2024-03-05',21,'test'),(17,1255,1,0,'2024-03-05',21,'test');
/*!40000 ALTER TABLE `balanceleaves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companymanagement`
--

DROP TABLE IF EXISTS `companymanagement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companymanagement` (
  `id` varchar(40) NOT NULL,
  `company_logo` varchar(300) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `company_email` varchar(50) NOT NULL,
  `company_address` varchar(300) NOT NULL,
  `company_website` varchar(200) NOT NULL,
  `company_contact_no` varchar(50) NOT NULL,
  `company_status` varchar(20) NOT NULL,
  `serial_no` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_name` (`company_name`),
  UNIQUE KEY `serial_no` (`serial_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companymanagement`
--

LOCK TABLES `companymanagement` WRITE;
/*!40000 ALTER TABLE `companymanagement` DISABLE KEYS */;
INSERT INTO `companymanagement` VALUES ('2459b4a5-0db6-4931-a9eb-f3a9519729a7','\\companyLogos\\file_1710151480478.PNG','Lil Projects','mahisoft2020@gmail.com','Floor: 5, Fairfield by Marriott, Road No:2, Nanakramguda,\nGachibowli, Hyderabad–32, Telangana, India.','https://www.lilprojects.in/','+91 40 6744 9910','active',8),('ca4dda03-1f2c-48ea-a596-7eda79901d67','\\companyLogos\\file_1709551283431.png','Brightcomgroup India','brightcomgroup@gmail.com','Floor : 5, Fairfield By Marriott Road No. 2, Nanakramguda, Gachibowli, Hyderabad, Telangana 500032','www.bcg.com','+917387591037','active',5);
/*!40000 ALTER TABLE `companymanagement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companypagesmanagement`
--

DROP TABLE IF EXISTS `companypagesmanagement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companypagesmanagement` (
  `no` int NOT NULL AUTO_INCREMENT,
  `id` varchar(40) NOT NULL,
  `company_name` varchar(200) NOT NULL,
  `company_pagename` varchar(100) NOT NULL,
  `company_pagetype` varchar(500) NOT NULL,
  `company_pagestatus` varchar(20) NOT NULL,
  `companyId` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `no` (`no`),
  KEY `companyId` (`companyId`),
  KEY `company_name` (`company_name`),
  CONSTRAINT `companypagesmanagement_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companymanagement` (`id`) ON DELETE CASCADE,
  CONSTRAINT `companypagesmanagement_ibfk_2` FOREIGN KEY (`company_name`) REFERENCES `companymanagement` (`company_name`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companypagesmanagement`
--

LOCK TABLES `companypagesmanagement` WRITE;
/*!40000 ALTER TABLE `companypagesmanagement` DISABLE KEYS */;
INSERT INTO `companypagesmanagement` VALUES (6,'4aca7753-3fbb-48e7-9259-19038b8b908b','Brightcomgroup India','Address for Communication','Address','active','ca4dda03-1f2c-48ea-a596-7eda79901d67'),(10,'4e764e5d-42ed-441d-8eee-190c7df764b5','Lil Projects','Address for Communication','Address','active','2459b4a5-0db6-4931-a9eb-f3a9519729a7'),(7,'5af3110e-af33-486e-bf31-b57a68607d05','Brightcomgroup India','Organizational Chart','Chart','active','ca4dda03-1f2c-48ea-a596-7eda79901d67'),(8,'b08d8ed2-6240-4510-aa56-19be5932b83c','Brightcomgroup India','Holiday List','Holidays','active','ca4dda03-1f2c-48ea-a596-7eda79901d67'),(9,'e26da42e-0f89-449e-95df-57b59e647c57','Brightcomgroup India','Holiday List','Holidays','active','ca4dda03-1f2c-48ea-a596-7eda79901d67');
/*!40000 ALTER TABLE `companypagesmanagement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactinformation`
--

DROP TABLE IF EXISTS `contactinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactinformation` (
  `address` varchar(300) NOT NULL,
  `zip_code` int NOT NULL,
  `home_phone` varchar(20) NOT NULL,
  `home_phone_ext` varchar(10) NOT NULL,
  `office_phone` varchar(20) NOT NULL,
  `office_phone_ext` varchar(10) NOT NULL,
  `mobile1` varchar(20) NOT NULL,
  `mobile2` varchar(20) NOT NULL,
  `mobile3` varchar(20) NOT NULL,
  `mobile4` varchar(20) NOT NULL,
  `mobile5` varchar(20) NOT NULL,
  `msn` varchar(100) NOT NULL,
  `aol` varchar(100) NOT NULL,
  `skype` varchar(100) NOT NULL,
  `yahoo` varchar(100) NOT NULL,
  `gtalk` varchar(100) NOT NULL,
  `emp_id` int NOT NULL,
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `contactinformation_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `usermanagement` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactinformation`
--

LOCK TABLES `contactinformation` WRITE;
/*!40000 ALTER TABLE `contactinformation` DISABLE KEYS */;
/*!40000 ALTER TABLE `contactinformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designation`
--

DROP TABLE IF EXISTS `designation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designation` (
  `id` int NOT NULL,
  `designationtitle` varchar(255) DEFAULT NULL,
  `description` text,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designation`
--

LOCK TABLES `designation` WRITE;
/*!40000 ALTER TABLE `designation` DISABLE KEYS */;
/*!40000 ALTER TABLE `designation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `familyinformation`
--

DROP TABLE IF EXISTS `familyinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familyinformation` (
  `spouse_name` varchar(50) NOT NULL,
  `no_of_kids` int NOT NULL,
  `kids_names` varchar(300) NOT NULL,
  `anniversary_date` date DEFAULT NULL,
  `blood_group` varchar(20) NOT NULL,
  `emp_id` int NOT NULL,
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `familyinformation_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `usermanagement` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familyinformation`
--

LOCK TABLES `familyinformation` WRITE;
/*!40000 ALTER TABLE `familyinformation` DISABLE KEYS */;
/*!40000 ALTER TABLE `familyinformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funinformation`
--

DROP TABLE IF EXISTS `funinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funinformation` (
  `favorite_movie` varchar(100) NOT NULL,
  `favorite_place` varchar(100) NOT NULL,
  `favorite_sport` varchar(100) NOT NULL,
  `favorite_food` varchar(100) NOT NULL,
  `favorite_actor` varchar(100) NOT NULL,
  `favorite_actress` varchar(100) NOT NULL,
  `quote` varchar(300) NOT NULL,
  `good_quality` varchar(500) NOT NULL,
  `bad_quality` varchar(300) NOT NULL,
  `emp_id` int NOT NULL,
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `funinformation_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `usermanagement` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funinformation`
--

LOCK TABLES `funinformation` WRITE;
/*!40000 ALTER TABLE `funinformation` DISABLE KEYS */;
INSERT INTO `funinformation` VALUES ('','office','','','','','','','',1252);
/*!40000 ALTER TABLE `funinformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `intro`
--

DROP TABLE IF EXISTS `intro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `intro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=416 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `intro`
--

LOCK TABLES `intro` WRITE;
/*!40000 ALTER TABLE `intro` DISABLE KEYS */;
INSERT INTO `intro` VALUES (1,1250),(2,1250),(3,1250),(4,1250),(5,1250),(6,1250),(7,1250),(8,1250),(9,1250),(10,1250),(11,1250),(12,1250),(13,1250),(14,1250),(15,1250),(16,1250),(17,1250),(18,1250),(19,1249),(20,NULL),(21,1249),(22,1249),(23,1250),(24,1250),(25,1250),(26,1250),(27,1250),(28,1250),(29,1250),(30,1249),(31,1250),(32,1250),(33,1250),(34,1250),(35,1250),(36,1249),(37,1250),(38,1250),(39,1250),(40,1250),(41,1250),(42,1250),(43,1250),(44,1250),(45,1250),(46,1250),(47,1250),(48,1250),(49,1250),(50,1250),(51,1250),(52,1250),(53,1249),(54,1250),(55,1250),(56,1250),(57,1250),(58,1250),(59,1250),(60,1249),(61,1250),(62,1250),(63,1249),(64,1250),(65,1250),(66,1250),(67,1250),(68,1250),(69,1250),(70,1250),(71,1250),(72,1250),(73,1250),(74,1250),(75,1250),(76,1250),(77,1250),(78,1250),(79,1250),(80,1250),(81,1250),(82,1250),(83,1250),(84,1250),(85,1250),(86,1250),(87,1250),(88,1250),(89,1250),(90,1250),(91,1250),(92,1250),(93,1250),(94,1250),(95,1250),(96,1249),(97,1249),(98,1249),(99,1250),(100,1249),(101,1249),(102,1250),(103,1249),(104,1249),(105,1249),(106,1250),(107,1250),(108,1250),(109,1250),(110,1250),(111,1250),(112,1250),(113,1250),(114,1250),(115,1250),(116,1250),(117,1250),(118,1250),(119,1250),(120,1250),(121,1250),(122,1250),(123,1250),(124,1249),(125,1249),(126,1249),(127,1249),(128,1250),(129,1250),(130,1250),(131,1250),(132,1250),(133,1250),(134,1250),(135,1250),(136,1250),(137,1250),(138,1249),(139,1250),(140,1249),(141,1250),(142,1250),(143,1250),(144,1252),(145,1252),(146,1250),(147,1250),(148,1250),(149,1250),(150,1250),(151,1255),(152,1250),(153,1255),(154,1250),(155,1250),(156,1252),(157,1255),(158,1250),(159,1249),(160,1250),(161,1250),(162,1250),(163,1250),(164,1250),(165,1250),(166,1250),(167,1250),(168,1250),(169,1250),(170,1250),(171,1250),(172,1250),(173,1250),(174,1250),(175,1250),(176,1250),(177,1250),(178,1250),(179,1250),(180,1250),(181,1250),(182,1250),(183,1250),(184,1250),(185,1250),(186,1255),(187,1255),(188,1255),(189,1252),(190,1252),(191,1252),(192,NULL),(193,1255),(194,1250),(195,1250),(196,1250),(197,1250),(198,1250),(199,1250),(200,1250),(201,1250),(202,1249),(203,1250),(204,1249),(205,1250),(206,1250),(207,1250),(208,1250),(209,1249),(210,1250),(211,1250),(212,1250),(213,1250),(214,1250),(215,1250),(216,1250),(217,1249),(218,1249),(219,1249),(220,1249),(221,1249),(222,1250),(223,1250),(224,1249),(225,1249),(226,1250),(227,1250),(228,1250),(229,1250),(230,1250),(231,NULL),(232,1250),(233,1250),(234,1250),(235,1250),(236,1250),(237,1250),(238,1250),(239,1250),(240,1250),(241,1250),(242,1250),(243,1250),(244,1252),(245,1250),(246,1250),(247,1249),(248,1249),(249,1249),(250,1249),(251,1249),(252,1250),(253,1250),(254,1250),(255,1250),(256,1250),(257,1250),(258,1250),(259,1250),(260,1250),(261,1250),(262,1250),(263,1250),(264,1250),(265,1250),(266,1250),(267,1250),(268,1250),(269,1250),(270,1250),(271,1250),(272,1250),(273,1250),(274,1250),(275,1250),(276,1250),(277,1250),(278,1250),(279,1250),(280,1250),(281,1250),(282,1250),(283,1250),(284,1250),(285,1250),(286,1250),(287,1250),(288,1250),(289,1250),(290,NULL),(291,1250),(292,1250),(293,1250),(294,1250),(295,1250),(296,1249),(297,1249),(298,1249),(299,1249),(300,1250),(301,1250),(302,1249),(303,1249),(304,1249),(305,1249),(306,1250),(307,1250),(308,1250),(309,1250),(310,1250),(311,1250),(312,1250),(313,1250),(314,1250),(315,1250),(316,1250),(317,1249),(318,1249),(319,1249),(320,1249),(321,1249),(322,1249),(323,1249),(324,1250),(325,1250),(326,1250),(327,1250),(328,1250),(329,1250),(330,1249),(331,1249),(332,1250),(333,1250),(334,1249),(335,1250),(336,1249),(337,1249),(338,1250),(339,1249),(340,1249),(341,1250),(342,1250),(343,1250),(344,1250),(345,1250),(346,1250),(347,1249),(348,1250),(349,1250),(350,1250),(351,1250),(352,1250),(353,1249),(354,1250),(355,1250),(356,1250),(357,1250),(358,1247),(359,1247),(360,1250),(361,1250),(362,1250),(363,1250),(364,1252),(365,1250),(366,1250),(367,1250),(368,1250),(369,1250),(370,1250),(371,1252),(372,1252),(373,1252),(374,1252),(375,1250),(376,1252),(377,1250),(378,1250),(379,1252),(380,1252),(381,1252),(382,1252),(383,1252),(384,1252),(385,1252),(386,1252),(387,1252),(388,1252),(389,1252),(390,1252),(391,1252),(392,1249),(393,1249),(394,1249),(395,1252),(396,1250),(397,1250),(398,1250),(399,1250),(400,1250),(401,1250),(402,1250),(403,1250),(404,1250),(405,1250),(406,1250),(407,1249),(408,1250),(409,1249),(410,1250),(411,1249),(412,1249),(413,1250),(414,1250),(415,1249);
/*!40000 ALTER TABLE `intro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `officecharts`
--

DROP TABLE IF EXISTS `officecharts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `officecharts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chart_image` varchar(200) NOT NULL,
  `pageId` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pageId` (`pageId`),
  CONSTRAINT `officecharts_ibfk_1` FOREIGN KEY (`pageId`) REFERENCES `companypagesmanagement` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officecharts`
--

LOCK TABLES `officecharts` WRITE;
/*!40000 ALTER TABLE `officecharts` DISABLE KEYS */;
INSERT INTO `officecharts` VALUES (1,'http://res.cloudinary.com/dozj3jkhe/image/upload/v1707129782/intranet_charts/k6dkfpcr0h31kiwuargq.png','5af3110e-af33-486e-bf31-b57a68607d05');
/*!40000 ALTER TABLE `officecharts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `officegallery`
--

DROP TABLE IF EXISTS `officegallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `officegallery` (
  `no` int NOT NULL AUTO_INCREMENT,
  `id` varchar(40) NOT NULL,
  `event_title` varchar(300) NOT NULL,
  `event_date` date NOT NULL,
  `gallery_path` varchar(300) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `no` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officegallery`
--

LOCK TABLES `officegallery` WRITE;
/*!40000 ALTER TABLE `officegallery` DISABLE KEYS */;
INSERT INTO `officegallery` VALUES (17,'03a38ec8-34f8-48f6-8823-b98cd6211898','Christmas Celebration 2023','2023-12-21','public/officeGallary/2023/Christmas Celebration 2023_date_2023-12-21/'),(20,'29c52cea-37cf-45df-95a2-c683f4cdc874','Test Event','2024-02-26','public/officeGallary/2024/Test Event_date_2024-02-26/'),(16,'61c2ce49-d764-41fc-b9ff-c28d4fd29882','test','2024-02-19','public/officeGallary/2024/test_date_2024-02-19/');
/*!40000 ALTER TABLE `officegallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `officegalleryimages`
--

DROP TABLE IF EXISTS `officegalleryimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `officegalleryimages` (
  `no` int NOT NULL AUTO_INCREMENT,
  `image` varchar(300) NOT NULL,
  `gallery_id` varchar(40) NOT NULL,
  PRIMARY KEY (`no`),
  KEY `gallery_id` (`gallery_id`),
  CONSTRAINT `officegalleryimages_ibfk_1` FOREIGN KEY (`gallery_id`) REFERENCES `officegallery` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officegalleryimages`
--

LOCK TABLES `officegalleryimages` WRITE;
/*!40000 ALTER TABLE `officegalleryimages` DISABLE KEYS */;
INSERT INTO `officegalleryimages` VALUES (67,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708267620724.jpg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(68,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708267620729.jpg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(69,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708267620730.jpg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(70,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708267620732.jpg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(71,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708280430868.jpg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(72,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708280430887.png','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(73,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708280431007.jpg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(74,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708280431463.jpg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(75,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708280431471.jpg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(76,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708280431475.jpg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(77,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708280431481.jpg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(78,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708280431484.jpg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(79,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708280431494.jpg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(80,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708280431501.jpg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(81,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708280431515.jpg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(82,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708280431530.jpeg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(83,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708280431533.jpg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(84,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708280431555.png','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(85,'\\officeGallary\\2024\\test_date_2024-02-19\\file_1708280431559.jpg','61c2ce49-d764-41fc-b9ff-c28d4fd29882'),(111,'/officeGallary/2023/Christmas Celebration 2023_date_2023-12-21/file_1708331861915.jpg','03a38ec8-34f8-48f6-8823-b98cd6211898'),(112,'/officeGallary/2023/Christmas Celebration 2023_date_2023-12-21/file_1708331861936.jpg','03a38ec8-34f8-48f6-8823-b98cd6211898'),(113,'/officeGallary/2023/Christmas Celebration 2023_date_2023-12-21/file_1708331862059.jpg','03a38ec8-34f8-48f6-8823-b98cd6211898'),(114,'/officeGallary/2023/Christmas Celebration 2023_date_2023-12-21/file_1708331862070.jpg','03a38ec8-34f8-48f6-8823-b98cd6211898'),(115,'/officeGallary/2023/Christmas Celebration 2023_date_2023-12-21/file_1708331862324.jpg','03a38ec8-34f8-48f6-8823-b98cd6211898'),(116,'\\officeGallary\\2023\\Christmas Celebration 2023_date_2023-12-21\\file_1708925652956.jpeg','03a38ec8-34f8-48f6-8823-b98cd6211898'),(117,'\\officeGallary\\2023\\Christmas Celebration 2023_date_2023-12-21\\file_1708925652964.jpeg','03a38ec8-34f8-48f6-8823-b98cd6211898'),(118,'\\officeGallary\\2023\\Christmas Celebration 2023_date_2023-12-21\\file_1708925652975.jpeg','03a38ec8-34f8-48f6-8823-b98cd6211898'),(119,'\\officeGallary\\2023\\Christmas Celebration 2023_date_2023-12-21\\file_1708925652981.jpeg','03a38ec8-34f8-48f6-8823-b98cd6211898'),(121,'\\officeGallary\\2024\\Test Event_date_2024-02-26\\file_1708941712873.jpg','29c52cea-37cf-45df-95a2-c683f4cdc874'),(122,'\\officeGallary\\2024\\Test Event_date_2024-02-26\\file_1708941712879.jpg','29c52cea-37cf-45df-95a2-c683f4cdc874');
/*!40000 ALTER TABLE `officegalleryimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `officeholidays`
--

DROP TABLE IF EXISTS `officeholidays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `officeholidays` (
  `no` int NOT NULL AUTO_INCREMENT,
  `department` varchar(300) NOT NULL,
  `holidaylist_title` varchar(100) NOT NULL,
  `holiday_title` varchar(100) NOT NULL,
  `holiday_date` date NOT NULL,
  `holiday_day` varchar(15) NOT NULL,
  `pageId` varchar(40) NOT NULL,
  UNIQUE KEY `no` (`no`),
  KEY `pageId` (`pageId`),
  CONSTRAINT `officeholidays_ibfk_1` FOREIGN KEY (`pageId`) REFERENCES `companypagesmanagement` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officeholidays`
--

LOCK TABLES `officeholidays` WRITE;
/*!40000 ALTER TABLE `officeholidays` DISABLE KEYS */;
INSERT INTO `officeholidays` VALUES (14,'management,software','Holidays 2024','Republic day','2024-01-26','Friday','b08d8ed2-6240-4510-aa56-19be5932b83c'),(15,'ai labelling','Holiday List for 2024 (AI) Data Labeling','pongal','2024-01-15','Monday','e26da42e-0f89-449e-95df-57b59e647c57');
/*!40000 ALTER TABLE `officeholidays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportingstructure`
--

DROP TABLE IF EXISTS `reportingstructure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportingstructure` (
  `reporting_head` int NOT NULL,
  `users` int NOT NULL,
  KEY `reporting_head` (`reporting_head`),
  KEY `users` (`users`),
  CONSTRAINT `reportingstructure_ibfk_1` FOREIGN KEY (`reporting_head`) REFERENCES `usermanagement` (`employee_id`),
  CONSTRAINT `reportingstructure_ibfk_2` FOREIGN KEY (`users`) REFERENCES `usermanagement` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportingstructure`
--

LOCK TABLES `reportingstructure` WRITE;
/*!40000 ALTER TABLE `reportingstructure` DISABLE KEYS */;
INSERT INTO `reportingstructure` VALUES (1249,1250);
/*!40000 ALTER TABLE `reportingstructure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salarymanagement`
--

DROP TABLE IF EXISTS `salarymanagement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salarymanagement` (
  `uploaded_year` int NOT NULL,
  `uploaded_month` varchar(50) NOT NULL,
  `empid` int NOT NULL,
  `MONTH` varchar(50) NOT NULL,
  `EMPLOYEE NAME` varchar(100) NOT NULL,
  `empsalorgbasic` float NOT NULL,
  `empsalorghra` float NOT NULL,
  `empsalorgconv` float NOT NULL,
  `empsalorgedu` float NOT NULL,
  `empsalorgshift` float NOT NULL,
  `empsaltravel` float NOT NULL,
  `empsalmedical` float NOT NULL,
  `empsalorgsundrycreditothers` float NOT NULL,
  `emporggross` float NOT NULL,
  `empsalorgepf` float NOT NULL,
  `empsalorgesi` float NOT NULL,
  `empsalorgpt` float NOT NULL,
  `A0` float NOT NULL,
  `B0` float NOT NULL,
  `empsalbasic` float NOT NULL,
  `empsalhra` float NOT NULL,
  `empsalconv` float NOT NULL,
  `empsaledu` float NOT NULL,
  `empsalshift` float NOT NULL,
  `T/H` float NOT NULL,
  `empsalmed` float NOT NULL,
  `empsallta` float NOT NULL,
  `empsalsundrycreditothers` float NOT NULL,
  `empsallaptop` float NOT NULL,
  `empsalinternet` float NOT NULL,
  `empsalclientincentive` float NOT NULL,
  `empsalincentive` float NOT NULL,
  `empsalbonus` float NOT NULL,
  `empsalawards` float NOT NULL,
  `empsalothers` float NOT NULL,
  `empsalgross` float NOT NULL,
  `empsalepf` float NOT NULL,
  `empsalesi` float NOT NULL,
  `empsalpt` float NOT NULL,
  `empsalitax` float NOT NULL,
  `empsalsodexo` float NOT NULL,
  `empsaldebitother` float NOT NULL,
  `empsaldeductions` float NOT NULL,
  `empsalnet` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salarymanagement`
--

LOCK TABLES `salarymanagement` WRITE;
/*!40000 ALTER TABLE `salarymanagement` DISABLE KEYS */;
INSERT INTO `salarymanagement` VALUES (2024,'January',1250,'Dec-23','Akash Gajanan Dandge',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(2024,'January',1251,'Dec-23','Lakkakula Shivani',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(2024,'January',1252,'Dec-23','Shreya Vodnala',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,27,30,13500,5400,1440,0,0,0,0,0,285,0,0,0,0,0,0,0,20625,1620,0,200,0,0,0,1820,18805),(2024,'January',1253,'Dec-23','Sandeep Kumar',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917);
/*!40000 ALTER TABLE `salarymanagement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timezoneinformation`
--

DROP TABLE IF EXISTS `timezoneinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timezoneinformation` (
  `timezone` varchar(100) NOT NULL,
  `emp_id` int NOT NULL,
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `timezoneinformation_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `usermanagement` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timezoneinformation`
--

LOCK TABLES `timezoneinformation` WRITE;
/*!40000 ALTER TABLE `timezoneinformation` DISABLE KEYS */;
INSERT INTO `timezoneinformation` VALUES ('Asia/Kolkata',1250);
/*!40000 ALTER TABLE `timezoneinformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useraccessmanagement`
--

DROP TABLE IF EXISTS `useraccessmanagement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useraccessmanagement` (
  `emp_id` int NOT NULL,
  `restricted_pages` varchar(500) NOT NULL,
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `useraccessmanagement_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `usermanagement` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useraccessmanagement`
--

LOCK TABLES `useraccessmanagement` WRITE;
/*!40000 ALTER TABLE `useraccessmanagement` DISABLE KEYS */;
INSERT INTO `useraccessmanagement` VALUES (1249,''),(1250,'');
/*!40000 ALTER TABLE `useraccessmanagement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userexperience`
--

DROP TABLE IF EXISTS `userexperience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userexperience` (
  `promotion_id` varchar(40) NOT NULL,
  `emp_id` int NOT NULL,
  `promotion_title` varchar(300) NOT NULL,
  `promotion_date` date NOT NULL,
  `roles_and_responsibility` varchar(500) NOT NULL,
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `userexperience_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `usermanagement` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userexperience`
--

LOCK TABLES `userexperience` WRITE;
/*!40000 ALTER TABLE `userexperience` DISABLE KEYS */;
INSERT INTO `userexperience` VALUES ('df45d39d-37cb-4456-aa24-b4a02ecf5406',1247,'MERN Stack Developer','2024-02-02',''),('19bbe740-2185-461b-a989-b8a6a029e229',1196,'Snr AI and ML Engineer','2019-05-29',''),('07b4cba6-fd53-42ef-9387-c20a12920be5',1249,'Sofware Developer','2024-01-31',''),('483662e1-525a-40f6-895b-22430b18ab8d',1247,'Project Lead','2024-02-29','Intranet site'),('a588e762-901b-42be-b75b-d04b78446e3d',1250,'Trainee Sofware Engineer','2022-11-03','By using the company training program and resources build skills to be ready for upcoming projects.'),('46bad927-3573-4a30-ba31-2dd3df8216dd',1250,'Sofware Developer','2023-05-31','Design, code, and test software applications. Write clean, efficient, and maintainable code using programming languages and development frameworks. '),('21ce3d7f-455a-430b-b884-4620be5053a3',1250,'Project Lead (New Intranet Website)','2023-08-03','With the team missiles handling the new Intranet Website Project '),('430ee397-146b-47d6-bd88-986ad1aa71e4',1252,'software engineer','2022-11-13','');
/*!40000 ALTER TABLE `userexperience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usermanagement`
--

DROP TABLE IF EXISTS `usermanagement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usermanagement` (
  `profile_pic` varchar(200) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL,
  `country` varchar(100) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `blood_group` varchar(10) NOT NULL,
  `company_name` varchar(200) NOT NULL,
  `about_yourself` varchar(300) NOT NULL,
  `employee_id` int NOT NULL,
  `date_of_joining` date NOT NULL,
  `user_type` varchar(20) NOT NULL,
  `department` varchar(100) NOT NULL,
  `shift` int NOT NULL,
  `status` varchar(50) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `past_exp_domain` varchar(100) NOT NULL,
  `past_exp_years` float NOT NULL,
  `designation` varchar(250) NOT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `email` (`email`),
  KEY `company_name` (`company_name`),
  CONSTRAINT `usermanagement_ibfk_1` FOREIGN KEY (`company_name`) REFERENCES `companymanagement` (`company_name`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usermanagement`
--

LOCK TABLES `usermanagement` WRITE;
/*!40000 ALTER TABLE `usermanagement` DISABLE KEYS */;
INSERT INTO `usermanagement` VALUES ('','test','','2050-12-31','','','','Brightcomgroup India','',1,'2024-01-01','admin','management',9,'active','test@gamil.com','$2b$12$ja5EOQ2dKPeRxj5TeVwKIugBtm2tRT/7b2N/rHvxkoVpdc.d79Au.','',1,'testing'),('','Mahesh','Sunkara','1995-05-09','India','male','A+','Brightcomgroup India','',1196,'2019-05-29','admin','management',9,'active','maheshs@brightcomgroup.com','$2b$12$srYMzXNiKxc8YvhEA9w3fOqUbMF2jpqt03WyrTFRn6i.CMhRL3O.K','Jr AI and ML Engineer',1,'Snr AI and ML Engineer'),('','Velugotla','Deepthi','1998-08-19','India','female','B+','Brightcomgroup India','',1247,'2024-02-02','user','ai labelling',8,'active','deepthim@brightcomgroup.com','$2b$12$FeCz0bZrWZ3DbyaxpgY1Fe3H57kUVD7YCw7CANnyuAw0p5XdsIrv2','',0,'Project Lead'),('','Geetanjali','Behera','1993-06-11','India','female','B+','Brightcomgroup India','',1248,'2024-02-09','user','software',9,'active','geetanjalib@brightcomgroup.com','$2b$12$FL2xMLYvam72uh8leHXgx.1H6v0EoFQKxhHPsYorRizP91NKNabpu','',0,'software developer'),('http://res.cloudinary.com/dozj3jkhe/image/upload/v1707973765/intranet_user_profiles/s56upa4bcjz2tx8pdfnx.jpg','Dibya Kanti','Dhir','1999-08-23','India','female','A+','Brightcomgroup India','',1249,'2024-01-31','admin','management',9,'active','dibyakantid@brightcomgroup.com','$2b$12$XZcUGDd9AVy2UcXZqPEtU.wxLhaMot3CoUJvG/Of5fWJdfFEOG/ZS','',0,'Sofware Developer'),('http://res.cloudinary.com/dozj3jkhe/image/upload/v1706783451/intranet_user_profiles/ayfn0mscvocyvl1yx0tn.jpg','Akash','Dandge','2001-01-02','India','male','AB+','Brightcomgroup India','',1250,'2022-11-03','admin','management',9,'active','akashd@brightcomgroup.com','$2b$12$3MUg26.dcrfLMB/sN6ThneQgPyj6liD90lGM8LFzMguK.fKqjpdLe','',0,'Project Lead (New Intranet Website)'),('','shreya','vodnala','2000-09-14','India','female','O+','Brightcomgroup India','hello everyone',1252,'2022-11-13','admin','management',9,'active','shreyav@brightcomgroup.com','$2b$12$lyaLz/uRH/1JKxLwLmfFjO0fFFz9JoANsbMFddFmnNqCU7HyOR1mG','',1,'software engineer'),('http://res.cloudinary.com/dozj3jkhe/image/upload/v1708942073/intranet_user_profiles/v74lusynustdh0jbx5xg.jpg','Madhava','Sharma','1996-12-17','India','male','O+','Brightcomgroup India','',1255,'2022-11-03','admin','management',9,'active','madhavas@brightcomgroup.com','$2b$12$FQflPUK3cxMnKG8oamw3xOLbbep9TJUnm8s6tje2VWUU5h1.GGwy6','full stack',1.3,'Software Developer');
/*!40000 ALTER TABLE `usermanagement` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-15 12:06:30

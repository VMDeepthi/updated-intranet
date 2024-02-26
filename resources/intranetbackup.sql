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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applyleaves`
--

LOCK TABLES `applyleaves` WRITE;
/*!40000 ALTER TABLE `applyleaves` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (17,1250,'2024-01-26',0,0,'HH',8,'HH'),(18,1250,'2024-01-27',0,0,'WH',0,'AA'),(19,1250,'2024-01-28',0,0,'WH',0,'WH'),(20,1250,'2024-01-29',9.32,18.07,'XX',8.35,'XX'),(21,1250,'2024-01-30',9.35,18.59,'XX',9.24,'XX'),(22,1250,'2024-01-31',9.36,18.56,'XX',9.2,'XX'),(23,1250,'2024-02-01',9.38,19,'XX',9.22,'XX'),(24,1250,'2024-02-02',9.25,18.53,'XX',9.28,'XX'),(25,1250,'2024-02-03',0,0,'WH',0,'AA'),(26,1250,'2024-02-04',0,0,'WH',0,'WH'),(27,1250,'2024-02-05',9.34,13.3,'AA',3.56,'AA'),(28,1250,'2024-02-06',9.4,18.38,'XX',8.58,'XX'),(29,1250,'2024-02-07',9.35,18.38,'XX',9.03,'XX'),(30,1250,'2024-02-08',9.37,19.46,'XX',7.09,'XX'),(31,1250,'2024-02-09',9.37,19.46,'XX',10.09,'XX');
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
  `credit` float NOT NULL,
  `debit` float NOT NULL,
  `date` date NOT NULL,
  `total_leaves` float NOT NULL,
  `reference` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `balanceleaves_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `usermanagement` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `balanceleaves`
--

LOCK TABLES `balanceleaves` WRITE;
/*!40000 ALTER TABLE `balanceleaves` DISABLE KEYS */;
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
  `company_name` varchar(100) NOT NULL,
  `company_email` varchar(50) NOT NULL,
  `company_address` varchar(300) NOT NULL,
  `company_website` varchar(200) NOT NULL,
  `company_contact_no` varchar(50) NOT NULL,
  `company_status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_name` (`company_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companymanagement`
--

LOCK TABLES `companymanagement` WRITE;
/*!40000 ALTER TABLE `companymanagement` DISABLE KEYS */;
INSERT INTO `companymanagement` VALUES ('637d2c79-0951-4e47-91eb-ae541ec207b0','Brightcom India','akashd@brightcomgroup.com','brightcomgroup','','+917387591037','denied'),('bcd9578f-5fb4-41e5-a74f-a4ecaefec3c5','Lycos India','lycos@brightcom.com','Hell','','+91 7387591037','denied'),('ca4dda03-1f2c-48ea-a596-7eda79901d67','Brightcomgroup India','brightcomgroup@gmail.com','Floor : 5, Fairfield By Marriott Road No. 2, Nanakramguda, Gachibowli, Hyderabad, Telangana 500032','www.bcg.com','+917387591037','active'),('d21dbabb-badf-4220-9404-d0d15fcbdc47','Brightcom Global','akashd@brightcomgroup.com','Brightcomgroup Floor 5, Fairfield by Marriott,Road No 2, Nanakramguda, Gachibowli, Hyderabad 500032.','https://www.brightcomgroup.com/','+91 75500 04474','active');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companypagesmanagement`
--

LOCK TABLES `companypagesmanagement` WRITE;
/*!40000 ALTER TABLE `companypagesmanagement` DISABLE KEYS */;
INSERT INTO `companypagesmanagement` VALUES (6,'4aca7753-3fbb-48e7-9259-19038b8b908b','Brightcomgroup India','Address for Communication','Address','active','ca4dda03-1f2c-48ea-a596-7eda79901d67'),(7,'5af3110e-af33-486e-bf31-b57a68607d05','Brightcomgroup India','Organizational Chart','Chart','active','ca4dda03-1f2c-48ea-a596-7eda79901d67'),(8,'b08d8ed2-6240-4510-aa56-19be5932b83c','Brightcomgroup India','Holiday List','Holidays','active','ca4dda03-1f2c-48ea-a596-7eda79901d67'),(9,'e26da42e-0f89-449e-95df-57b59e647c57','Brightcomgroup India','Holiday List','Holidays','active','ca4dda03-1f2c-48ea-a596-7eda79901d67');
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
-- Table structure for table `experience`
--

DROP TABLE IF EXISTS `experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `designation_type` varchar(255) NOT NULL,
  `date_of_joining` date NOT NULL,
  `current_designation` varchar(255) NOT NULL,
  `promotion_title` varchar(255) DEFAULT NULL,
  `from_date` date NOT NULL,
  `rolesandresponsibilities` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `experience_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `usermanagement` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience`
--

LOCK TABLES `experience` WRITE;
/*!40000 ALTER TABLE `experience` DISABLE KEYS */;
INSERT INTO `experience` VALUES (1,1250,'experience','2022-11-02','software developer','MERN Stack Developer','2024-02-26','Do like no one can beat you'),(2,1250,'experience','2022-11-02','software develope','Project Lead','2024-02-24','Intranet Website');
/*!40000 ALTER TABLE `experience` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `intro`
--

LOCK TABLES `intro` WRITE;
/*!40000 ALTER TABLE `intro` DISABLE KEYS */;
INSERT INTO `intro` VALUES (1,1250),(2,1250),(3,1250),(4,1250),(5,1250),(6,1250),(7,1250),(8,1250),(9,1250),(10,1250),(11,1250),(12,1250),(13,1250),(14,1250),(15,1250),(16,1250),(17,1250),(18,1250),(19,1249),(20,NULL),(21,1249),(22,1249),(23,1250),(24,1250),(25,1250),(26,1250),(27,1250),(28,1250),(29,1250),(30,1249),(31,1250),(32,1250),(33,1250),(34,1250),(35,1250),(36,1249),(37,1250),(38,1250),(39,1250),(40,1250),(41,1250),(42,1250),(43,1250),(44,1250),(45,1250),(46,1250),(47,1250),(48,1250),(49,1250),(50,1250),(51,1250),(52,1250),(53,1249),(54,1250),(55,1250),(56,1250),(57,1250),(58,1250),(59,1250),(60,1249),(61,1250),(62,1250),(63,1249),(64,1250),(65,1250),(66,1250),(67,1250),(68,1250),(69,1250),(70,1250),(71,1250),(72,1250),(73,1250),(74,1250),(75,1250),(76,1250),(77,1250),(78,1250),(79,1250),(80,1250),(81,1250),(82,1250),(83,1250),(84,1250),(85,1250),(86,1250),(87,1250),(88,1250),(89,1250),(90,1250),(91,1250),(92,1250),(93,1250),(94,1250),(95,1250),(96,1249),(97,1249),(98,1249),(99,1250),(100,1249),(101,1249),(102,1250),(103,1249),(104,1249),(105,1249),(106,1250),(107,1250),(108,1250),(109,1250),(110,1250),(111,1250),(112,1250),(113,1250),(114,1250),(115,1250),(116,1250),(117,1250),(118,1250),(119,1250),(120,1250),(121,1250),(122,1250),(123,1250),(124,1249),(125,1249),(126,1249),(127,1249),(128,1250),(129,1250),(130,1250),(131,1250),(132,1250),(133,1250),(134,1250),(135,1250),(136,1250),(137,1250),(138,1249),(139,1250),(140,1249),(141,1250),(142,1250),(143,1250),(144,1252),(145,1252),(146,1250),(147,1250),(148,1250),(149,1250),(150,1250),(151,1255),(152,1250),(153,1255),(154,1250),(155,1250),(156,1252),(157,1255),(158,1250),(159,1249),(160,1250),(161,1250),(162,1250),(163,1250),(164,1250),(165,1250),(166,1250),(167,1250),(168,1250),(169,1250);
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
-- Table structure for table `payslip`
--

DROP TABLE IF EXISTS `payslip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payslip` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empid` int NOT NULL,
  `MONTH` date NOT NULL,
  `EMPLOYEE_NAME` varchar(100) NOT NULL,
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
  `T_H` float NOT NULL,
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
  `empsalnet` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payslip`
--

LOCK TABLES `payslip` WRITE;
/*!40000 ALTER TABLE `payslip` DISABLE KEYS */;
INSERT INTO `payslip` VALUES (1,1250,'2015-03-02','Akash Gajanan Dandge',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(2,1251,'2015-03-02','Lakkakula Shivani',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(3,1252,'2015-03-02','Shreya Vodnala',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,27,30,13500,5400,1440,0,0,0,0,0,285,0,0,0,0,0,0,0,20625,1620,0,200,0,0,0,1820,18805),(4,1253,'2015-03-02','Sandeep Kumar',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(5,1250,'2024-02-02','Akash Gajanan Dandge',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(6,1251,'2024-02-02','Lakkakula Shivani',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(7,1252,'2024-02-02','Shreya Vodnala',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,27,30,13500,5400,1440,0,0,0,0,0,285,0,0,0,0,0,0,0,20625,1620,0,200,0,0,0,1820,18805),(8,1253,'2024-02-02','Sandeep Kumar',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(9,1250,'2024-05-02','Akash Gajanan Dandge',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(10,1251,'2024-05-02','Lakkakula Shivani',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(11,1252,'2024-05-02','Shreya Vodnala',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,27,30,13500,5400,1440,0,0,0,0,0,285,0,0,0,0,0,0,0,20625,1620,0,200,0,0,0,1820,18805),(12,1253,'2024-05-02','Sandeep Kumar',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(13,1250,'2022-01-02','Akash Gajanan Dandge',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,1000,0,0,22917,1800,0,200,0,0,0,2000,20917),(14,1251,'2022-01-02','Lakkakula Shivani',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,2000,0,0,22917,1800,0,200,0,0,0,2000,20917),(15,1252,'2022-01-02','Shreya Vodnala',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,27,30,13500,5400,1440,0,0,0,0,0,285,0,0,0,0,3000,0,0,20625,1620,0,200,0,0,0,1820,18805),(16,1253,'2022-01-02','Sandeep Kumar',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,4000,0,0,22917,1800,0,200,0,0,0,2000,20917),(17,1250,'2024-01-02','Akash Gajanan Dandge',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(18,1251,'2024-01-02','Lakkakula Shivani',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(19,1252,'2024-01-02','Shreya Vodnala',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,27,30,13500,5400,1440,0,0,0,0,0,285,0,0,0,0,0,0,0,20625,1620,0,200,0,0,0,1820,18805),(20,1253,'2024-01-02','Sandeep Kumar',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(21,1250,'2023-11-02','Akash Gajanan Dandge',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(22,1251,'2023-11-02','Lakkakula Shivani',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(23,1252,'2023-11-02','Shreya Vodnala',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,27,30,13500,5400,1440,0,0,0,0,0,285,0,0,0,0,0,0,0,20625,1620,0,200,0,0,0,1820,18805),(24,1253,'2023-11-02','Sandeep Kumar',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(25,1250,'2022-11-02','Akash Gajanan Dandge',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(26,1251,'2022-11-02','Lakkakula Shivani',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917),(27,1252,'2022-11-02','Shreya Vodnala',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,27,30,13500,5400,1440,0,0,0,0,0,285,0,0,0,0,0,0,0,20625,1620,0,200,0,0,0,1820,18805),(28,1253,'2022-11-02','Sandeep Kumar',15000,6000,1600,0,0,0,0,317,22917,1800,0,200,30,30,15000,6000,1600,0,0,0,0,0,317,0,0,0,0,0,0,0,22917,1800,0,200,0,0,0,2000,20917);
/*!40000 ALTER TABLE `payslip` ENABLE KEYS */;
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
INSERT INTO `usermanagement` VALUES ('','test','','2050-12-31','','','','Brightcomgroup India','',1,'2024-01-01','admin','management',9,'active','test@gamil.com','$2b$12$ja5EOQ2dKPeRxj5TeVwKIugBtm2tRT/7b2N/rHvxkoVpdc.d79Au.','',1,'testing'),('','Mahesh','Sunkara','1995-05-09','India','male','A+','Brightcomgroup India','',1196,'2019-05-29','admin','management',9,'active','maheshs@brightcomgroup.com','$2b$12$srYMzXNiKxc8YvhEA9w3fOqUbMF2jpqt03WyrTFRn6i.CMhRL3O.K','Jr AI and ML Engineer',1,'Snr AI and ML Engineer'),('','Velugotla','Deepthi','1998-08-19','India','female','B+','Brightcomgroup India','',1247,'2024-02-02','user','ai labelling',8,'active','deepthim@brightcomgroup.com','$2b$12$LWIFd9GD6CI0ICmlzq1XA.PFWt7ScFP1G3FsO60zwxozVetHO4Zq6','',0,'MERN Stack Developer'),('','Geetanjali','Behera','1993-06-11','India','female','B+','Brightcomgroup India','',1248,'2024-02-09','user','software',9,'active','geetanjalib@brightcomgroup.com','$2b$12$FL2xMLYvam72uh8leHXgx.1H6v0EoFQKxhHPsYorRizP91NKNabpu','',0,'software developer'),('http://res.cloudinary.com/dozj3jkhe/image/upload/v1707973765/intranet_user_profiles/s56upa4bcjz2tx8pdfnx.jpg','Dibya Kanti','Dhir','1999-08-23','India','female','A+','Brightcomgroup India','',1249,'2024-01-31','user','software',9,'active','dibyakantid@brightcomgroup.com','$2b$12$XZcUGDd9AVy2UcXZqPEtU.wxLhaMot3CoUJvG/Of5fWJdfFEOG/ZS','',0,'Sofware Developer'),('http://res.cloudinary.com/dozj3jkhe/image/upload/v1706783451/intranet_user_profiles/ayfn0mscvocyvl1yx0tn.jpg','Akash','Dandge','2001-01-02','India','male','AB+','Brightcomgroup India','',1250,'2022-11-03','admin','management',8,'active','akashd@brightcomgroup.com','$2b$12$6C5hRJfWT5lCjqxPuWgEquVFvzb4lcBXmegnJ9cDTpYBFNwx.I2SO','',0,'software developer'),('','shreya','vodnala','2000-09-14','India','female','O+','Brightcomgroup India','hello',1252,'2022-11-13','admin','software',9,'active','shreyav@brightcomgroup.com','$2b$12$lyaLz/uRH/1JKxLwLmfFjO0fFFz9JoANsbMFddFmnNqCU7HyOR1mG','',1,'software engineer'),('http://res.cloudinary.com/dozj3jkhe/image/upload/v1708942073/intranet_user_profiles/v74lusynustdh0jbx5xg.jpg','Madhava','Sharma','1996-12-17','India','male','O+','Brightcomgroup India','',1255,'2022-11-03','admin','management',9,'active','madhavas@brightcomgroup.com','$2b$12$FQflPUK3cxMnKG8oamw3xOLbbep9TJUnm8s6tje2VWUU5h1.GGwy6','full stack',1.3,'Software Developer');
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

-- Dump completed on 2024-02-26 17:22:09

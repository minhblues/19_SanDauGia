/*
MySQL Backup
Database: onlineauction
Backup Time: 2020-01-05 17:01:56
*/

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `onlineauction`.`auctions`;
DROP TABLE IF EXISTS `onlineauction`.`carts`;
DROP TABLE IF EXISTS `onlineauction`.`categories`;
DROP TABLE IF EXISTS `onlineauction`.`favorites`;
DROP TABLE IF EXISTS `onlineauction`.`highestprice`;
DROP TABLE IF EXISTS `onlineauction`.`products`;
DROP TABLE IF EXISTS `onlineauction`.`properties`;
DROP TABLE IF EXISTS `onlineauction`.`users`;
DROP TABLE IF EXISTS `onlineauction`.`wishlists`;
CREATE TABLE `auctions` (
  `idAuction` int(10) NOT NULL AUTO_INCREMENT,
  `Bidder` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `Product` int(10) DEFAULT NULL,
  `Price` varchar(12) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `Time` datetime DEFAULT NULL,
  `Status` tinyint(3) DEFAULT NULL,
  PRIMARY KEY (`idAuction`),
  UNIQUE KEY `idAuction_UNIQUE` (`idAuction`),
  KEY `FK_auctions_products` (`Product`),
  CONSTRAINT `fk_auctions_products` FOREIGN KEY (`Product`) REFERENCES `products` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
CREATE TABLE `carts` (
  `User` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Product` int(10) NOT NULL,
  `Status` bit(1) DEFAULT b'0',
  PRIMARY KEY (`User`,`Product`) USING BTREE,
  KEY `fk_carts_products` (`Product`),
  CONSTRAINT `fk_carts_products` FOREIGN KEY (`Product`) REFERENCES `products` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_carts_users` FOREIGN KEY (`User`) REFERENCES `users` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
CREATE TABLE `categories` (
  `CatId` int(11) NOT NULL AUTO_INCREMENT,
  `CatName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`CatId`),
  UNIQUE KEY `CatId_UNIQUE` (`CatId`),
  FULLTEXT KEY `CatName` (`CatName`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
CREATE TABLE `favorites` (
  `User` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Product` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`User`,`Product`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
CREATE TABLE `highestprice` (
  `Product` varchar(10) NOT NULL,
  `User` varchar(20) DEFAULT NULL,
  `Price` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`Product`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `products` (
  `ProductID` int(10) NOT NULL,
  `Name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Price` int(12) DEFAULT '0',
  `StepPrice` int(12) DEFAULT '0',
  `InstancePrice` int(12) DEFAULT NULL,
  `Seller` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `StartTime` datetime DEFAULT NULL,
  `EndTime` datetime DEFAULT NULL,
  `Description` varchar(1000) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `Category` int(11) DEFAULT NULL,
  `AuctionTime` int(11) DEFAULT '0',
  `Status` bit(1) DEFAULT b'0' COMMENT '0: selling 1:sold',
  `PriceHolder` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `ImageCount` int(1) DEFAULT '3',
  PRIMARY KEY (`ProductID`),
  FULLTEXT KEY `Name` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
CREATE TABLE `properties` (
  `Product` int(10) NOT NULL,
  `Key` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Value` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`Product`,`Key`),
  CONSTRAINT `fk_products_properties` FOREIGN KEY (`Product`) REFERENCES `products` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
CREATE TABLE `users` (
  `Username` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Password` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Name` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `Phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `Email` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `Address` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `IsBidder` tinyint(1) DEFAULT '0',
  `Score` int(5) DEFAULT '0',
  `RateTime` int(5) DEFAULT '0',
  PRIMARY KEY (`Username`),
  UNIQUE KEY `Username_UNIQUE` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
CREATE TABLE `wishlists` (
  `Username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductID` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Username`,`ProductID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
BEGIN;
LOCK TABLES `onlineauction`.`auctions` WRITE;
DELETE FROM `onlineauction`.`auctions`;
INSERT INTO `onlineauction`.`auctions` (`idAuction`,`Bidder`,`Product`,`Price`,`Time`,`Status`) VALUES (7, NULL, 1, '600000', '2020-01-03 14:25:34', NULL),(8, 'admin', 1, '700000', '2020-01-04 15:26:41', NULL),(9, 'admin', 1, '700000', '2020-01-04 15:28:41', NULL),(10, 'admin', 1, '800000', '2020-01-04 15:28:42', NULL),(11, 'account1', 22, '3700000', '2020-01-05 13:44:04', NULL),(12, 'account1', 22, '4000000', '2020-01-05 14:35:25', NULL),(13, 'account1', 22, '4300000', '2020-01-05 14:35:49', NULL),(14, 'account1', 22, '4600000', '2020-01-05 14:36:51', NULL),(15, 'account1', 18, '3200000', '2020-01-05 15:43:42', NULL),(16, 'account1', 18, '4800000', '2020-01-05 15:43:53', NULL);
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `onlineauction`.`carts` WRITE;
DELETE FROM `onlineauction`.`carts`;
INSERT INTO `onlineauction`.`carts` (`User`,`Product`,`Status`) VALUES ('admin', 3, b'0'),('admin', 4, b'0');
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `onlineauction`.`categories` WRITE;
DELETE FROM `onlineauction`.`categories`;
INSERT INTO `onlineauction`.`categories` (`CatId`,`CatName`) VALUES (1, 'Điện thoại di động'),(2, 'Máy tính xách tay');
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `onlineauction`.`favorites` WRITE;
DELETE FROM `onlineauction`.`favorites`;
INSERT INTO `onlineauction`.`favorites` (`User`,`Product`) VALUES ('account1', '1'),('account1', '18'),('account1', '3'),('account1', '35'),('admin', '2');
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `onlineauction`.`highestprice` WRITE;
DELETE FROM `onlineauction`.`highestprice`;
INSERT INTO `onlineauction`.`highestprice` (`Product`,`User`,`Price`) VALUES ('1', 'admin', '700000'),('18', 'account1', '6400000'),('22', 'account1', '4600000');
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `onlineauction`.`products` WRITE;
DELETE FROM `onlineauction`.`products`;
INSERT INTO `onlineauction`.`products` (`ProductID`,`Name`,`Price`,`StepPrice`,`InstancePrice`,`Seller`,`StartTime`,`EndTime`,`Description`,`Category`,`AuctionTime`,`Status`,`PriceHolder`,`ImageCount`) VALUES (1, 'Điện Thoại Xiaomi Mi 9 Lite (Mi CC9 Global Version) (6GB / 64GB)', 2300000, 100000, NULL, 'account7', '2019-12-18 06:54:29', '2020-02-04 11:12:33', 'Xiaomi Mi 9 Lite là phiên bản quốc tế của chiếc Mi CC9 ra mắt trong tháng 7/2019', 1, 1, b'0', NULL, 3),(2, 'Điện Thoại Samsung Galaxy M10 (16GB/2GB)', 5400000, 100000, NULL, 'account8', '2019-12-23 16:54:21', '2020-01-17 05:32:03', 'Điện thoại chính hãng, Nguyên seal, Mới 100%, Chưa Active', 2, 0, b'0', NULL, 3),(3, 'Điện Thoại iPhone 11 Pro Max 256GB', 4000000, 200000, NULL, 'account7', '2019-12-19 17:29:36', '2020-01-12 14:06:20', 'Chính hãng, Nguyên seal, Mới 100%, Chưa active', 1, 1, b'1', 'admin', 3),(4, 'Điện Thoại OPPO F9 (A11) (64GB/4GB)', 6100000, 400000, 10000000, 'account8', '2019-12-31 19:21:29', '2020-01-25 15:45:25', 'Sản phẩm Chính hãng, Mới 100%, Nguyên seal, Chưa Active', 1, 1, b'1', 'admin', 3),(5, 'Apple Macbook Air 2019 - 13 inchs (i5/ 8GB/ 128GB)', 9000000, 500000, 10000000, 'account3', '2019-12-17 01:41:04', '2020-01-20 21:41:21', NULL, 1, 0, b'0', NULL, 3),(6, 'Laptop Xiaomi Mi Air JYU4063GL Core i5-8250U/Win10 (13.3 inch - Global Version)', 9400000, 200000, NULL, 'account10', '2019-12-07 22:07:50', '2020-01-04 00:43:15', NULL, 2, 0, b'0', NULL, 3),(7, 'Laptop Dell Vostro 3480 70187647 Core i5-8265U/ Win10 (14 HD)', 1700000, 500000, 30000000, 'account3', '2019-12-14 14:05:38', '2020-01-18 23:49:57', NULL, 2, 0, b'0', NULL, 3),(8, 'Laptop Asus Vivobook 14 A412FA-EK224T Core i5-8265U/ Win10 (14 FHD)', 700000, 200000, NULL, 'account2', '2019-12-08 02:53:29', '2020-02-01 06:41:25', NULL, 2, 0, b'0', NULL, 3),(9, 'Tai Nghe Bluetooth I7s Bản Nâng Cấp', 9300000, 100000, NULL, 'account6', '2019-12-04 06:58:47', '2020-02-03 20:16:37', 'Thiết kế sang trọng, các chi tiết hết sức tinh tế và độc đáo', 2, 0, b'0', NULL, 3),(10, 'Tai Nghe Nhét Tai BYZ S389', 4500000, 200000, 15000000, 'account9', '2019-12-02 16:41:33', '2020-01-18 20:05:41', 'Âm thanh chất lượng rõ ràng, sống động', 3, 0, b'0', NULL, 3),(11, 'Tai nghe Samsung A50', 7000000, 300000, 25000000, 'account8', '2019-12-05 23:03:52', '2020-01-14 10:37:19', 'Âm thanh chất lượng rõ ràng, sống động', 3, 0, b'0', NULL, 3),(12, 'Tai nghe bluetooth headset M168 bluetooth V4.1', 3000000, 300000, NULL, 'account7', '2019-12-31 11:01:37', '2020-01-14 09:52:17', 'Công nghệ Bluetooth V4.1', 3, 0, b'0', NULL, 3),(13, 'Chuột Không Dây DareU LM115G MultiColor', 7300000, 300000, NULL, 'account5', '2019-12-09 13:14:04', '2020-01-16 12:03:58', 'Cảm biến quang độ phân giải 1600DPI', 3, 0, b'0', NULL, 3),(14, ' Chuột Chơi Game Có Dây Logitech G102 8000DPI RGB 6 Phím', 4600000, 500000, 10000000, 'account11', '2019-12-11 10:56:48', '2020-01-30 02:50:43', NULL, 4, 0, b'0', NULL, 3),(15, 'Bàn Phím Bluetooth Logitech K380', 7100000, 200000, 15000000, 'account4', '2019-12-03 21:01:47', '2020-01-29 03:14:19', NULL, 4, 0, b'0', NULL, 3),(16, 'Bàn phím cơ E-DRA EK387', 9200000, 400000, NULL, 'account2', '2019-12-29 12:28:13', '2020-01-21 14:57:35', 'Thích hợp cho Game thủ', 4, 0, b'0', NULL, 3),(17, 'Áo sơ mi nam The Cosmo Jeffrey', 100000, 300000, 25000000, 'account5', '2019-12-22 22:49:44', '2020-01-04 10:00:05', 'Áo sơ mi nam tay dài, cổ bẻ, phom suông cơ bản, chất cotton mềm mịn, thoáng mát. Bảng màu đa dạng, hiện đại, mang đến cho bạn nhiều lựa chọn.', 4, 0, b'0', NULL, 3),(18, 'Quần jogger kaki nam túi hộp New arrival 04', 4800000, 400000, NULL, 'account7', '2020-01-04 07:46:14', '2020-01-25 20:50:29', NULL, 5, 2, b'0', 'account1', 3),(19, 'Áo khoác bomber nylon Calvin Klein', 8300000, 400000, 15000000, 'account10', '2019-12-19 07:06:37', '2020-02-04 18:56:03', 'Áo khoác bomber nylon Calvin Klein	Quần áo nam	\"Áo khoác của Calvin Klein Jeans\nCổ áo bóng chày\nChốt zip \nTúi chức năng\nChất liệu cotton mềm\nLớp đệm nhẹ\n100% Cotton\"		Áo khoác của Calvin Klein Jeans	\"\nCổ áo bóng chày\nChốt zip \nTúi chức năng\nChất liệu cotton mềm\nLớp đệm nhẹ\n100% Cotton\"\r\n', 5, 0, b'0', NULL, 3),(20, 'Áo Khoác Nam Cutter & Buck Discovery Windblock Jacket', 4300000, 300000, NULL, 'account11', '2019-12-16 16:31:16', '2020-01-28 15:21:05', NULL, 5, 0, b'0', NULL, 3),(21, 'Quần jean Nữ Ống Rộng', 9000000, 400000, 30000000, 'account2', '2019-12-20 02:06:42', '2020-01-09 20:14:04', 'chất jean dày dặn , co giãn mạnh', 5, 0, b'0', NULL, 3),(22, 'Chân Váy Nữ Caro Phối Nút Gumac', 4600000, 300000, 20000000, 'account3', '2020-01-01 21:23:50', '2020-01-05 23:13:25', 'Thiết kế trẻ trung phù hợp với nhiều lứa tuổi', 5, 4, b'0', 'account1', 3),(23, 'Đầm Voan Hoa Tay Lửng', 5300000, 200000, 10000000, 'account4', '2019-12-19 08:45:51', '2020-01-26 12:45:13', NULL, 5, 0, b'0', NULL, 3),(24, 'Áo Khoác Hoodie Form Rộng Tay Dài', 4700000, 100000, NULL, 'account5', '2019-12-01 10:19:43', '2020-01-26 17:32:03', NULL, 5, 0, b'0', NULL, 3),(25, 'Chuỗi Ngọc Trai Pearl Cao Cấp DB-3904 Bảo Ngọc Jewelry', 7000000, 200000, 30000000, 'account7', '2019-12-04 08:25:50', '2020-01-21 08:01:44', 'Ngọc Trai Nuôi Cấy Nước Ngọt Tự Nhiên', 5, 0, b'0', NULL, 3),(26, 'Vòng Cổ Choker Triangle Tatiana CD2250 - Bạc', 2500000, 400000, 10000000, 'account4', '2020-01-03 00:25:02', '2020-01-23 17:00:30', 'Vòng cổ ôm sát tôn lên nét kiêu kỳ', 6, 0, b'0', NULL, 3),(27, 'Vòng cổ nữ kim tiền tài lộc - Trang sức bạc Panmila', 6100000, 400000, 30000000, 'account7', '2019-12-20 09:07:03', '2020-01-14 23:28:28', 'Chất liệu bạc S925 Kết hợp lớp lõi PA60 độc quyền tại PANMILa.', 6, 0, b'0', NULL, 3),(28, 'Dây chuyền dạng bện xoắn mạ vàng 24K unisex', 2600000, 400000, 25000000, 'account6', '2019-12-20 10:14:59', '2020-01-20 18:07:55', 'Dây chuyền nam mạ vàng 24k công nghệ Hàn Quốc 4 lớp', 6, 0, b'0', NULL, 3),(29, 'Vòng tay phong thủy đá mắt hổ', 2100000, 300000, 25000000, 'account5', '2019-12-04 13:58:42', '2020-01-29 09:25:15', 'Vòng tay bóng sáng bền đẹp', 6, 0, b'0', NULL, 3),(30, 'Vòng Tay Kiềng Chiếc Lá Tatiana VH2292 (Bạc)', 5000000, 400000, NULL, 'account7', '2019-12-22 20:38:35', '2020-01-12 20:37:40', 'Thiết kế tinh tế, hiện đại', 7, 0, b'0', NULL, 3),(31, 'Vòng tay đá Thạch Anh trắng rạn', 5200000, 300000, NULL, 'account3', '2019-12-28 18:31:17', '2020-01-31 03:55:55', 'Đá thiên nhiên 100%.', 7, 0, b'0', NULL, 3),(32, 'Lắc tay bạc nữ cỏ 4 lá đính đá', 9300000, 100000, NULL, 'account4', '2019-12-02 06:08:14', '2020-01-23 17:14:25', 'Chất liệu bạc cao cấp 925', 7, 0, b'0', NULL, 3),(33, 'Dế Mèn Phiêu Lưu Ký (Tái Bản 2019)', 2200000, 300000, 30000000, 'account11', '2019-12-22 13:15:32', '2020-01-07 08:33:46', NULL, 7, 0, b'0', NULL, 3),(34, 'Combo Card Captor Sakura - Thẻ Bài Pha Lê (4 Tập) (Tặng 2 Thẻ Bài Pha Lê)', 4300000, 100000, 25000000, 'account6', '2019-12-06 13:44:36', '2020-01-10 21:11:05', NULL, 8, 0, b'0', NULL, 3),(35, 'Hoàng Tử Bé (Tái Bản 2019)', 2900000, 300000, NULL, 'account8', '2020-01-04 17:28:48', '2020-01-06 04:11:24', NULL, 8, 0, b'0', NULL, 3),(36, 'Chuột Típ Không Vâng Lời (Tái Bản 2019)', 7700000, 400000, 30000000, 'account8', '2020-01-03 02:48:45', '2020-01-27 08:35:22', NULL, 8, 0, b'0', NULL, 3),(37, 'Truyện Cổ Andersen (Kim Đồng)', 4900000, 400000, NULL, 'account10', '2019-12-28 22:13:45', '2020-01-26 04:08:42', NULL, 8, 0, b'0', NULL, 3),(38, 'Hỏa Ngục (Tái Bản 2018)', 9500000, 200000, NULL, 'account1', '2019-12-14 16:14:18', '2020-01-12 09:04:15', NULL, 9, 0, b'0', NULL, 3),(39, 'Kiêu Hãnh Và Định Kiến', 7800000, 100000, 20000000, 'account11', '2019-12-18 15:13:34', '2020-01-14 10:58:13', NULL, 9, 0, b'0', NULL, 3),(40, 'Những Người Khốn Khổ (Trọn Bộ 5 Tập)', 8200000, 100000, 20000000, 'account1', '2020-01-03 18:05:27', '2020-01-19 14:15:09', NULL, 9, 0, b'0', NULL, 3);
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `onlineauction`.`properties` WRITE;
DELETE FROM `onlineauction`.`properties`;
INSERT INTO `onlineauction`.`properties` (`Product`,`Key`,`Value`) VALUES (1, 'Bộ nhớ trong', '256 GB'),(1, 'CPU', 'Apple A13 Bionic 6 nhân'),(1, 'Camera sau', '3 camera 12 MP'),(1, 'Camera trước', '12 MP'),(1, 'Dung lượng pin', '3969 mAh, có sạc nhanh'),(1, 'Hệ điều hành', 'IOS 13'),(1, 'Màn hình', 'OLED, 6.5\", Super Retina XDR'),(1, 'Thẻ SIM', 'Nano SIM & eSIM, Hỗ trợ 4G');
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `onlineauction`.`users` WRITE;
DELETE FROM `onlineauction`.`users`;
INSERT INTO `onlineauction`.`users` (`Username`,`Password`,`Name`,`Phone`,`Email`,`Address`,`IsBidder`,`Score`,`RateTime`) VALUES ('account1', '$2a$10$eHiF9.nazR/8Flv7VdVEceos2dGQtOeTjobSjhgM2dR.0BFf2zypS', 'Nguyễn Văn Toản', '0973776072', 'account1@gmail.com', NULL, 0, 0, 0),('account10', '$2a$10$eHiF9.nazR/8Flv7VdVEceos2dGQtOeTjobSjhgM2dR.0BFf2zypS', 'Nguyễn Đức Chiến', '0944545232', 'account10@gmail.com', NULL, 1, 0, 0),('account11', '$2a$10$eHiF9.nazR/8Flv7VdVEceos2dGQtOeTjobSjhgM2dR.0BFf2zypS', 'Lê Ngọc Bảo', '0912644784', 'account11@gmail.com', NULL, 1, 0, 0),('account2', '$2a$10$eHiF9.nazR/8Flv7VdVEceos2dGQtOeTjobSjhgM2dR.0BFf2zypS', 'Bùi Tiến Dũng', '0917749254', 'account2@gmail.com', NULL, 0, 0, 0),('account3', '$2a$10$eHiF9.nazR/8Flv7VdVEceos2dGQtOeTjobSjhgM2dR.0BFf2zypS', 'Trương Văn Thái Quý', '0904770053', 'account3@gmail.com', NULL, 0, 0, 0),('account4', '$2a$10$eHiF9.nazR/8Flv7VdVEceos2dGQtOeTjobSjhgM2dR.0BFf2zypS', 'Nguyễn Quang Hải', '0974880788', 'account4@gmail.com', NULL, 0, 0, 0),('account5', '$2a$10$eHiF9.nazR/8Flv7VdVEceos2dGQtOeTjobSjhgM2dR.0BFf2zypS', 'Nguyễn Thành Chung', '0983888611', 'account5@gmail.com', NULL, 1, 0, 0),('account6', '$2a$10$eHiF9.nazR/8Flv7VdVEceos2dGQtOeTjobSjhgM2dR.0BFf2zypS', 'Trần Đình Trọng', '0984603663', 'account6@gmail.com', NULL, 0, 0, 0),('account7', '$2a$10$eHiF9.nazR/8Flv7VdVEceos2dGQtOeTjobSjhgM2dR.0BFf2zypS', 'Bùi Hoàng Việt Anh', '0986375176', 'account7@gmail.com', NULL, 0, 0, 0),('account8', '$2a$10$eHiF9.nazR/8Flv7VdVEceos2dGQtOeTjobSjhgM2dR.0BFf2zypS', 'Bùi Tiến Dụng', '0914770545', 'account8@gmail.com', NULL, 0, 0, 0),('account9', '$2a$10$eHiF9.nazR/8Flv7VdVEceos2dGQtOeTjobSjhgM2dR.0BFf2zypS', 'Hồ Tấn Tài', '0986253482', 'account9@gmail.com', NULL, 0, 0, 0),('admin', '$2a$10$eHiF9.nazR/8Flv7VdVEceos2dGQtOeTjobSjhgM2dR.0BFf2zypS', 'Minh Phan', '3245678', 'asd@dasdsdad.com', 'hà tĩnh', 0, 0, 0);
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `onlineauction`.`wishlists` WRITE;
DELETE FROM `onlineauction`.`wishlists`;
UNLOCK TABLES;
COMMIT;

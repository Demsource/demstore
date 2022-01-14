-- Database: `teststore`
--
-- Table structure for table `book_attributes`
--
CREATE TABLE `book_attributes` (
  `skuId` varchar(255) NOT NULL,
  `weight` int(11) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Dumping data for table `book_attributes`
--
INSERT INTO `book_attributes` (`skuId`, `weight`)
VALUES ('KM32FK', 2),
  ('MV4K', 2);
-- --------------------------------------------------------
--
-- Table structure for table `dvd_attributes`
--
CREATE TABLE `dvd_attributes` (
  `skuId` varchar(255) NOT NULL,
  `size` int(11) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Dumping data for table `dvd_attributes`
--
INSERT INTO `dvd_attributes` (`skuId`, `size`)
VALUES ('MV4VM', 200),
  ('B443B', 210);
-- --------------------------------------------------------
--
-- Table structure for table `furniture_attributes`
--
CREATE TABLE `furniture_attributes` (
  `skuId` varchar(255) NOT NULL,
  `height` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `length` int(11) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Dumping data for table `furniture_attributes`
--
INSERT INTO `furniture_attributes` (`skuId`, `height`, `width`, `length`)
VALUES ('MVK4', 70, 100, 120),
  ('KMC4L', 50, 50, 120);
-- --------------------------------------------------------
--
-- Table structure for table `products`
--
CREATE TABLE `products` (
  `sku` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(5, 2) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Dumping data for table `products`
--
INSERT INTO `products` (`sku`, `name`, `price`, `id`)
VALUES ('MV4VM', 'Songs', 12.00, 290),
  ('B443B', 'Musics', 15.00, 291),
  ('KM32FK', 'Peace', 10.00, 292),
  ('MV4K', 'Success', 10.00, 293),
  ('MVK4', 'Chair', 20.00, 294),
  ('KMC4L', 'Table', 25.00, 295);
--
-- Indexes for dumped tables
--
--
-- Indexes for table `book_attributes`
--
ALTER TABLE `book_attributes`
ADD KEY `book_attributes_ibfk_1` (`skuId`);
--
-- Indexes for table `dvd_attributes`
--
ALTER TABLE `dvd_attributes`
ADD KEY `dvd_attributes_ibfk_1` (`skuId`);
--
-- Indexes for table `furniture_attributes`
--
ALTER TABLE `furniture_attributes`
ADD KEY `furniture_attributes_ibfk_1` (`skuId`);
--
-- Indexes for table `products`
--
ALTER TABLE `products`
ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`);
--
-- AUTO_INCREMENT for dumped tables
--
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 296;
--
-- Constraints for dumped tables
--
--
-- Constraints for table `book_attributes`
--
ALTER TABLE `book_attributes`
ADD CONSTRAINT `book_attributes_ibfk_1` FOREIGN KEY (`skuId`) REFERENCES `products` (`sku`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Constraints for table `dvd_attributes`
--
ALTER TABLE `dvd_attributes`
ADD CONSTRAINT `dvd_attributes_ibfk_1` FOREIGN KEY (`skuId`) REFERENCES `products` (`sku`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Constraints for table `furniture_attributes`
--
ALTER TABLE `furniture_attributes`
ADD CONSTRAINT `furniture_attributes_ibfk_1` FOREIGN KEY (`skuId`) REFERENCES `products` (`sku`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2022 at 06:07 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `organic`
--

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(50) NOT NULL,
  `category` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(50) NOT NULL,
  `distributor` varchar(50) NOT NULL,
  `cart_status` int(11) NOT NULL DEFAULT 0,
  `wishlist_status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`id`, `name`, `description`, `category`, `price`, `image`, `distributor`, `cart_status`, `wishlist_status`) VALUES
(1, 'Basmati Rice', 'Organic Rice is evidently made without the use of ', 0, 120, 'assets/img/product/rice.jpg', 'Bandhari ji', 0, 0),
(2, 'Fresh Carrot', 'Organic carrots have been found to have up to 12% ', 3, 60, 'assets/img/product/carrot.jpg', 'Sharma ji', 1, 0),
(3, 'corn', 'Good for health and is best for daily consumption ', 1, 40, 'assets/img/product/corn.jpg', 'Bandhari ji', 1, 1),
(4, 'Black Grapes', 'Good for health and is best for daily consumption ', 3, 120, 'assets/img/product/grapes.jpg', 'Chand Jii', 0, 1),
(5, 'Fresh Greeen Pea', 'Good for health and is best for daily consumption ', 2, 30, 'assets/img/product/greenPea.jpg', 'Bandhari ji', 0, 0),
(6, 'Red Kidney Beans', 'Good for health and is best for daily consumption ', 2, 90, 'assets/img/product/kidneyBeans.jpg', 'Chand Jii', 0, 0),
(7, 'Crispy Lemon', 'Good for health and is best for daily consumption ', 2, 40, 'assets/img/product/lemon.jpg', 'Joshi ji', 0, 0),
(8, 'Mustard Oil', 'Good for health and is best for daily consumption ', 2, 120, 'assets/img/product/mustardOil.jpg', 'Chand Jii', 0, 0),
(9, 'Mustard Seeds', 'Good for health and is best for daily consumption ', 0, 40, 'assets/img/product/mustardSeed.jpg', 'Bandhari ji', 0, 0),
(10, 'Pomegrenates', 'Good for health and is best for daily consumption ', 3, 120, 'assets/img/product/pomgrenate.jpg', 'Chand Jii', 0, 0),
(11, 'Fresh Tomato', 'Good for health and is best for daily consumption ', 2, 40, 'assets/img/product/tomato.jpg', 'Joshi ji', 0, 0),
(12, 'Crispy Soyabeans', 'Good for health and is best for daily consumption ', 2, 120, 'assets/img/product/soyabean.jpg', 'Chand Jii', 0, 0),
(13, 'Sugarcanes', 'Good for health and is best for daily consumption ', 0, 40, 'assets/img/product/sugarcane.jpg', 'Sheoran ji', 0, 0),
(14, 'Turmeric', 'Good for health and is best for daily consumption ', 3, 120, 'assets/img/product/turmeric.jpg', 'Pal Jii', 0, 0),
(15, 'Yellow Urad Dal', 'Good for health and is best for daily consumption ', 3, 120, 'assets/img/product/uradDal.jpg', 'Pal Jii', 0, 0),
(16, 'Wheat', 'Good for health and is best for daily consumption ', 3, 120, 'assets/img/product/wheat.jpg', 'Pal Jii', 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

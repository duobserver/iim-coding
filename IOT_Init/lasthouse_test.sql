-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 26, 2024 at 10:37 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lasthouse_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `last`
--

CREATE TABLE `last` (
  `lastHouse` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Gryffindor',
  `id` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `last`
--

INSERT INTO `last` (`lastHouse`, `id`) VALUES
('Ravenclaw', 1);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('7eba8a2d-734f-4d20-9142-d554f852f817', '1662d2304ba0f922d01663a35e12cee7c21baf2a42f77341f259940db96aa0f4', '2024-04-24 13:19:52.652', '20240424131952_init', NULL, NULL, '2024-04-24 13:19:52.586', 1),
('92b0f3b5-5764-47ad-aebc-a64bd4b529d3', '5a6eb01028e80d5367f2ebd0162ca9768b53a4d4e8f6271217ab40070ab26981', '2024-04-24 13:22:05.804', '20240424132205_init', NULL, NULL, '2024-04-24 13:22:05.777', 1),
('b54fc9e4-d1be-4c44-abe4-6b18a587ed4f', 'c67e44edcfc27e10316e270ede8a686a0e4d967d825b5f7f61e0aa6e9ee85f67', '2024-04-24 08:37:33.746', '20240424083733_init', NULL, NULL, '2024-04-24 08:37:33.736', 1),
('f06e87e9-80c2-4da2-9392-413257f6e192', '543417c01326bec3e50152642918ad73e06aa70d2bd62a519436f6d77b4a40f5', '2024-04-24 13:31:31.131', '20240424133131_init', NULL, NULL, '2024-04-24 13:31:31.064', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `last`
--
ALTER TABLE `last`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

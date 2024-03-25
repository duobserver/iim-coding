-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 25, 2024 at 03:52 AM
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
-- Database: `gwitter`
--

-- --------------------------------------------------------

--
-- Table structure for table `6_follows`
--

CREATE TABLE `6_follows` (
  `followId` int NOT NULL COMMENT 'Following user identifier',
  `followStatus` int NOT NULL COMMENT 'Follow status (\r\n0: following id,\r\n1: followed by id,\r\n2: both)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `6_follows`
--

INSERT INTO `6_follows` (`followId`, `followStatus`) VALUES
(9, 0),
(7, 2);

-- --------------------------------------------------------

--
-- Table structure for table `6_likes`
--

CREATE TABLE `6_likes` (
  `likeId` int NOT NULL COMMENT 'Liked gweet identifier'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `6_likes`
--

INSERT INTO `6_likes` (`likeId`) VALUES
(2),
(3);

-- --------------------------------------------------------

--
-- Table structure for table `7_follows`
--

CREATE TABLE `7_follows` (
  `followId` int NOT NULL,
  `followStatus` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `7_follows`
--

INSERT INTO `7_follows` (`followId`, `followStatus`) VALUES
(6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `7_likes`
--

CREATE TABLE `7_likes` (
  `likeId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `7_likes`
--

INSERT INTO `7_likes` (`likeId`) VALUES
(3);

-- --------------------------------------------------------

--
-- Table structure for table `gweets`
--

CREATE TABLE `gweets` (
  `gweetId` int NOT NULL COMMENT 'unique gweet identifier',
  `gweetAuthor` int NOT NULL COMMENT 'gweet author id',
  `gweetContent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'gweet content',
  `gweetDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'gweet upload date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gweets`
--

INSERT INTO `gweets` (`gweetId`, `gweetAuthor`, `gweetContent`, `gweetDate`) VALUES
(1, 6, 'hello world', '2024-03-23 12:08:50'),
(2, 7, 'nice to meet you', '2024-03-23 12:20:52'),
(3, 9, 'time runs', '2024-03-23 15:49:11'),
(4, 9, 'like i said', '2024-03-23 15:50:32'),
(5, 6, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit harum dicta necessitatibus, numquam quis facere, tempora natus iusto praesentium vero ab, saepe impedit tenetur. Eaque officia, enim beatae culpa quam harum repudiandae at ex porro in id, nulla totam quibusdam suscipi', '2024-03-23 22:41:49'),
(6, 6, 'lol', '2024-03-24 00:18:20'),
(8, 6, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit harum dicta necessitatibus, numquam quis facere, tempora natus iusto praesentium vero ab, saepe impedit tenetur. Eaque officia, enim beatae culpa quam harum repudiandae at ex porro in id, nulla totam quibusdam suscipi', '2024-03-24 00:51:34');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int NOT NULL COMMENT 'Unique user identifier',
  `userName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'New user' COMMENT 'Unique user name',
  `userEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Unique user email address',
  `userPassword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'User password',
  `userJoined` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Date of account creation',
  `userBio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Hello, I''m using Gwitter' COMMENT 'Short profile description',
  `userColor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '#ffffff' COMMENT 'Profile color'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userName`, `userEmail`, `userPassword`, `userJoined`, `userBio`, `userColor`) VALUES
(6, 'aa', 'a@a', 'aa', '2024-03-22 17:08:26', 'Hello, I\'m using Gwitter', '#007fff'),
(7, 'bb', 'b@b', 'bb', '2024-03-22 17:12:02', 'Hello, I\'m using Gwitter', '#ff0000'),
(9, 'cc', 'c@c', 'cc', '2024-03-22 18:39:47', 'Hello, I\'m using Gwitter', '#adff2f');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gweets`
--
ALTER TABLE `gweets`
  ADD PRIMARY KEY (`gweetId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gweets`
--
ALTER TABLE `gweets`
  MODIFY `gweetId` int NOT NULL AUTO_INCREMENT COMMENT 'unique gweet identifier', AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int NOT NULL AUTO_INCREMENT COMMENT 'Unique user identifier', AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 25, 2024 at 10:15 PM
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
-- Table structure for table `21_follows`
--

CREATE TABLE `21_follows` (
  `followId` int NOT NULL COMMENT 'Following user identifier',
  `followStatus` int NOT NULL COMMENT 'Follow status (\r\n0: following id,\r\n1: followed by id,\r\n2: both)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `21_follows`
--

INSERT INTO `21_follows` (`followId`, `followStatus`) VALUES
(22, 1),
(24, 2);

-- --------------------------------------------------------

--
-- Table structure for table `21_likes`
--

CREATE TABLE `21_likes` (
  `likeId` int NOT NULL COMMENT 'Liked gweet identifier '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `21_likes`
--

INSERT INTO `21_likes` (`likeId`) VALUES
(19),
(11);

-- --------------------------------------------------------

--
-- Table structure for table `22_follows`
--

CREATE TABLE `22_follows` (
  `followId` int NOT NULL COMMENT 'Following user identifier',
  `followStatus` int NOT NULL COMMENT 'Follow status (\r\n0: following id,\r\n1: followed by id,\r\n2: both)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `22_follows`
--

INSERT INTO `22_follows` (`followId`, `followStatus`) VALUES
(21, 0),
(24, 0);

-- --------------------------------------------------------

--
-- Table structure for table `22_likes`
--

CREATE TABLE `22_likes` (
  `likeId` int NOT NULL COMMENT 'Liked gweet identifier '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `22_likes`
--

INSERT INTO `22_likes` (`likeId`) VALUES
(11),
(17),
(24);

-- --------------------------------------------------------

--
-- Table structure for table `23_follows`
--

CREATE TABLE `23_follows` (
  `followId` int NOT NULL COMMENT 'Following user identifier',
  `followStatus` int NOT NULL COMMENT 'Follow status (\r\n0: following id,\r\n1: followed by id,\r\n2: both)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `23_follows`
--

INSERT INTO `23_follows` (`followId`, `followStatus`) VALUES
(24, 0);

-- --------------------------------------------------------

--
-- Table structure for table `23_likes`
--

CREATE TABLE `23_likes` (
  `likeId` int NOT NULL COMMENT 'Liked gweet identifier '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `23_likes`
--

INSERT INTO `23_likes` (`likeId`) VALUES
(13),
(14);

-- --------------------------------------------------------

--
-- Table structure for table `24_follows`
--

CREATE TABLE `24_follows` (
  `followId` int NOT NULL COMMENT 'Following user identifier',
  `followStatus` int NOT NULL COMMENT 'Follow status (\r\n0: following id,\r\n1: followed by id,\r\n2: both)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `24_follows`
--

INSERT INTO `24_follows` (`followId`, `followStatus`) VALUES
(21, 2),
(22, 1),
(25, 0),
(23, 1);

-- --------------------------------------------------------

--
-- Table structure for table `24_likes`
--

CREATE TABLE `24_likes` (
  `likeId` int NOT NULL COMMENT 'Liked gweet identifier '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `24_likes`
--

INSERT INTO `24_likes` (`likeId`) VALUES
(12),
(15),
(26);

-- --------------------------------------------------------

--
-- Table structure for table `25_follows`
--

CREATE TABLE `25_follows` (
  `followId` int NOT NULL COMMENT 'Following user identifier',
  `followStatus` int NOT NULL COMMENT 'Follow status (\r\n0: following id,\r\n1: followed by id,\r\n2: both)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `25_follows`
--

INSERT INTO `25_follows` (`followId`, `followStatus`) VALUES
(24, 1);

-- --------------------------------------------------------

--
-- Table structure for table `25_likes`
--

CREATE TABLE `25_likes` (
  `likeId` int NOT NULL COMMENT 'Liked gweet identifier '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `25_likes`
--

INSERT INTO `25_likes` (`likeId`) VALUES
(15);

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
(11, 21, 'Hello World - 1972', '2024-03-25 21:21:52'),
(12, 21, 'Guys please follow the Gwitter guidelines', '2024-03-25 21:25:20'),
(13, 23, 'wassup guys get ready to be r3kt !!1!1', '2024-03-25 21:33:09'),
(14, 24, 'hi guys ~', '2024-03-25 21:42:43'),
(15, 24, 'Gwitter looks amazing !', '2024-03-25 21:42:53'),
(16, 23, 'heyyy girl (*￣3￣)╭', '2024-03-25 21:51:13'),
(17, 24, 'Eww.. stay away from me', '2024-03-25 21:53:27'),
(18, 21, 'hello miss', '2024-03-25 21:54:25'),
(19, 21, 'augh this community  will become like the others :(', '2024-03-25 21:55:10'),
(20, 23, 'HEY! don\'t criticize my W rizz   ￣へ￣', '2024-03-25 21:56:39'),
(21, 22, 'Hello everyone, I just want to say that my new restaurant opens tomorrow. Freddy and his gang are waiting for you at the pizza party, so come and join us !', '2024-03-25 21:59:40'),
(22, 24, 'PIZZA ?? yay I\'m in !', '2024-03-25 22:03:27'),
(23, 23, 'FOOD ?22?? bouta bring the bois w me !', '2024-03-25 22:04:33'),
(24, 21, 'I don\'t trust you.', '2024-03-25 22:05:43'),
(25, 22, 'Why are you saying that ? Friend ?', '2024-03-25 22:06:25'),
(26, 25, 'meow ?', '2024-03-25 22:06:57'),
(27, 24, 'awwwwwwwwwwwwwwwwwwwwwwwwwwww~ there\'s a kitty cat =￣ω￣=', '2024-03-25 22:08:08'),
(28, 23, 'it\'s not nyancat tho :\'\'(', '2024-03-25 22:10:54');

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
(21, 'thatannoyingadmin', 'taa@gmail.com', 'd0ty0ud4r3', '2024-03-25 21:19:01', 'Hello, I\'m using Gwitter', '#ff0000'),
(22, 'williamafton', 'william.afton@fazbear.com', '6ur6l39u1', '2024-03-25 21:27:00', 'Hi kids, I\'m a senior manager with a brilliant career in fast-food restauration', '#a000ff'),
(23, 'supernoob2005', 'noob2005@hotmail.com', 'pleasedontbemeany', '2024-03-25 21:30:36', 'please don\'t be mean please don\'t be mean please don\'t be mean please don\'t be mean please don\'t be mean please don\'t be mean please don\'t be mean please don\'t be mean please don\'t be mean please don\'t be mean please don\'t be mean please don\'t be mean', '#00ffc8'),
(24, 'sleepybeauty', 'sl33py@outlook.com', 'sl339ym3', '2024-03-25 21:39:45', 'Hi ~ I like pancakes and I\'m sleepy (✿◠‿◠)', '#ffbeff'),
(25, 'pussinboots', 'therealpuss@gmaim.com', 'm3ow', '2024-03-25 21:44:30', 'Hello, I\'m using Gwitter', '#1eff00');

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
  MODIFY `gweetId` int NOT NULL AUTO_INCREMENT COMMENT 'unique gweet identifier', AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int NOT NULL AUTO_INCREMENT COMMENT 'Unique user identifier', AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

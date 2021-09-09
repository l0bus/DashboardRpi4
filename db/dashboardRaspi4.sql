-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 09, 2021 at 04:06 PM
-- Server version: 10.5.11-MariaDB-1
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dashboardRaspi4`
--

-- --------------------------------------------------------

--
-- Table structure for table `campos_log`
--

CREATE TABLE `campos_log` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `cod` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `campos_log`
--

INSERT INTO `campos_log` (`id`, `descripcion`, `cod`) VALUES
(1, 'Usado en CC', 'NIVEL_COMBUSTIBLE'),
(2, 'Usado en CC', 'NIVEL_AGUA'),
(3, 'Usado en CC', 'HOROMETRO'),
(4, 'Usado en CC', 'SWITCH_ACEITE_MOTOR'),
(5, 'Usado en CC', 'T6'),
(6, 'Usado en CC', 'T7'),
(7, 'Usado en CC', 'T8'),
(8, 'Usado en CC', 'T9'),
(9, 'Usado en CC', 'T10'),
(10, 'Usado en CC', 'T11'),
(11, 'Usado en CC', 'T12'),
(12, 'Usado en CC', 'T13'),
(13, 'Usado en CC', 'T14'),
(14, 'Usado en CC', 'T15'),
(15, 'Usado en CC', 'T16'),
(16, 'Usado en CC', 'T17'),
(17, 'Usado en CC', 'T18'),
(18, 'Usado en CC', 'T19'),
(19, 'Usado en CC', 'T20'),
(20, 'Usado en CC', 'T21'),
(21, 'Usado en CC', 'ST_MOTOR'),
(22, 'Usado en CC', 'ST_SIS_MEGA'),
(23, 'Usado en CC', 'ST_BOMBA'),
(24, 'Usado en CC', 'ST_MONITOR'),
(25, 'Usado en CC', 'ST_ASP1'),
(26, 'Usado en CC', 'ST_ASP2'),
(27, 'Usado en CC', 'ST_ASP3'),
(28, 'Usado en CC', 'ST_ASP4'),
(29, 'Usado en CC', 'ST_CARRETE'),
(30, 'Usado en CC', 'ST_DESCARGA'),
(31, NULL, 'T32'),
(32, NULL, 'T33'),
(33, NULL, 'T34'),
(34, NULL, 'T35'),
(35, NULL, 'T36'),
(36, NULL, 'T37'),
(37, NULL, 'T38'),
(38, NULL, 'T39'),
(39, NULL, 'T40'),
(40, NULL, 'T41'),
(41, NULL, 'T42'),
(42, NULL, 'T43'),
(43, NULL, 'T44'),
(44, NULL, 'T45'),
(45, NULL, 'T46'),
(46, NULL, 'T47'),
(47, NULL, 'T48'),
(48, NULL, 'T49'),
(49, NULL, 'T50'),
(50, NULL, 'T51'),
(51, 'Usado en CC', 'GPS_TIEMPO'),
(52, 'Usado en CC', 'LATITUD'),
(53, 'Usado en CC', 'HEMISFERIO'),
(54, 'Usado en CC', 'LONGITUD'),
(55, 'Usado en CC', 'MERIDIANO'),
(56, 'Usado en CC', 'ALTITUD'),
(57, 'Usado en CC', 'ALT_MEDIDA'),
(58, 'Usado en CC', 'VELOCIDAD'),
(59, 'Usado en LB', 'EQUIPO_ENCENDIDO'),
(74, 'Usado en P', 'THD_PhaseACurrent'),
(75, 'Usado en P', 'THD_PhaseAtoBVoltage'),
(76, 'Usado en P', 'THD_PhaseBCurrent'),
(77, 'Usado en P', 'THD_PhaseBtoC'),
(78, 'Usado en P', 'THD_PhaseCCurrent'),
(79, 'Usado en P', 'THD_PhaseCtoAVoltage'),
(80, 'Usado en P', 'THD_PhaseACurrent%'),
(81, 'Usado en P', 'THD_PhaseAtoBVoltage%'),
(82, 'Usado en P', 'THD_PhaseBCurrent%'),
(83, 'Usado en P', 'THD_PhaseBtoC%'),
(84, 'Usado en P', 'THD_PhaseCCurrent%'),
(85, 'Usado en P', 'THD_PhaseCtoAVoltage%'),
(86, 'Usado en P', 'IA'),
(87, 'Usado en P', 'IB'),
(88, 'Usado en P', 'IC'),
(89, 'Usado en P', 'VAB'),
(90, 'Usado en P', 'VBC'),
(91, 'Usado en P', 'VCA'),
(92, 'Usado en P', 'Real_Power'),
(93, 'Usado en P', 'Reactive_Power'),
(94, 'Usado en P', 'Apparent_Power'),
(95, 'Usado en P', 'PFd'),
(96, 'Usado en P', 'PFa'),
(97, 'Usado en P', 'Frequency'),
(98, 'Usado en P', 'Real_Forward_Energy'),
(99, 'Usado en P', 'Real_Reverse_Energy'),
(100, 'Usado en P', 'Real_Net_Energy'),
(101, 'Usado en P', 'Real_Total_Energy'),
(102, 'Usado en P', 'Apparent_Energy'),
(103, 'Usado en P', 'Reactive_Delivered_Energy'),
(104, 'Usado en P', 'Reactive_Received_Energy'),
(105, 'Usado en P', 'Reactive_Net_Energy'),
(106, 'Usado en P', 'Reactive_Total_Energy'),
(107, 'Usado en TRAC', 'ENCENDIDO'),
(108, 'Usado en TRAC', 'DIST'),
(109, 'Usado en TRAC', 'HORASXTURNO'),
(110, 'Usado en TRAC', 'RALENTIXTURNO'),
(111, 'Usado en TRAC', 'OPERATIVOXTURNO'),
(112, 'Usado en TRAC', '');

-- --------------------------------------------------------

--
-- Table structure for table `equipos`
--

CREATE TABLE `equipos` (
  `id` int(11) NOT NULL,
  `cod` varchar(50) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `tipo` int(11) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `log_equipos_data`
--

CREATE TABLE `log_equipos_data` (
  `id` int(11) NOT NULL,
  `key_id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `log_equipos_reg`
--

CREATE TABLE `log_equipos_reg` (
  `id` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `fecha_sis` datetime NOT NULL,
  `fecha_registro` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tipo_equipos`
--

CREATE TABLE `tipo_equipos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `cod` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tipo_equipos`
--

INSERT INTO `tipo_equipos` (`id`, `nombre`, `cod`, `descripcion`) VALUES
(1, NULL, 'CC', NULL),
(2, NULL, 'P', NULL),
(3, NULL, 'LB', NULL),
(4, NULL, 'PER', NULL),
(5, NULL, 'TRAC', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campos_log`
--
ALTER TABLE `campos_log`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cod` (`cod`);

--
-- Indexes for table `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cod` (`cod`);

--
-- Indexes for table `log_equipos_data`
--
ALTER TABLE `log_equipos_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log_equipos_reg`
--
ALTER TABLE `log_equipos_reg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tipo_equipos`
--
ALTER TABLE `tipo_equipos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cod` (`cod`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campos_log`
--
ALTER TABLE `campos_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `log_equipos_data`
--
ALTER TABLE `log_equipos_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `log_equipos_reg`
--
ALTER TABLE `log_equipos_reg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tipo_equipos`
--
ALTER TABLE `tipo_equipos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

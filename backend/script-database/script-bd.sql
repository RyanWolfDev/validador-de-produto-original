-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 22, 2020 at 10:49 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `CLIENTE_NAME`
--

-- --------------------------------------------------------

--
-- Table structure for table `adm`
--

CREATE TABLE `adm` (
  `id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `autorizacao`
--

CREATE TABLE `autorizacao` (
  `id` int(11) NOT NULL,
  `token_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `produto`
--

CREATE TABLE `produto` (
  `id` int(11) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `imagemUrl` varchar(255) DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `produto_id` int(11) NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adm`
--
ALTER TABLE `adm`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `senha` (`senha`);

--
-- Indexes for table `autorizacao`
--
ALTER TABLE `autorizacao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `autorizacao_ibfk_1` (`token_id`),
  ADD KEY `autorizacao_ibfk_2` (`cliente_id`);

--
-- Indexes for table `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `produto_id` (`produto_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adm`
--
ALTER TABLE `adm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `autorizacao`
--
ALTER TABLE `autorizacao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produto`
--
ALTER TABLE `produto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `autorizacao`
--
ALTER TABLE `autorizacao`
  ADD CONSTRAINT `autorizacao_ibfk_1` FOREIGN KEY (`token_id`) REFERENCES `token` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `autorizacao_ibfk_2` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `token_ibfk_1` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`id`) ON DELETE CASCADE;

INSERT INTO `adm`(`id`, `login`, `senha`, `ativo`, `createdAt`, `updatedAt`) VALUES (1,'admin','$2a$10$IcG1jfZMugwAoeO50OaaW.9/G5Kvk.dOQmm.rvM7SivTjpQKrGp7q',true, now(), now())

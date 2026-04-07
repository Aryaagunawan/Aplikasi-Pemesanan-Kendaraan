-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Apr 2026 pada 15.46
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `armadapro_db1`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` int(11) NOT NULL,
  `user_name` varchar(150) NOT NULL,
  `action` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `user_name`, `action`, `created_at`) VALUES
(1, 'Administrator (Pool)', 'Menambahkan armada baru: Josen (Palisade 2025)', '2026-04-07 11:24:34'),
(2, 'Administrator (Pool)', 'Menambahkan armada baru: Hercules (Inova Reborn 2025)', '2026-04-07 11:28:22'),
(3, 'Administrator (Pool)', 'Membuat pesanan baru untuk Johanesles', '2026-04-07 11:29:10'),
(4, 'Bapak Manager (Approver 1)', 'Menyetujui pesanan ID #15 level 1', '2026-04-07 11:46:23'),
(5, 'Bapak Direktur (Approver 2)', 'Menyetujui pesanan ID #15 level 2', '2026-04-07 11:46:44'),
(6, 'Administrator (Pool)', 'Menambahkan armada baru: Gerald ( Toyota Reborn 2024 )', '2026-04-07 11:49:33'),
(7, 'Administrator (Pool)', 'Membuat pesanan baru untuk Butler', '2026-04-07 11:50:15'),
(8, 'Bapak Manager (Approver 1)', 'Menyetujui pesanan ID #16 level 1', '2026-04-07 11:50:53'),
(9, 'Bapak Direktur (Approver 2)', 'Menyetujui pesanan ID #16 level 2', '2026-04-07 11:51:10'),
(10, 'Administrator (Pool)', 'Membuat pesanan baru untuk statham', '2026-04-07 11:54:48'),
(11, 'Bapak Manager (Approver 1)', 'Menyetujui pesanan ID #17 level 1', '2026-04-07 11:57:31'),
(12, 'Bapak Direktur (Approver 2)', 'Menyetujui pesanan ID #17 level 2', '2026-04-07 11:58:05'),
(13, 'Administrator (Pool)', 'Menambahkan armada baru: Tones ( Roy Royce 2026 )', '2026-04-07 12:01:17'),
(14, 'Administrator (Pool)', 'Membuat pesanan baru untuk Yan', '2026-04-07 12:02:09'),
(15, 'Bapak Manager (Approver 1)', 'Menyetujui pesanan ID #18 level 1', '2026-04-07 12:02:49'),
(16, 'Bapak Direktur (Approver 2)', 'Menyetujui pesanan ID #18 level 2', '2026-04-07 12:03:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `employee_name` varchar(150) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `approver1_id` int(11) NOT NULL,
  `approver2_id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'Menunggu Persetujuan 1',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `bookings`
--

INSERT INTO `bookings` (`id`, `employee_name`, `vehicle_id`, `driver_id`, `start_date`, `end_date`, `approver1_id`, `approver2_id`, `status`, `created_at`) VALUES
(1, 'Rina (Staff IT)', 3, 1, '2024-03-01', '2024-03-03', 2, 3, 'Disetujui', '2026-04-06 16:24:26'),
(2, 'Joko (Teknisi)', 1, 2, '2024-03-05', '2024-03-07', 2, 3, 'Menunggu Persetujuan 1', '2026-04-06 16:24:26'),
(8, 'arye1', 5, 4, '2026-04-07', '2026-04-07', 2, 3, 'Dibatalkan', '2026-04-07 07:15:51'),
(9, 'arye1', 5, 1, '2026-04-07', '2026-04-07', 2, 3, 'Dibatalkan', '2026-04-07 07:16:17'),
(10, 'arye', 5, 1, '2026-04-08', '2026-04-07', 2, 3, 'Dibatalkan', '2026-04-07 07:23:31'),
(11, 'arye', 5, 2, '2026-04-07', '2026-04-07', 4, 5, 'Dibatalkan', '2026-04-07 07:43:08'),
(12, 'arye', 2, 1, '2026-04-07', '2026-04-07', 2, 3, 'Dibatalkan', '2026-04-07 07:44:53'),
(13, 'arye', 1, 6, '2026-04-07', '2026-04-08', 2, 3, 'Menunggu Persetujuan 1', '2026-04-07 08:13:42'),
(14, 'arye12', 3, 1, '2026-04-07', '2026-04-08', 2, 3, 'Disetujui', '2026-04-07 08:37:23'),
(15, 'Johanesles', 8, 4, '2026-04-07', '2026-04-14', 2, 3, 'Disetujui', '2026-04-07 11:29:10'),
(16, 'Butler', 9, 2, '2026-04-07', '2026-04-14', 2, 3, 'Disetujui', '2026-04-07 11:50:15'),
(17, 'statham', 5, 4, '2026-04-08', '2026-04-15', 2, 3, 'Disetujui', '2026-04-07 11:54:48'),
(18, 'Yan', 10, 5, '2026-04-09', '2026-04-23', 2, 3, 'Disetujui', '2026-04-07 12:02:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `drivers`
--

CREATE TABLE `drivers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `drivers`
--

INSERT INTO `drivers` (`id`, `name`, `created_at`) VALUES
(1, 'Sutrisno', '2026-04-06 16:24:26'),
(2, 'Bambang', '2026-04-06 16:24:26'),
(3, 'Andi', '2026-04-06 16:24:26'),
(4, 'Yanto', '2026-04-06 16:24:26'),
(5, 'Heri', '2026-04-06 16:24:26'),
(6, 'Budi', '2026-04-06 16:24:26'),
(7, 'Agus', '2026-04-06 16:24:26'),
(8, 'Dodi', '2026-04-06 16:24:26');

-- --------------------------------------------------------

--
-- Struktur dari tabel `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `user_name` varchar(150) NOT NULL,
  `action` text NOT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `logs`
--

INSERT INTO `logs` (`id`, `user_name`, `action`, `timestamp`) VALUES
(1, 'Administrator (Pool)', 'Membuat data awal sistem', '2026-04-06 23:24:26'),
(2, 'Bapak Manager (Approver 1)', 'Menyetujui pesanan seed data', '2026-04-06 23:24:26'),
(3, 'Administrator (Pool)', 'Membuat pesanan baru untuk arye', '2026-04-07 13:37:32'),
(4, 'Administrator (Pool)', 'Membuat pesanan baru untuk arye1', '2026-04-07 13:38:46'),
(5, 'Administrator (Pool)', 'Membuat pesanan baru untuk arye12', '2026-04-07 13:43:48'),
(6, 'Administrator (Pool)', 'Membuat pesanan baru untuk arye1qq', '2026-04-07 13:53:39'),
(7, 'Administrator (Pool)', 'Membatalkan pesanan ID #6', '2026-04-07 14:08:49'),
(8, 'Administrator (Pool)', 'Membatalkan pesanan ID #5', '2026-04-07 14:08:54'),
(9, 'Administrator (Pool)', 'Membatalkan pesanan ID #4', '2026-04-07 14:13:52'),
(10, 'Administrator (Pool)', 'Membuat pesanan baru untuk arye', '2026-04-07 14:14:20'),
(11, 'Administrator (Pool)', 'Membatalkan pesanan ID #7', '2026-04-07 14:14:22'),
(12, 'Administrator (Pool)', 'Membatalkan pesanan ID #3', '2026-04-07 14:14:31'),
(13, 'Administrator (Pool)', 'Membuat pesanan baru untuk arye1', '2026-04-07 14:15:51'),
(14, 'Administrator (Pool)', 'Membatalkan pesanan ID #8', '2026-04-07 14:15:55'),
(15, 'Administrator (Pool)', 'Membuat pesanan baru untuk arye1', '2026-04-07 14:16:17'),
(16, 'Administrator (Pool)', 'Membatalkan pesanan ID #9', '2026-04-07 14:18:52'),
(17, 'Administrator (Pool)', 'Membuat pesanan baru untuk arye', '2026-04-07 14:23:31'),
(18, 'Administrator (Pool)', 'Membatalkan pesanan ID #10', '2026-04-07 14:23:33'),
(19, 'Administrator (Pool)', 'Membuat pesanan baru untuk arye', '2026-04-07 14:43:08'),
(20, 'Administrator (Pool)', 'Membatalkan pesanan ID #11', '2026-04-07 14:44:29'),
(21, 'Administrator (Pool)', 'Membuat pesanan baru untuk arye', '2026-04-07 14:44:53'),
(22, 'Administrator (Pool)', 'Menambahkan armada baru: steven', '2026-04-07 15:09:28'),
(23, 'Administrator (Pool)', 'Membatalkan pesanan ID #12', '2026-04-07 15:13:14'),
(24, 'Administrator (Pool)', 'Membuat pesanan baru untuk arye', '2026-04-07 15:13:42'),
(25, 'Administrator (Pool)', 'Membuat pesanan baru untuk arye12', '2026-04-07 15:37:24'),
(26, 'Bapak Manager (Approver 1)', 'Menyetujui pesanan ID #14', '2026-04-07 16:01:16'),
(27, 'Bapak Direktur (Approver 2)', 'Menyetujui pesanan ID #14', '2026-04-07 16:01:31');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','approver') NOT NULL,
  `level_approval` int(11) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `level_approval`, `name`, `created_at`) VALUES
(1, 'admin', 'password', 'admin', NULL, 'Administrator (Pool)', '2026-04-06 16:24:26'),
(2, 'manager', 'password', 'approver', 1, 'Bapak Manager (Approver 1)', '2026-04-06 16:24:26'),
(3, 'direktur', 'password', 'approver', 2, 'Bapak Direktur (Approver 2)', '2026-04-06 16:24:26'),
(4, 'spv', 'password', 'approver', 1, 'Supervisor Tambang (Approver 1)', '2026-04-06 16:24:26'),
(5, 'gm', 'password', 'approver', 2, 'GM Operasional (Approver 2)', '2026-04-06 16:24:26');

-- --------------------------------------------------------

--
-- Struktur dari tabel `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `type` varchar(100) NOT NULL,
  `owner` varchar(100) NOT NULL,
  `fuel` decimal(10,2) NOT NULL,
  `last_service` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `vehicles`
--

INSERT INTO `vehicles` (`id`, `name`, `type`, `owner`, `fuel`, `last_service`, `created_at`) VALUES
(1, 'Toyota Hilux (Tambang A)', 'Angkutan Barang', 'Milik Perusahaan', 15.50, '2023-10-01', '2026-04-06 16:24:26'),
(2, 'Mitsubishi Triton (Tambang B)', 'Angkutan Barang', 'Sewa', 12.00, '2023-11-15', '2026-04-06 16:24:26'),
(3, 'Toyota Avanza (Kantor Pusat)', 'Angkutan Orang', 'Milik Perusahaan', 8.50, '2024-01-10', '2026-04-06 16:24:26'),
(4, 'Innova Reborn (Cabang)', 'Angkutan Orang', 'Sewa', 10.20, '2023-12-05', '2026-04-06 16:24:26'),
(5, 'Ford Ranger (Tambang C)', 'Angkutan Barang', 'Milik Perusahaan', 14.00, '2024-02-20', '2026-04-06 16:24:26'),
(6, 'steven', 'Angkutan Barang', 'Milik Perusahaan', 12.00, '2026-03-31', '2026-04-07 08:09:28'),
(7, 'Josen (Palisade 2025)', 'Angkutan Orang', 'Milik Perusahaan', 50.00, '2026-04-07', '2026-04-07 11:24:34'),
(8, 'Hercules (Inova Reborn 2025)', 'Angkutan Orang', 'Milik Perusahaan', 50.00, '2026-04-07', '2026-04-07 11:28:22'),
(9, 'Gerald ( Toyota Reborn 2024 )', 'Angkutan Orang', 'Milik Perusahaan', 60.00, '2026-04-07', '2026-04-07 11:49:33'),
(10, 'Tones ( Roy Royce 2026 )', 'Angkutan Orang', 'Milik Perusahaan', 90.00, '2026-04-08', '2026-04-07 12:01:17');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_id` (`vehicle_id`),
  ADD KEY `driver_id` (`driver_id`),
  ADD KEY `approver1_id` (`approver1_id`),
  ADD KEY `approver2_id` (`approver2_id`);

--
-- Indeks untuk tabel `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indeks untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`id`),
  ADD CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`approver1_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `bookings_ibfk_4` FOREIGN KEY (`approver2_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

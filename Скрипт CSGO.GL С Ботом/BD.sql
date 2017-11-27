-- phpMyAdmin SQL Dump
-- version 4.4.6.1
-- http://www.phpmyadmin.net
--
-- Хост: a144349.mysql.mchost.ru
-- Время создания: Июн 18 2015 г., 13:25
-- Версия сервера: 5.6.23-72.1-1-beget-log
-- Версия PHP: 5.5.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `fb7909g3_csgo`
--

-- --------------------------------------------------------

--
-- Структура таблицы `game1`
--
-- Создание: Июн 17 2015 г., 20:37
-- Последнее обновление: Июн 17 2015 г., 22:07
-- Последняя проверка: Июн 17 2015 г., 21:24
--

DROP TABLE IF EXISTS `game1`;
CREATE TABLE IF NOT EXISTS `game1` (
  `id` int(11) NOT NULL,
  `userid` varchar(70) NOT NULL,
  `username` varchar(70) NOT NULL,
  `item` text,
  `color` text,
  `value` text,
  `avatar` varchar(512) NOT NULL,
  `image` text NOT NULL,
  `from` text NOT NULL,
  `to` text NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `games`
--
-- Создание: Июн 17 2015 г., 20:37
-- Последнее обновление: Июн 17 2015 г., 20:37
-- Последняя проверка: Июн 17 2015 г., 21:24
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL DEFAULT '0',
  `starttime` int(11) NOT NULL,
  `cost` text,
  `winner` varchar(128) NOT NULL,
  `userid` varchar(70) NOT NULL,
  `percent` varchar(10) DEFAULT NULL,
  `itemsnum` int(11) NOT NULL,
  `module` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `games`
--

INSERT INTO `games` (`id`, `starttime`, `cost`, `winner`, `userid`, `percent`, `itemsnum`, `module`) VALUES
(1, 2147483647, '0', '', '', NULL, 0, '');

-- --------------------------------------------------------

--
-- Структура таблицы `info`
--
-- Создание: Июн 17 2015 г., 20:37
-- Последнее обновление: Июн 17 2015 г., 20:37
-- Последняя проверка: Июн 17 2015 г., 21:24
--

DROP TABLE IF EXISTS `info`;
CREATE TABLE IF NOT EXISTS `info` (
  `name` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `info`
--

INSERT INTO `info` (`name`, `value`) VALUES
('current_game', '1'),
('state', 'waiting'),
('rake', '10'),
('minbet', '0.3'),
('maxitems', '10');

-- --------------------------------------------------------

--
-- Структура таблицы `items`
--
-- Создание: Июн 17 2015 г., 20:38
-- Последнее обновление: Июн 17 2015 г., 20:38
-- Последняя проверка: Июн 17 2015 г., 21:24
--

DROP TABLE IF EXISTS `items`;
CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `cost` text NOT NULL,
  `lastupdate` text NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--
-- Создание: Июн 17 2015 г., 21:25
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `steamid` varchar(70) NOT NULL,
  `tlink` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`steamid`, `tlink`) VALUES
('76561198065726460', 'https://steamcommunity.com/tradeoffer/new/?partner=105460732&token=uVTjEz69'),
('76561198208238800', 'https://steamcommunity.com/tradeoffer/new/?partner=247973072&token=JCJEgsqd'),
('76561198108423540', 'https://steamcommunity.com/tradeoffer/new/?partner=148157812&token=J8g4qGhZ');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `game1`
--
ALTER TABLE `game1`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`name`);

--
-- Индексы таблицы `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `game1`
--
ALTER TABLE `game1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=40;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

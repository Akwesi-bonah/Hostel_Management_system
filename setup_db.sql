-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS HMS_DB;
CREATE USER IF NOT EXISTS 'akwesi-bona'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON ``.* TO 'akwesi-bona'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'akwesi-bona'@'localhost';
FLUSH PRIVILEGES;

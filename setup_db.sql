-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS hms_db;
CREATE USER IF NOT EXISTS 'akwesi'@'localhost' IDENTIFIED BY 'akwesi_pwd';
GRANT ALL PRIVILEGES ON `hms_db`.* TO 'akwesi'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'akwesi'@'localhost';
FLUSH PRIVILEGES;
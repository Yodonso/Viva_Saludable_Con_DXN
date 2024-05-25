CREATE DATABASE Vida_Saludable;

USE Vida_Saludable;

CREATE TABLE Productos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    imagen VARCHAR(50) NOT NULL,
    precio INT(6) NOT NULL,
    oferta INT(6) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    categoria VARCHAR(20) NOT NULL
);

--------------------
SELECT * FROM personas;

CREATE USER 'prueba01'@'localhost' IDENTIFIED BY 'prueba01';


GRANT ALL PRIVILEGES ON prueba01.* TO 'prueba01'@'localhost';

GRANT ALL PRIVILEGES ON *.* TO 'prueba01'@'localhost';

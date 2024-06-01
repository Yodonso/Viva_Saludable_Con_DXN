--crea la tabla 
CREATE DATABASE Vida_Saludable;

USE Vida_Saludable;

CREATE TABLE Productos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,  
    precio INT(6) NOT NULL,
    oferta INT(6) NOT NULL,
    stop INT(6) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    categoria VARCHAR(20) NOT NULL,
    imagen VARCHAR(50) NOT NULL
);

USE Vida_Saludable;

CREATE TABLE Clientes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono BIGINT NOT NULL,
    email VARCHAR(50) NOT NULL
    );

USE Vida_Saludable;

CREATE TABLE Categoria(
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(30) NOT NULL,
     );
--------------------
SELECT * FROM Productos;

--- crea usuario y contraseña de la tabla 
CREATE USER 'Vida_Saludable'@'localhost' IDENTIFIED BY 'Vida_Saludable';

-- crea privilegios parciales 
GRANT ALL PRIVILEGES ON Vida_Saludable.* TO 'Vida_Saludable'@'localhost';

-- crea privilegios Totales
GRANT ALL PRIVILEGES ON *.* TO 'Vida_Saludable'@'localhost';
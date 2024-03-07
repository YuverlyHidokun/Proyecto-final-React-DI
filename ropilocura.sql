ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Hidokun2003.y';

create database ropilocura
use ropilocura
drop database ropilocura

-- Tabla de Clientes
CREATE TABLE Clientes (
    ID_Cliente INT auto_increment PRIMARY KEY,
    Nombre VARCHAR(50),
    Apellido VARCHAR(50),
    Email VARCHAR(100),
    Telefono VARCHAR(15),
    Direccion VARCHAR(255)
);

-- Tabla de Productos
CREATE TABLE Productos (
    ID_Producto INT auto_increment PRIMARY KEY,
    Nombre VARCHAR(100),
    Descripcion VARCHAR(255),
    Precio DECIMAL(10, 2),
    Cantidad_Disponible INT,
    Talla VARCHAR(10),
    Color VARCHAR(50),
    Proveedor INT,
    FOREIGN KEY (Proveedor) REFERENCES Proveedores(ID_Proveedor)
);

-- Tabla de Empleados
CREATE TABLE Empleados (
    ID_Empleado INT auto_increment PRIMARY KEY,
    Nombre VARCHAR(50),
    Apellido VARCHAR(50),
    Email VARCHAR(100),
    Telefono VARCHAR(15),
    Direccion VARCHAR(255)
);

-- Tabla de Proveedores
CREATE TABLE Proveedores (
    ID_Proveedor INT auto_increment PRIMARY KEY,
    Nombre VARCHAR(100),
    Contacto VARCHAR(100),
    Telefono VARCHAR(15),
    Direccion VARCHAR(255)
);

-- Tabla de Pedidos
CREATE TABLE Pedidos (
    ID_Pedido INT auto_increment PRIMARY KEY,
    Fecha DATE,
    ID_Cliente INT,
    Total DECIMAL(10, 2),
    ID_Empleado INT,
    FOREIGN KEY (ID_Cliente) REFERENCES Clientes(ID_Cliente),
    FOREIGN KEY (ID_Empleado) REFERENCES Empleados(ID_Empleado)
);

-- Tabla de Detalles de Pedido
CREATE TABLE Detalles_Pedido (
    ID_Detalle INT auto_increment PRIMARY KEY,
    ID_Pedido INT,
    ID_Producto INT,
    Cantidad INT,
    Precio_Unitario DECIMAL(10, 2),
    FOREIGN KEY (ID_Pedido) REFERENCES Pedidos(ID_Pedido),
    FOREIGN KEY (ID_Producto) REFERENCES Productos(ID_Producto)
);

select * from Empleados;

ALTER TABLE Clientes
ADD Contraseña VARCHAR(255);


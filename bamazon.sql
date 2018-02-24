DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,3) NULL,
    stock_quantity INTEGER (10) NULL,
    PRIMARY KEY(item_id)
	);
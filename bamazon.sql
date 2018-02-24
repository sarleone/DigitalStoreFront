DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (50) NOT NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INTEGER (10) NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES
    ('cat food', 'pets', .75, 45),
    ('cat litter', 'pets', 4.25, 20),
    ('banana', 'grocery', .29, 40),
    ('goldfish', 'grocery', 1.79, 25),
    ('dish soap', 'cleaning', 2.39, 20),
    ('mop', 'cleaning', 5.69, 15),
    ('sugar', 'grocery', 2.49, 10),
    ('advil', 'pharmacy', 3.50, 15),
    ('roses', 'flowers', 11.50, 10),
    ('eggs', 'grocery', 3.49, 15)
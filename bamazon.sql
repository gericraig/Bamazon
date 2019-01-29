DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id int AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(100) NOT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)

VALUES 
("Red Dead Redemption 2", "gameing", 59.50, 10),

("Batman: The White Knight", "comics", 25.00, 4),

("iPhone X", "electronic", 700.00, 7),

("X-Files Barbie & Ken", "toys", 40.00, 20),

("Fit-Bit", "active gear", 299.50, 25),

("Spider-Man PS4", "gaming", 59.50, 18),

("Batman: The Killing Joke", "comics", 25.00, 30),

("X-Box One", "electronics", 499.50, 8),

("shark stuff animal", "toys", 15.00, 26),

("Yoga mat", "active gear", 30.00, 35);

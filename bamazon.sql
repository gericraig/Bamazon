DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INTEGER(100) NULL,
  stock_quantity INTEGER (100) NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products 
(product_name, department_name, price, stock_quantity)
VALUES 
("Red Dead Redemption 2", "games", 59, 10),

("Batman: The White Knight", "comics", 25, 4);

("iPhone X", "electronic", 700, 7),

(""),

(""),

(""),

(""),

(""),

(""),

(""),


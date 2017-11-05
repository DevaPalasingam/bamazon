DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;


CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(20),
  department_name VARCHAR(20),
  price DECIMAL(19,4),
  stock_quantity INTEGER(11),
  
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hammer", "Tools", 5.00, 27);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Salt", "Food", 2.70, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cutting Board", "Kitchen", 12.25, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Harry Potter", "Books", 1.98, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Captain Underpants", "Books", 2.88, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chef Knife", "Kitchen", 10.25, 36);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Candy", "Food", .98, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spiderman", "Toy", 23.56, 223);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Thor", "Toy", 21.46, 102);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Scredriver", "Tool", 5.23, 78);

SELECT * FROM products;

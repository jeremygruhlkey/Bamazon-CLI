DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name  VARCHAR(50) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL (6, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id));
    

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wilson Football", "Sporting Goods", 30.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tony Romo Jersey", "Sporting Goods", 250.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Midnight's Children  - Salman Rushdie", "Books", 10.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Wind-Up Bird Chronicle - Haruki Murakami", "Books", 10.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Selfish Gene - Richard Dawkins", "Books", 9.00, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("McGuffin", "Mythical Objects", 2000.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Excalibur", "Mythical Objects", 9000.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Makers Mark - Bourbon", "Booze", 22.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Booker's - Bourbon", "Booze", 32.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Clase Azul - Tequila", "Booze", 30.00, 15);

SELECT * FROM products;
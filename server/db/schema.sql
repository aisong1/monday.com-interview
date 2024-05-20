CREATE DATABASE candleOrders;

use candleOrders;

CREATE TABLE fragances (
  id          VARCHAR(255) NOT NULL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  category    VARCHAR(255) NOT NULL,
  created_at  DATETIME NOT NULL,
  updated_at  DATETIME NOT NULL,
  image_url   VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
  id         INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name  VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
  -- fulfilled_at?
);

CREATE TABLE orders_fragrances (
  id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  orderId     VARCHAR(255) NOT NULL,
  fragranceId VARCHAR(255) NOT NULL,
  FOREIGN KEY (orderId) REFERENCES orders (id),
  FOREIGN KEY (fragranceId) REFERENCES fragances (id)
);

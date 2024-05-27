/*  Execute this file from the command line by typing:
 *    mysql -u root < server/db/schema.sql
 *  to create the database and the tables.*/

DROP DATABASE IF EXISTS candleOrders;
CREATE DATABASE candleOrders;

use candleOrders;

CREATE TABLE fragrances (
  id          VARCHAR(255) NOT NULL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  category    VARCHAR(255) NOT NULL,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  image_url   VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
  id                  VARCHAR(255) NOT NULL PRIMARY KEY,
  first_name          VARCHAR(255) NOT NULL,
  last_name           VARCHAR(255) NOT NULL,
  sales_associate     VARCHAR(255),
  inscription_request VARCHAR(255),
  board_id            INT,
  group_id            VARCHAR(255)
);

CREATE TABLE orders_fragrances (
  order_id     VARCHAR(255) NOT NULL,
  fragrance_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders (id),
  FOREIGN KEY (fragrance_id) REFERENCES fragrances (id),
  PRIMARY KEY (order_id, fragrance_id)
);

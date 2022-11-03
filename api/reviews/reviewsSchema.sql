-- CREATE DATABASE IF NOT EXISTS reviews;
-- CREATE DATABASE reviews;

-- psql -d reviews -a -f /Users/Admin/Desktop/HackReactor/Frontend-Capstone-Ecommerce/api/reviews/reviewsSchema.sql
DROP TABLE IF EXISTS metadata CASCADE;
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS recommend CASCADE;

DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS product_characteristics CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS reviews_characteristics CASCADE;

CREATE TABLE metadata (
  id INT,
  product_id INT UNIQUE,
  PRIMARY KEY(id)
);

CREATE TABLE ratings (
  id INT,
  product_id INT REFERENCES metadata(product_id),
  "1" INT,
  "2" INT,
  "3" INT,
  "4" INT,
  "5" INT,
  PRIMARY KEY(id)
);

CREATE TABLE recommend (
  id INT,
  product_id INT REFERENCES metadata(product_id),
  "false" INT,
  "true" INT,
  PRIMARY KEY(id)
);

CREATE TABLE photos (
  id INT,
  review_id INT,
  url TEXT,
  PRIMARY KEY(id)
);

CREATE TABLE product_characteristics (
  id INT,
  product_id INT REFERENCES metadata(product_id),
  name TEXT,
  PRIMARY KEY(id)
);

CREATE TABLE reviews (
  id INT GENERATED ALWAYS AS IDENTITY,
  product_id INT NOT NULL,
  rating INT,
  date DATE,
  summary TEXT,
  body TEXT,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name TEXT,
  reviewer_email TEXT,
  response TEXT,
  helpfulness INT,
  PRIMARY KEY(id)
);

CREATE TABLE reviews_characteristics (
  id INT,
  characteristic_id INT,
  review_id INT REFERENCES reviews(id),
  value INT,
  PRIMARY KEY(id)
);

-- \COPY reviews FROM './CSV_Files/reviews.csv' DELIMITER ',' CSV HEADER;

-- \COPY photos FROM './CSV_Files/reviews_photos.csv' DELIMITER ',' CSV HEADER;

-- \COPY reviews_characteristics FROM './CSV_Files/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

-- \COPY product_characteristics FROM './CSV_Files/characteristics.csv' DELIMITER ',' CSV HEADER;

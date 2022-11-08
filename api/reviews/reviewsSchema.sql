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

CREATE TABLE product_characteristics (
  id INT,
  product_id INT,
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
  helpfulness INT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE photos (
  id INT,
  review_id INT REFERENCES reviews(id),
  url TEXT,
  PRIMARY KEY(id)
);

CREATE TABLE reviews_characteristics (
  id INT,
  characteristic_id INT,
  review_id INT REFERENCES reviews(id),
  value INT,
  PRIMARY KEY(id)
);


COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/Admin/Desktop/HackReactor/Frontend-Capstone-Ecommerce/api/reviews/CSV_Files/parsedReviews.csv' DELIMITER ',' CSV HEADER;

COPY photos(id, review_id, url) FROM '/Users/Admin/Desktop/HackReactor/Frontend-Capstone-Ecommerce/api/reviews/CSV_Files/reviews_photos.csv' DELIMITER ',' CSV HEADER;

COPY reviews_characteristics(id, characteristic_id, review_id, value) FROM '/Users/Admin/Desktop/HackReactor/Frontend-Capstone-Ecommerce/api/reviews/CSV_Files/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

COPY product_characteristics(id, product_id, name) FROM '/Users/Admin/Desktop/HackReactor/Frontend-Capstone-Ecommerce/api/reviews/CSV_Files/characteristics.csv' DELIMITER ',' CSV HEADER;

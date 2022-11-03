DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS photos;

CREATE TABLE questions (
  id int,
  product_id int,
  body text,
  date_written date,
  asker_name text,
  asker_email text,
  reported boolean,
  helpful int,
  PRIMARY KEY(id)
);

CREATE TABLE answers (
  id int,
  question_id int,
  body text,
  date_written date,
  answerer_name text,
  answerer_email text,
  reported boolean,
  helpful int,
  PRIMARY KEY(id),
  CONSTRAINT fk_question_id
    FOREIGN KEY(question_id)
      REFERENCES questions(id)
);

CREATE TABLE photos (
  id int,
  answer_id int,
  url text,
  PRIMARY KEY(id),
  CONSTRAINT fk_answer_id
    FOREIGN KEY(answer_id)
      REFERENCES answers(id)
);

CREATE TABLE "Users" (
  id VARCHAR(100) PRIMARY KEY,
  age INTEGER not null,
  login VARCHAR(100) not null,
  password VARCHAR(100) not null,
  isdeleted BOOLEAN not null
);

INSERT INTO Users (id, age, login, password, isdeleted)
VALUES ('1', 18, 'Aristrakh', '12345qwerty', FALSE);

INSERT INTO Users (id, age, login, password, isdeleted)
VALUES ('2', 18, 'Vasilisia', '1234', FALSE);
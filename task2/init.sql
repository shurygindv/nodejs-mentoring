CREATE TABLE Users (
  id VARCHAR(100) PRIMARY KEY,
  age INTEGER not null,
  login VARCHAR(100) not null,
  password VARCHAR(100) not null,
  isDeleted BOOLEAN  not null,
);

INSERT INTO Users (id, age, login, password, isDeleted)
VALUES ('1', 18, 'Aristrakh', 'Kaultsyn', false);

INSERT INTO Users (id, age, login, password, isDeleted)
VALUES ('1', 18, 'Vasilisia', 'Prekrasanya', false);

INSERT INTO Users (id, age, login, password, isDeleted)
VALUES ('1', 18, 'Anastsasia', 'Shvarts', false);

CREATE TABLE Users (
  id VARCHAR(100) PRIMARY KEY,
  age INTEGER not null,
  login VARCHAR(100) not null,
  password VARCHAR(100) not null,
);

CREATE TABLE Groups (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(100) not null,
  permissions VARCHAR(100) not null,
);


INSERT INTO Users (id, age, login, password)
VALUES ('1', 18, 'Aristrakh', '12345qwerty');

INSERT INTO Users (id, age, login, password)
VALUES ('2', 18, 'Vasilisia', '1234');

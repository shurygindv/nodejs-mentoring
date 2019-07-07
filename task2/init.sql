CREATE TABLE Users (
  id VARCHAR(100) PRIMARY KEY,
  firstName VARCHAR(100) not null,
  lastName VARCHAR(100) not null
);

INSERT INTO Users (id, firstName, lastName)
VALUES ('1', 'Aristrakh', 'Kaultsyn');

INSERT INTO Users (id, firstName, lastName)
VALUES ('2', 'Valeria', 'Shtolc');

INSERT INTO Users (id, firstName, lastName)
VALUES ('3', 'Daniil', 'Ssss');
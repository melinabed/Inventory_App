#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
TRUNCATE TABLE 
  game_game_modes, 
  game_platforms, 
  game_subgenres, 
  game_modes, 
  platforms, 
  subgenres, 
  games 
RESTART IDENTITY CASCADE;

CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL,
    developer VARCHAR (255) NOT NULL,
    publisher VARCHAR (255) NOT NULL,
    release_date DATE,
    price DECIMAL (10, 2),
    image_path TEXT
);

CREATE TABLE IF NOT EXISTS subgenres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  name VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS game_subgenres (
  game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  subgenre_id INTEGER NOT NULL REFERENCES subgenres(id) ON DELETE CASCADE,
  PRIMARY KEY (game_id, subgenre_id)
);


CREATE TABLE IF NOT EXISTS platforms (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  name VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS game_platforms (
  game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  platform_id INTEGER NOT NULL REFERENCES platforms(id) ON DELETE CASCADE,
  PRIMARY KEY (game_id, platform_id)
);

CREATE TABLE IF NOT EXISTS game_modes (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
 name VARCHAR (255) NOT NULL
);

CREATE TABLE IF NOT EXISTS game_game_modes (
  game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  mode_id INTEGER NOT NULL REFERENCES game_modes(id) ON DELETE CASCADE,
  PRIMARY KEY (game_id, mode_id)
);

INSERT INTO games (name, developer, publisher, release_date, price, image_path)
VALUES 
('Supermarket Simulator', 'Notka Games', 'Notka Games', '2024-02-20',12.99, '/images/supermarketSim.jpg'),
('Schedule 1', 'TVGS', 'TVGS', '2025-03-24', 19.99, '/images/schedule1.jpg'),
('inZOI', 'inZOI Studio', 'Krafton Inc', '2025-03-27', 39.99, '/images/inZOI.jpg'),
('The Sims 4', 'Maxis', 'EA', '2014-09-01', 0.00, '/images/thesims4.jpg'),
('Fast Food Simulator', 'No Celing Games', 'No Celing Games', '2024-12-10', 14.99, '/images/ffs.jpg'),
('Stardew Valley', 'ConcernedApe', 'ConcernedApe', '2016-02-26', 14.99, '/images/stardew.jpg'),
('Farming Simulator 25', 'Giants Software', 'Giants Software', '2024-11-12', '49.99', '/images/farmSim25.jpg'),
('Euro Truck Driving Simulator', 'SCS Software', 'SCS Software', '2012-10-17', '19.99', '/images/euroTruck.jpg'),
('Lawn Mowing Simulator', 'Skyhook Games', 'Curve Games', '2021-08-10', '19.99', '/images/lawnmowingSim.jpg'),
('Planet Coaster 2', 'Frontier Developments', 'Frontier Developments', '2024-11-16', '49.99', '/images/planetCoaster.jpg'),
('House Flipper 2', 'Frozen District', 'Frozen District', '2023-12-14', '39.99', '/images/houseflip.jpg'),
('Powerwash Simulator', 'FuturLab', 'SquareEnix', '2022-07-14', '24.99', '/images/powerwash.jpg');

INSERT INTO subgenres (name)
VALUES ('Life Sim'), ('Business Sim'), ('Farming Sim'), ('Truck Driving Sim'), ('Building Sim'), ('Home Renovation Sim'), ('Cleaning Sim');

INSERT INTO platforms (name)
VALUES ('PC', 'Xbox', 'PS5', 'Switch');

INSERT INTO game_modes (name)
VALUES ('Single Player'), ('Online Co-op'), ('LAN Co-op'), ('Shared/Split Screen Co-op');

INSERT INTO game_subgenres (game_id, subgenre_id) 
VALUES (1, 2), (2, 2), (3, 1), (4, 1), (5, 1), (6, 3), (7, 3), (8, 4), (9, 3), (10, 5), (11, 6), (12, 7);

INSERT INTO game_platforms (game_id, platform_id)
VALUES (1, 1), (2, 1), (3, 1), (4, 1), (4, 2), (4, 3), (5, 1), (6, 1), (6, 2), (6, 4), (7, 1), (7, 2), (7, 3), (8, 1), (9, 1), (9, 2), (9, 3), (10, 1), (10, 2), (10, 3), (11, 1), (11, 2), (11, 3), (12, 1), (12, 2), (12, 3), (12, 4);

INSERT INTO game_game_modes (game_id, mode_id)
VALUES (1, 1), (2, 1), (2, 2), (3, 1), (4, 1), (5, 1), (5, 2), (6, 1), (6, 2), (6, 3), (6, 4), (7, 1), (7, 2), (8, 1), (8, 2), (9, 1), (10, 1), (11, 1), (12, 1), (12, 2);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

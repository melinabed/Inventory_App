#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `CREATE TABLE IF NOT EXISTS games (
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

CREATE TABLE IF NOT EXISTS platforms (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  name VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS game_modes (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
 name VARCHAR (255) NOT NULL
);


INSERT INTO games (name, developer, publisher, release_date, price, image_path)
VALUES 
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
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://melinabed:0720@localhost:5432/sim_games",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

//Finish up populating database

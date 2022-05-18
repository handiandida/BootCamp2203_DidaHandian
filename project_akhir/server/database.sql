-- users table
create table users(
    id_user SERIAL PRIMARY KEY,
	name VARCHAR (225) NOT NULL,
    email VARCHAR (225) UNIQUE NOT NULL,
    password VARCHAR (225) NOT NULL,
	image VARCHAR (225) NOT NULL,
);
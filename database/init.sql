CREATE TABLE invitacion (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
   timein DATE,
    timeout DATE
)
ALTER DATABASE invitacion SET timezone = 'UTC';
ALTER TABLE invitacion ADD COLUMN user_id INTEGER REFERENCES users(id);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    numberdpto VARCHAR(100) NOT NULL
)
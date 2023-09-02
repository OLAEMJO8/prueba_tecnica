CREATE TABLE invitaciones (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    timein DATE,
    timeout DATE
)
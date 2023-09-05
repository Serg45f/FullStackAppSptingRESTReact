CREATE TABLE book (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT NOT NULL,
    state TEXT NOT NULL
);
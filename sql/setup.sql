DROP TABLE IF EXISTS git_users;

CREATE TABLE git_users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR,
    avatar VARCHAR
);

DROP TABLE IF EXISTS posts;

CREATE TABLE posts(
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
repo VARCHAR NOT NULL,
memo VARCHAR NOT NULL
);

INSERT INTO posts(repo, memo)

VALUES
('SQL is fun', 'All though it is tough it is fun to learn')


-- sqlite3 board.sqlite < init_database.sql
DROP TABLE IF EXISTS memo;

CREATE TABLE memo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(50) NOT NULL,
    message VARCHAR(200)
);

INSERT INTO memo(title, message) VALUES
  ('title1', 'message1'),
  ('title2', 'message2'),
  ('title3', 'message3'),
  ('title4', 'message4');

-- INSERT INTO memo(title, message) VALUES('title1', 'message1');
-- INSERT INTO memo(title, message) VALUES('title2', 'message2');
-- INSERT INTO memo(title, message) VALUES('title3', 'message3');
-- INSERT INTO memo(title, message) VALUES('title4', 'message4');

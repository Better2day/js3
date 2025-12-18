-- sqlite3 users.db < init-db-sample-users.sql 처럼 사용 가능

-- 사용자 데이터 삽입
INSERT INTO users (username, password) VALUES
    ('user1', 'pass1'),
    ('user2', 'pass2'),
    ('user3', 'pass3');

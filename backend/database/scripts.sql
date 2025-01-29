CREATE TABLE books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT NOT NULL
)

drop table categories

insert into categories(name) values ('Classics'), ('Fiction')

INSERT INTO users (name, password) VALUES ('Admin', '$2b$10$TlHTlxeIKCM7EBnxyLEwh.XW5T385majvPbjvIPw5kFQbi.pVxqBC');

select * from categories;
SELECT * from profile_picture;

insert into userroles (user_id,role_id) values (6,1)



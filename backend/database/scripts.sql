CREATE TABLE books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT NOT NULL
)

drop table categories

insert into roles (name) values ('admin'), ('user')
select * from roles


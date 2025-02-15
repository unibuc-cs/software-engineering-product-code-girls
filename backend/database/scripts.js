import Database from 'better-sqlite3'

const db = new Database('./databasePROD.db');


const createBooksTable = () => {
    const sql = `
                    CREATE TABLE IF NOT EXISTS books(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    category_id INTEGER,
                    title TEXT NOT NULL,
                    author TEXT NOT NULL,
                    description TEXT NOT NULL,
                    FOREIGN KEY (category_id) REFERENCES categories(id)
                    )
                `;
    db.prepare(sql).run();
}

createBooksTable()

const addCoverImageColumnToBooks = () => {
    const sql = `
        ALTER TABLE books ADD COLUMN cover_image TEXT;
    `;
    try {
        db.prepare(sql).run();
        console.log("Coloana 'cover_image' a fost adăugată în tabelul 'books'.");
    } catch (error) {
        console.log("Coloana 'cover_image' există deja sau a apărut o eroare:", error.message);
    }
};

addCoverImageColumnToBooks();



const createCategoriesTable = () => {
    const sql = `
                    CREATE TABLE IF NOT EXISTS categories(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL
                    )
                `;
    db.prepare(sql).run();
}

createCategoriesTable()

const createUsersTable = () => {
    const sql = `
                    CREATE TABLE IF NOT EXISTS users(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    password TEXT NOT NULL
                    )
                `
    db.prepare(sql).run();
}

createUsersTable()

// const addColumnToUsersTable = () => {
//     const sql2 = `
//         ALTER TABLE users
//         ADD COLUMN email TEXT NULL;
//     `;
//     db.prepare(sql2).run();
// };

// addColumnToUsersTable();

const deleteUserWithReferences = (id) => {
    const delete1 = `DELETE FROM comments WHERE user_id = ?;`;
    db.prepare(delete1).run(id);

    const delete2 = `DELETE FROM reviews WHERE user_id = ?;`;
    db.prepare(delete2).run(id);

    const delete3 = `DELETE FROM userbooks WHERE user_id = ?;`;
    db.prepare(delete3).run(id);

    const delete4 = `DELETE FROM userroles WHERE user_id = ?;`;
    db.prepare(delete4).run(id);

    const delete5 = `DELETE FROM users WHERE id = ?;`;
    db.prepare(delete5).run(id);
};
// for (let i = 2; i <= 6; i++)
//     deleteUserWithReferences(i);


const createUserBooksTable = () => {
    const sql = `
                    CREATE TABLE IF NOT EXISTS userbooks(
                    user_id INTEGER NOT NULL,
                    book_id INTEGER NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users,
                    FOREIGN KEY (book_id) REFERENCES books
                    )
                `
    db.prepare(sql).run();
}

createUserBooksTable()

const createCommentsTable = () => {
    const sql = `
                    CREATE TABLE IF NOT EXISTS comments(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    book_id INTEGER,
                    content TEXT NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users,
                    FOREIGN KEY (book_id) REFERENCES books
                    )
                `
    db.prepare(sql).run();
}

createCommentsTable()

const createReviewsTable = () => {
    const sql = `
                    CREATE TABLE IF NOT EXISTS reviews(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    book_id INTEGER,
                    rating INTEGER,
                    FOREIGN KEY (user_id) REFERENCES users,
                    FOREIGN KEY (book_id) REFERENCES books
                    )
                `
    db.prepare(sql).run();
}

createReviewsTable()

const createRolesTable = () => {
    const sql = `
                    CREATE TABLE IF NOT EXISTS roles(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL
                    )
                `
    db.prepare(sql).run();
}

createRolesTable()

const createUserRolesTable = () => {
    const sql = `
                    CREATE TABLE IF NOT EXISTS userroles(
                    user_id INTEGER,
                    role_id INTEGER,
                    FOREIGN KEY (user_id) REFERENCES users,
                    FOREIGN KEY (role_id) REFERENCES roles
                    )
                `
    db.prepare(sql).run();
}

createUserRolesTable()


const createRefreshTokensTable = () => {
    const sql = `
                CREATE TABLE IF NOT EXISTS refresh_tokens (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    token TEXT NOT NULL UNIQUE
                )
            `
    db.prepare(sql).run();
  };
  
createRefreshTokensTable()

const createPersonalLibraryTable = () => {
    const sql = `
                CREATE TABLE IF NOT EXISTS library (
                    user_id INTEGER,
                    book_id INTEGER,
                    readit BOOLEAN,
                    FOREIGN KEY (user_id) REFERENCES users,
                    FOREIGN KEY (book_id) REFERENCES books
                )
            `
    db.prepare(sql).run();
  };
  
createPersonalLibraryTable();

const deletefromlibrary = (id) => {
    const delete1 = `DELETE FROM library WHERE book_id = ?;`;
    db.prepare(delete1).run(id);

};
// for (let i = 2; i <= 6; i++)
//     deleteUserWithReferences(i);
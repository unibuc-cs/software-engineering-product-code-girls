const createRefreshTokensTable = () => {
    const sql = `
      CREATE TABLE refresh_tokens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT NOT NULL UNIQUE
      )
    `;
    db.prepare(sql).run();
  };
  
createRefreshTokensTable()
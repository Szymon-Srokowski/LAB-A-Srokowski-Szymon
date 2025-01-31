CREATE TABLE IF NOT EXISTS comment (
                                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                                       post_id INTEGER NOT NULL,
                                       author TEXT NOT NULL,
                                       content TEXT NOT NULL,
                                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                       FOREIGN KEY (post_id) REFERENCES post (id)
    );

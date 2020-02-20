class DatabaseConfiguration {
    host = process.env.DATABASE_HOST || 'localhost';
    port = process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306;
    user = process.env.DATABASE_USER || 'root';
    password = process.env.DATABASE_PASSWORD || '';
    database = process.env.DATABASE_NAME || 'di-project';
}

module.exports = DatabaseConfiguration;
const typeorm = require('typeorm');
const DatabaseConfiguration = require('./config/database.configuration');

class Database {
    constructor(entities) {
        this.entities = entities;
        this.options = new DatabaseConfiguration();
    }

    connect() {
        return typeorm.createConnection({
            type: "mysql",
            host: this.options.host,
            port: this.options.port,
            username: this.options.user,
            password: this.options.password,
            database: this.options.database,
            synchronize: true,
            entities: this.entities
        });
    }
}

module.exports = Database;
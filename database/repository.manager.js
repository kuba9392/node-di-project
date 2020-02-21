class RepositoryManager {
    constructor(connection) {
        this.connection = connection;
    }

    getRepository(className) {
        return this.connection.getRepository(className);
    }
}

module.exports = RepositoryManager;
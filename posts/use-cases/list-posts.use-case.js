const Post = require('../models/post');

class ListPostUseCase {
    constructor(container) {
        this.repository = container.get("repositoryManager").getRepository(Post);
    }

    async execute() {
        return await this.repository.find();
    }
}

module.exports = ListPostUseCase;
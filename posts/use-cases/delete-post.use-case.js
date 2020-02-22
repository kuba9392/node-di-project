const Post = require('../models/post');

class DeletePostUseCase {
    constructor(container) {
        this.repository = container.get("repositoryManager").getRepository(Post);
    }

    async execute(id) {
        const post = await this.repository.findOne(id);
        await this.repository.remove(post);
    }
}

module.exports = DeletePostUseCase;
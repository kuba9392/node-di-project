const Post = require('../models/post');

class CreatePostUseCase {
    constructor(container) {
        this.repository = container.get("repositoryManager").getRepository(Post);
    }

    async execute(post) {
        return await this.repository.save(post);
    }
}

module.exports = CreatePostUseCase;
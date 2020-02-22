const Post = require('../models/post');

class CreatePostUseCase {
    constructor(container) {
        this.repository = container.get("repositoryManager").getRepository(Post);
    }

    async execute(id, body) {
        const post = await this.repository.findOne(id);
        post.title = body.title;
        post.content = body.content;
        await this.repository.save(post);
    }
}

module.exports = CreatePostUseCase;
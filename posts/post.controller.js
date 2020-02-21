const ListPostsUseCase = require('./use-cases/list-posts.use-case');

class PostController {
    constructor(container) {
        this.useCase = container.get(ListPostsUseCase);
    }

    listAction = async (req, res) => {
        res.json(await this.useCase.execute());
    };
}

module.exports = PostController;
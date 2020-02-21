const ListPostsUseCase = require('./use-cases/list-posts.use-case');
const CreatePostUseCase = require('./use-cases/create-post.use-case');
const PostCreateRequestDto = require('./dto/post-create-request.dto');

class PostController {
    constructor(container) {
        this.listPostsUseCase = container.get(ListPostsUseCase);
        this.createPostUseCase = container.get(CreatePostUseCase);
    }

    listAction = async (req, res) => {
        res.json(await this.listPostsUseCase.execute());
    };

    createAction = async (req, res) => {
        await this.createPostUseCase.execute(PostCreateRequestDto.createFromBody(req.body));
        res.status(204).send();
    }
}

module.exports = PostController;
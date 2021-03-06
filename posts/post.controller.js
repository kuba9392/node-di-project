const ListPostsUseCase = require('./use-cases/list-posts.use-case');
const CreatePostUseCase = require('./use-cases/create-post.use-case');
const UpdatePostUseCase = require('./use-cases/update-post.use-case');
const DeletePostUseCase = require('./use-cases/delete-post.use-case');
const PostRequestDto = require('./dto/post-request.dto');

class PostController {
    constructor(container) {
        this.listPostsUseCase = container.get(ListPostsUseCase);
        this.createPostUseCase = container.get(CreatePostUseCase);
        this.updatePostUseCase = container.get(UpdatePostUseCase);
        this.deletePostUseCase = container.get(DeletePostUseCase);
    }

    listAction = async (req, res) => {
        res.json(await this.listPostsUseCase.execute());
    };

    createAction = async (req, res) => {
        await this.createPostUseCase.execute(PostRequestDto.createFromBody(req.body));
        res.status(204).send();
    };

    updateAction = async (req, res) => {
        await this.updatePostUseCase.execute(req.params.id, PostRequestDto.createFromBody(req.body));
        res.status(204).send();
    };

    deleteAction = async (req, res) => {
        await this.deletePostUseCase.execute(req.params.id);
        res.status(204).send();
    };
}

module.exports = PostController;
const CreatePostUseCase = require('./create-post.use-case.js');
const RepositoryManager = require('../../database/repository.manager.js');
const Post = require('../models/post.js');
const PostCreateRequestDto = require('../dto/post-create-request.dto.js');
const Container = require('typedi').Container;

describe("CreatePostUseCase", () => {
    let repository = {};

    const repositoryManager  = new RepositoryManager({});
    Container.set('repositoryManager', repositoryManager);

    /*
        Do not mock external libraries which aren't under your control ever.
        I've done this to make the code as readable as possible.
        In the project which will be long-term developed this can be really painful when the implementation of library
        will change.
     */
    jest.spyOn(repositoryManager, 'getRepository').mockImplementation(() => {
        return repository;
    });

    const useCase = new CreatePostUseCase(Container);
    describe("execute method", () => {
        it("should create new entity", async () => {
            const post = new PostCreateRequestDto('test', 'test');
            repository.save = jest.fn(async () => { });

            await useCase.execute(post);

            expect(repositoryManager.getRepository).toBeCalledTimes(1);
            expect(repository.save).toBeCalledTimes(1);
            expect(repository.save).toBeCalledWith(post);
        });
    })
});
const UpdatePostUseCase = require('./update-post.use-case.js');
const RepositoryManager = require('../../database/repository.manager.js');
const PostRequestDto = require('../dto/post-request.dto.js');
const Post = require('../models/post');
const Container = require('typedi').Container;

describe("UpdatePostUseCase", () => {
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

    const useCase = new UpdatePostUseCase(Container);
    describe("execute method", () => {
        it("should update existing entity", async () => {
            const post = new Post(1, 'test', 'test');
            const body = new PostRequestDto('test-title', 'test-body');
            const updatedPost = {id: 1, title: 'test-title', content: 'test-body'};
            repository.findOne = jest.fn(async () => post);
            repository.save = jest.fn(async () => { });

            await useCase.execute(1, body);

            expect(repositoryManager.getRepository).toBeCalledTimes(1);
            expect(repository.findOne).toBeCalledTimes(1);
            expect(repository.save).toBeCalledTimes(1);
            expect(repository.save).toBeCalledWith(expect.objectContaining(updatedPost));
        });
    })
});
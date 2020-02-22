const DeletePostUseCase = require('./delete-post.use-case.js');
const RepositoryManager = require('../../database/repository.manager.js');
const Post = require('../models/post');
const Container = require('typedi').Container;

describe("DeletePostUseCase", () => {
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

    const useCase = new DeletePostUseCase(Container);
    describe("execute method", () => {
        it("should delete existing entity", async () => {
            const post = new Post(1, 'test', 'test');
            repository.findOne = jest.fn(async () => post);
            repository.remove = jest.fn(async () => { });

            await useCase.execute(1);

            expect(repositoryManager.getRepository).toBeCalledTimes(1);
            expect(repository.findOne).toBeCalledTimes(1);
            expect(repository.remove).toBeCalledTimes(1);
            expect(repository.remove).toBeCalledWith(expect.objectContaining(post));
        });
    })
});
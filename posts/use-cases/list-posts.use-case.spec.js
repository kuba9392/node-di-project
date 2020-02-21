const ListPostsUseCase = require('./list-posts.use-case.js');
const RepositoryManager = require('../../database/repository.manager.js');
const Post = require('../models/post.js');
const Container = require('typedi').Container;

describe("ListPostsUseCase", () => {
    let repository = {};

    const repositoryManager  = new RepositoryManager({});
    Container.set('repositoryManager', repositoryManager);

    jest.spyOn(repositoryManager, 'getRepository').mockImplementation(() => {
        return repository;
    });

    const useCase = new ListPostsUseCase(Container);
    describe("execute method", () => {
        it("should return list of post entities", async () => {
            const services = [
                new Post(1, 'test', 'test'),
                new Post(2, 'test1', 'test1')
            ];
            repository.find = jest.fn(async () => { return services });

            const sut = await useCase.execute();

            expect(repositoryManager.getRepository).toBeCalledTimes(1);
            expect(repository.find).toBeCalledTimes(1);
            expect(sut).toEqual(services);
        });

        it("should return empty array if entities doesn't exist", async () => {
            const services = [];
            repository.find = jest.fn(async () => { return services });

            const sut = await useCase.execute();

            expect(repositoryManager.getRepository).toBeCalledTimes(1);
            expect(repository.find).toBeCalledTimes(1);
            expect(sut).toEqual(services);
        });
    })
});
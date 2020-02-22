const express = require('express');
const Database = require('./database/database');
const Container = require('typedi').Container;
const RepositoryManager = require('./database/repository.manager');
const PostController = require('./posts/post.controller');

const db = new Database([
    require('./posts/schemas/post.schema')
]);

db.connect().then((connection) => {
    const app = express();
    app.use(express.json());

    Container.set('repositoryManager', new RepositoryManager(connection));

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    const postController = Container.get(PostController);
    app.get('/posts', postController.listAction);
    app.post('/posts', postController.createAction);
    app.put('/posts/:id', postController.updateAction);

    app.listen(8050, () => {
        console.log("Listening on port 8050");
    });
});
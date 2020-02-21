const express = require('express');
const Database = require('./database/database');
const Container = require('typedi').Container;
const RepositoryManager = require('./database/repository.manager');
const PostController = require('./posts/post.controller');
const typeorm = require('typeorm');

const db = new Database([
    require('./posts/schemas/post.schema')
]);

typeorm.useContainer(Container);

db.connect().then((connection) => {
    const app = express();

    Container.set('repositoryManager', new RepositoryManager(connection));

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.get('/posts', Container.get(PostController).listAction);

    app.listen(8050, () => {
        console.log("Listening on port 8050");
    });
});
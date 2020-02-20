const express = require('express');
const Database = require('./database/database');

const db = new Database([
    require('./posts/schemas/post.schema')
]);

db.connect().then(() => {
    const app = express();

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.listen(8050, () => {
        console.log("Listening on port 8050");
    });
});
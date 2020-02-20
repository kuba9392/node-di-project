const EntitySchema = require('typeorm').EntitySchema;
const Post = require('../models/post');

module.exports = new EntitySchema({
    name: 'Post',
    target: Post,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        title: {
            type: 'varchar'
        },
        content: {
            type: 'text'
        }
    }
});
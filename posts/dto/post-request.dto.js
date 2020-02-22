class PostRequestDto {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    static createFromBody(body) {
        return new this(body.title, body.content);
    }
}

module.exports = PostRequestDto;
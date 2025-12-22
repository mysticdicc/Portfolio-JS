export class BlogPost {
    constructor({ id = crypto.randomUUID(), title = '', body = '', lastSubmit = new Date(), images = [] } = {}) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.lastSubmit = lastSubmit;
        this.images = images;
    }

    static fromJSON(json) {
        return new BlogPost({
            id: json.ID,
            title: json.Title,
            body: json.Body,
            lastSubmit: new Date(json.LastSubmit),
            images: json.Images || []
        });
    }
}

export class DevProjectPost {
    constructor({ id = crypto.randomUUID(), title = '', body = '', lastSubmit = new Date(), images = [] } = {}) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.lastSubmit = lastSubmit;
        this.images = images;
    }
}

export class ItProjectPost {
    constructor({ id = crypto.randomUUID(), title = '', body = '', lastSubmit = new Date(), images = [] } = {}) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.lastSubmit = lastSubmit;
        this.images = images;
    }
}
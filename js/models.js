import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import DOMPurify from 'dompurify';

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

export class ItProjectPost {
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

export class PostContainers {
    static createParentContainer() {
        let postContainer = document.createElement("div");
        postContainer.classList.add("post_container");
        
        let line = document.createElement("div");
        line.classList.add("grey_line");
        postContainer.appendChild(line);

        return postContainer;
    }

    static createPostBody(post) {
        let bodywrapper = document.createElement("div");
        bodywrapper.classList.add("post_body");

        let parsedMarkdown = marked.parse(post.body);
        bodywrapper.innerHTML = DOMPurify.sanitize(parsedMarkdown);

        return bodywrapper;
    }

    static createPostHeader(post) { 
        let blogHeader = document.createElement("div");
        blogHeader.classList.add("post_header");
        
        let title = document.createElement("span");
        title.classList.add("post_title");
        title.textContent = post.title;
        
        let date = document.createElement("span");
        date.classList.add("post_date");
        date.textContent = post.lastSubmit.toLocaleDateString();
        
        blogHeader.appendChild(title);
        blogHeader.appendChild(date);

        return blogHeader;
    }
}
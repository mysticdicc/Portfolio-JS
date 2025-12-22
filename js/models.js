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
    static createParentContainer(isShort) {
        let postContainer = document.createElement("div");
        postContainer.classList.add("post_container");
        
        if (isShort) { 
            let line = document.createElement("div");
            line.classList.add("grey_line");
            postContainer.appendChild(line);
        }

        return postContainer;
    }

    static createPostBody(post, isShort) {
        let bodywrapper = document.createElement("div");
        bodywrapper.classList.add("post_body");

        let parsedMarkdown = marked.parse(post.body);
        bodywrapper.innerHTML = DOMPurify.sanitize(parsedMarkdown);

        if (isShort) {
            let body = post.body.substring(0, 500) + "...";
            let parsedMarkdown = marked.parse(body);
            bodywrapper.innerHTML = DOMPurify.sanitize(parsedMarkdown);

            let a = document.createElement("a");
            a.href = "/post.html?id=" + post.id;

            let button = document.createElement("button");
            button.textContent = "Read More";

            a.appendChild(button);

            let div = document.createElement("div");
            div.classList.add("flex_row");
            div.appendChild(a);

            bodywrapper.appendChild(div);
        }
        else
        {
            let parsedMarkdown = marked.parse(post.body);
            bodywrapper.innerHTML = DOMPurify.sanitize(parsedMarkdown);
        }

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
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import DOMPurify from 'dompurify';
import { name } from "msal/lib-commonjs/packageMetadata";

export class WebsitePost {
    constructor({ id = '', title = '', body = '', lastSubmit = new Date(), images = [], websitePostType = 0 } = {}) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.lastSubmit = lastSubmit;
        this.images = images;
        this.websitePostType = websitePostType;
    }

    static fromJSON(json) {
        return new WebsitePost({
            id: json.ID,
            title: json.Title,
            body: json.Body,
            lastSubmit: new Date(json.LastSubmit),
            websitePostType: json.WebsitePostType,
            images: Image.fromListJson(json.Images || [])
        });
    }

    static toJson(post) {
        return {
            ID: post.id,
            Title: post.title,
            Body: post.body,
            LastSubmit: post.lastSubmit.toISOString(),
            WebsitePostType: post.websitePostType,
            Images: Image.toListJson(post.images)
        };
    }
}

export class Image {
    constructor({id = '', name = '', localpath = '', remotepath = '', fileextension = '', postid = '', base64string = ''} = {}) {
        this.id = id;
        this.name = name;
        this.localpath = localpath;
        this.remotepath = remotepath;
        this.fileextension = fileextension;
        this.postid = postid;
        this.base64string = base64string;
    }

    static fromJSON(json) {
        return new Image({
            id: json.Id,
            name: json.Name,
            localpath: json.LocalPath,
            remotepath: json.RemotePath,
            fileextension: json.FileExtension,
            postid: json.PostId,
            base64string: json.Base64String
        });
    }

    static toJson(image) {
        return {
            ID: image.id,
            Name: image.name,
            LocalPath: image.localpath,
            RemotePath: image.remotepath,
            FileExtension: image.fileextension,
            PostId: image.postid,
            Base64String: image.base64string
        };
    }

    static fromListJson(jsonArray) {
        return jsonArray.map(item => Image.fromJSON(item));
    }

    static toListJson(imageArray) {
        return imageArray.map(item => Image.toJson(item));
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

    static createPostBody(post, isShort, isAdmin) {
        let bodywrapper = document.createElement("div");
        bodywrapper.classList.add("post_body");

        let parsedMarkdown = marked.parse(post.body);
        bodywrapper.innerHTML = DOMPurify.sanitize(parsedMarkdown);

        if (isShort) {
            let body = post.body.substring(0, 500) + "...";
            let parsedMarkdown = marked.parse(body);
            bodywrapper.innerHTML = DOMPurify.sanitize(parsedMarkdown);

            let a = this.createReadMoreButton(post);

            let div = document.createElement("div");
            div.classList.add("flex_row");
            div.appendChild(a);
            
            if (isAdmin) {
                let editButton = this.createEditButton(post);
                div.appendChild(editButton);
            }

            bodywrapper.appendChild(div);
        }
        else
        {
            let parsedMarkdown = marked.parse(post.body);
            bodywrapper.innerHTML = DOMPurify.sanitize(parsedMarkdown);

            if (post.images.length > 0) { 
                let carousel = this.createImageCarousel(post.images);
                bodywrapper.appendChild(carousel);
            }
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

    static createReadMoreButton(post) {
        let a = document.createElement("a");
        a.href = "/post.html?id=" + post.id;

        let button = document.createElement("button");
        button.textContent = "Read More";

        a.appendChild(button);

        return a;
    }

    static createEditButton(post) {
        let a = document.createElement("a");
        a.href = "/edit-post.html?id=" + post.id;

        let button = document.createElement("button");
        button.textContent = "Edit Post";

        a.appendChild(button);

        return a;
    }

    static createImageCarousel(images, isEdit) {
        let wrapper = document.createElement("div");
        wrapper.className = "image_carousel_wrapper";

        images.forEach((img, index) => { 
            let image = document.createElement("img");
            image.src = img.remotepath;
            image.className = "carousel_image";
            image.id = "carousel_image_" + index;
            wrapper.appendChild(image);
        })

        let nextbutton = document.createElement("button");
        nextbutton.id = "carousel_next_button";
        nextbutton.innerText = ">";

        let prevbutton = document.createElement("button");
        prevbutton.id = "carousel_prev_button";
        prevbutton.innerText = "<";

        let a = document.createElement("a");
        a.href = images[0];
        a.target = "_blank";
        a.id = "carousel_expand_link";
        
        let expandbutton = document.createElement("button");
        expandbutton.id = "carousel_expand_button";
        expandbutton.innerText = "⤢";

        a.appendChild(expandbutton);

        let row = document.createElement("div");
        row.className = "flex_row";

        row.appendChild(prevbutton);
        row.appendChild(a);

        if (isEdit) {
            let deletebutton = document.createElement("button");
            deletebutton.id = "carousel_delete_button";
            deletebutton.innerText = "X";
            row.appendChild(deletebutton);

            let uploadbutton = document.createElement("input");
            uploadbutton.type = "file";
            uploadbutton.accept = "image/*";
            uploadbutton.id = "carousel_upload_button";
            uploadbutton.innerText = "^";
            row.appendChild(uploadbutton);
        }

        row.appendChild(nextbutton);

        wrapper.appendChild(row);

        return wrapper;
    }
}
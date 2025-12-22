import { BlogPost } from '/js/models.js';
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import DOMPurify from 'dompurify';

const apiroot = "https://portfolio.richweb.uk/"
const blogroot = apiroot + "blogpost/"

window.onload = onLoadBlogWindow;

function onLoadBlogWindow() {
    fetchBlogPosts().then(posts => {
        posts.sort((a, b) => b.lastSubmit - a.lastSubmit);
        const blogTable = document.getElementById("blog_table");

        posts.forEach((post, index) => {
            const postContainer = document.createElement("div");
            postContainer.classList.add("blog_post_container");
            
            const line = document.createElement("div");
            line.classList.add("grey_line");
            postContainer.appendChild(line);

            const header = document.createElement("div");
            header.classList.add("blog_post_header");
            
            const title = document.createElement("span");
            title.classList.add("blog_post_title");
            title.textContent = post.title;
            
            const date = document.createElement("span");
            date.classList.add("blog_post_date");
            date.textContent = post.lastSubmit.toLocaleDateString();
            
            header.appendChild(title);
            header.appendChild(date);
            
            const bodywrapper = document.createElement("div");
            bodywrapper.classList.add("blog_post_body");
            
            postContainer.appendChild(header);
            postContainer.appendChild(bodywrapper);
            blogTable.appendChild(postContainer);

            const parsedMarkdown = marked.parse(post.body);
            bodywrapper.innerHTML = DOMPurify.sanitize(parsedMarkdown);
        });
    });
}

export async function fetchBlogPosts() {
    const response = await fetch(blogroot + "get/all");
    const data = await response.json();
    return data.map(item => BlogPost.fromJSON(item));
}


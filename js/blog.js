import { BlogPost } from '/js/models.js';
import { PostContainers } from '/js/models.js';

const apiroot = "https://portfolio.richweb.uk/"
const blogroot = apiroot + "blogpost/"

window.onload = onLoadBlogWindow;

function onLoadBlogWindow() {
    fetchBlogPosts().then(posts => {
        posts.sort((a, b) => b.lastSubmit - a.lastSubmit);
        const blogTable = document.getElementById("post_table");

        posts.forEach((post, index) => {
            const container = PostContainers.createParentContainer();
            const header = PostContainers.createPostHeader(post);
            const body = PostContainers.createPostBody(post);
            
            container.appendChild(header);
            container.appendChild(body);
            blogTable.appendChild(container);
        });
    });
}

export async function fetchBlogPosts() {
    const response = await fetch(blogroot + "get/all");
    const data = await response.json();
    return data.map(item => BlogPost.fromJSON(item));
}


import { ItProjectPost } from '/js/models.js';
import { PostContainers } from '/js/models.js';

const apiroot = "https://portfolio.richweb.uk/"
const itroot = apiroot + "itprojectpost/"

window.onload = onLoadItWindow;

function onLoadItWindow() {
    fetchItPosts().then(posts => {
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

export async function fetchItPosts() {
    const response = await fetch(itroot + "get/all");
    const data = await response.json();
    return data.map(item => ItProjectPost.fromJSON(item));
}


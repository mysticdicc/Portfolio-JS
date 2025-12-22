import { DevProjectPost } from '/js/models.js';
import { PostContainers } from '/js/models.js';

const apiroot = "https://portfolio.richweb.uk/"
const devroot = apiroot + "devprojectpost/"

window.onload = onLoadDevWindow;

function onLoadDevWindow() {
    fetchDevPosts().then(posts => {
        posts.sort((a, b) => b.lastSubmit - a.lastSubmit);
        const blogTable = document.getElementById("post_table");

        posts.forEach((post, index) => {
            const container = PostContainers.createParentContainer(true);
            const header = PostContainers.createPostHeader(post);
            const body = PostContainers.createPostBody(post, true);
            
            container.appendChild(header);
            container.appendChild(body);
            blogTable.appendChild(container);
        });
    });
}

export async function fetchDevPosts() {
    const response = await fetch(devroot + "get/all");
    const data = await response.json();
    return data.map(item => DevProjectPost.fromJSON(item));
}


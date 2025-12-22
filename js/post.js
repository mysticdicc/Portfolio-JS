import { BlogPost } from '/js/models.js';
import { PostContainers } from '/js/models.js';

const apiroot = "https://portfolio.richweb.uk/"
const blogroot = apiroot + "post/"

window.onload = onLoadBlogWindow;

function onLoadBlogWindow() {
    const blogTable = document.getElementById("post_table");
    
        fetchPostById(new URLSearchParams(window.location.search).get("id")).then(post => {
        const container = PostContainers.createParentContainer();
        const header = PostContainers.createPostHeader(post);
        const body = PostContainers.createPostBody(post);
        
        container.appendChild(header);
        container.appendChild(body);
        blogTable.appendChild(container);
     })
}


export async function fetchPostById(id) {
    const response = await fetch(blogroot + "get/byid?id=" + id);
    const data = await response.json();
    return BlogPost.fromJSON(data); 
}

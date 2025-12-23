import '../styles/web.css';
import { WebsitePost } from '/js/models.js';
import { PostContainers } from '/js/models.js';
import { getAuthState } from '/js/auth.js';

const apiroot = "https://portfolio.richweb.uk/"
const blogroot = apiroot + "post/"

window.onload = onLoadBlogWindow;

function onLoadBlogWindow() {
    const authState = getAuthState();

    fetchBlogPosts().then(posts => {
        posts.sort((a, b) => b.lastSubmit - a.lastSubmit);
        const blogTable = document.getElementById("post_table");

        posts.forEach((post, index) => {
            const container = PostContainers.createParentContainer(true);
            const header = PostContainers.createPostHeader(post);
            const body = PostContainers.createPostBody(post, true, authState);
            
            container.appendChild(header);
            container.appendChild(body);
            blogTable.appendChild(container);
        });

        if (posts.length > 0) {
            const skel = document.getElementById("post_skeleton");
            skel.style.display = "none";
        }
    });

    const element = document.getElementById("post_table");
    setOpacityFade(element, true);

    if (authState) {
        const newButtonContainer = document.getElementById("new_button");
        const newPostButton = createNewPostButton();
        newButtonContainer.appendChild(newPostButton);
    }
}

function setOpacityFade(element, isFadeIn) {
    if (isFadeIn) { 
        element.style.transition = "opacity 1s ease-in-out";
        element.style.opacity = "1";
    } else {
        element.style.transition = "opacity 1s ease-in-out";
        element.style.opacity = "0";
    }
}

export async function fetchBlogPosts() {
    const response = await fetch(blogroot + "get/blogs/all");
    const data = await response.json();
    return data.map(item => WebsitePost.fromJSON(item));
}

function createNewPostButton() {
    let a = document.createElement("a");
    a.href = "/edit-post.html";

    let button = document.createElement("button");
    button.innerText = "New Post";

    a.appendChild(button);
    return a;
}
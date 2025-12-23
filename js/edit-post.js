import { BlogPost } from '/js/models.js';
import { getAuthToken } from '/js/auth.js';

const apiroot = "https://portfolio.richweb.uk/"
const blogroot = apiroot + "post/"

window.onload = onLoadEditPostWindow;

function onLoadEditPostWindow() {
    const blogTable = document.getElementById("edit_post_container");
        fetchPostById(new URLSearchParams(window.location.search).get("id")).then(post => {
        const container = createParentContainer();
        const header = createEditHeader(post);
        const body = createEditBody(post);
        
        container.appendChild(header);
        container.appendChild(body);
        blogTable.appendChild(container);

        window.post = post;
    })

    setOpacityFade(blogTable, true);
}

async function fetchPostById(id) {
    const response = await fetch(blogroot + "get/byid?id=" + id);
    const data = await response.json();
    return BlogPost.fromJSON(data); 
}

async function editPost(post) {
    let json = JSON.stringify(post);
    let token = await getAuthToken()
    
    await fetch(blogroot + "post/edit", {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
        }
    })
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

function createParentContainer() {
    var container = document.createElement("div");
    container.className = "edit_post_container";

    return container;
}

function createEditHeader(post) {
    let header = document.createElement("header");
    header.className = "edit_post_header";

    let titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Post Title";
    titleInput.id = "post_title_input";
    titleInput.value = post.title;
    titleInput.addEventListener('input', (event) => {
        post.title = event.target.value;
    });

    header.appendChild(titleInput);

    return header;
}

function createEditBody(post) {
    let body = document.createElement("div");
    body.className = "edit_post_body";

    let contentTextarea = document.createElement("textarea");
    contentTextarea.placeholder = "Post Content";
    contentTextarea.id = "post_content_textarea";
    contentTextarea.value = post.body;
    contentTextarea.addEventListener('input', (event) => {
        post.body = event.target.value;
    });

    body.appendChild(contentTextarea);

    let row = document.createElement("div");
    row.className = "flex_row";
    let saveButton = createSaveButton();
    let deleteButton = createDeleteButton();
    row.appendChild(saveButton);
    row.appendChild(deleteButton);
    body.appendChild(row);

    return body;
}

function createSaveButton() {
    let button = document.createElement("button");
    button.id = "save_post_button";
    button.innerText = "Save Post";
    button.onclick = () => {editPost(window.post)}

    return button;
}

function createDeleteButton() {
    let button = document.createElement("button");
    button.id = "delete_post_button";
    button.innerText = "Delete Post";

    return button;
}
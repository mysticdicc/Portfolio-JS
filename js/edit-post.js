import { WebsitePost } from '/js/models.js';
import { PostContainers } from '/js/models.js';
import { Image } from '/js/models.js';
import { getAuthToken } from '/js/auth.js';

const apiroot = "https://portfolio.richweb.uk/"
const blogroot = apiroot + "post/"
const imgroot = apiroot + "image/"
let caroIndex = 0;

window.onload = onLoadEditPostWindow;

async function onLoadEditPostWindow() {
    const blogTable = document.getElementById("edit_post_container");
        await fetchPostById(new URLSearchParams(window.location.search).get("id")).then(post => {
            const container = createParentContainer();
            const header = createEditHeader(post);
            const body = createEditBody(post);
            
            container.appendChild(header);
            container.appendChild(body);
            blogTable.appendChild(container);

            window.post = post;
        })

    setOpacityFade(blogTable, true);
    configureCarouselButtons();
}

async function fetchPostById(id) {
    const response = await fetch(blogroot + "get/byid?id=" + id);
    const data = await response.json();
    return WebsitePost.fromJSON(data); 
}

async function editPost(post) {
    let json = JSON.stringify(WebsitePost.toJson(post));
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

async function uploadImage(image) {
    let json = JSON.stringify(Image.toJson(image));
    let token = await getAuthToken()

    await fetch(imgroot + "post/new", {
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
    body.id = "edit_post_body";

    let contentTextarea = document.createElement("textarea");
    contentTextarea.placeholder = "Post Content";
    contentTextarea.id = "post_content_textarea";
    contentTextarea.value = post.body;
    contentTextarea.addEventListener('input', (event) => {
        post.body = event.target.value;
    });

    body.appendChild(contentTextarea);

    let caro = PostContainers.createImageCarousel(post.images, true);
    body.appendChild(caro);

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

function onClickNextCarousel() {
    let oldimage = document.getElementById("carousel_image_" + caroIndex);
    oldimage.style.display = "none";
    
    if (caroIndex >= window.post.images.length - 1) {
        caroIndex = 0;

    } else {
        caroIndex += 1;
    }

    let expand = document.getElementById("carousel_expand_link");
    expand.href = window.post.images[caroIndex].remotepath;

    let newimage = document.getElementById("carousel_image_" + caroIndex);
    newimage.style.display = "block";
}

function onClickPrevCarousel() {
    let oldimage = document.getElementById("carousel_image_" + caroIndex);
    oldimage.style.display = "none";

    if (caroIndex <= 0) {
        caroIndex = window.post.images.length - 1;

    } else {
        caroIndex -= 1;
    }

    let expand = document.getElementById("carousel_expand_link");
    expand.href = window.post.images[caroIndex].remotepath;

    let newimage = document.getElementById("carousel_image_" + caroIndex);
    newimage.style.display = "block";
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function onClickUploadImage(event) {
    let file = event.target.files[0];
    let ext = file.name.split('.').pop();
    let id = crypto.randomUUID();
    let name = id + "." + ext;
    let localpath = "./wwwroot/img/upload/" + name;
    let remotepath = apiroot + "img/upload/" + name;
    let base64str = await fileToBase64(file);

    let newImage = new Image();
    newImage.id = id;
    newImage.name = name;
    newImage.base64string = base64str;
    newImage.postid = window.post.id;
    newImage.remotepath = remotepath;
    newImage.localpath = localpath;
    newImage.fileextension = ext;

    await uploadImage(newImage);
    window.post.images.push(newImage);
    createCareousel(window.post.images);
}

async function onClickDeleteImage() {
    let images = window.post.images;
    images.splice(caroIndex, 1);

    createCareousel(images);

    window.post.images = images;
    await editPost(window.post);
}

function createCareousel(images) {
    caroIndex = 0;
    let wrapper = document.querySelector(".image_carousel_wrapper");
    wrapper.parentNode.removeChild(wrapper);

    let newCaro = PostContainers.createImageCarousel(images, true);
    let textArea = document.getElementById("post_content_textarea");
    textArea.after(newCaro);

    configureCarouselButtons();
}

function configureCarouselButtons() {
    let nextButton = document.getElementById("carousel_next_button");
    if (null != nextButton) { nextButton.addEventListener("click", onClickNextCarousel); }

    let prevButton = document.getElementById("carousel_prev_button");
    if (null != prevButton) { prevButton.addEventListener("click", onClickPrevCarousel); }

    let caroImage = document.getElementById("carousel_image_0");
    if (null != caroImage) { caroImage.style.display = "block"; }

    let deleteButton = document.getElementById("carousel_delete_button");
    if (null != deleteButton) { deleteButton.addEventListener("click", onClickDeleteImage); }

    let uploadButton = document.getElementById("carousel_upload_button");
    if (null != uploadButton) { uploadButton.addEventListener("change", onClickUploadImage); }
}
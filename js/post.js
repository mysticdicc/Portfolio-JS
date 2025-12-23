import '../styles/web.css';
import { WebsitePost } from '/js/models.js';
import { PostContainers } from '/js/models.js';

const apiroot = "https://portfolio.richweb.uk/"
const blogroot = apiroot + "post/"
let caroIndex = 0;

window.onload = onLoadPostWindow;

async function onLoadPostWindow() {
    const blogTable = document.getElementById("post_table");
        await fetchPostById(new URLSearchParams(window.location.search).get("id")).then(post => {
            const container = PostContainers.createParentContainer();
            const header = PostContainers.createPostHeader(post);
            const body = PostContainers.createPostBody(post);
            
            container.appendChild(header);
            container.appendChild(body);
            blogTable.appendChild(container);

            window.post = post;
        })

    setOpacityFade(blogTable, true);
    
    let nextButton = document.getElementById("carousel_next_button");
    if (null != nextButton) { nextButton.addEventListener("click", onClickNextCarousel); }

    let prevButton = document.getElementById("carousel_prev_button");
    if (null != prevButton) { prevButton.addEventListener("click", onClickPrevCarousel); }

    let caroImage = document.getElementById("carousel_image_0");
    if (null != caroImage) { caroImage.style.display = "block"; }
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


export async function fetchPostById(id) {
    const response = await fetch(blogroot + "get/byid?id=" + id);
    const data = await response.json();
    return WebsitePost.fromJSON(data); 
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
    expand.href = window.post.images[caroIndex].remotepath;;

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
    expand.href = window.post.images[caroIndex].remotepath;;

    let newimage = document.getElementById("carousel_image_" + caroIndex);
    newimage.style.display = "block";
}
import '../styles/web.css';

window.onload = onIndexLoad;
document.getElementById("we_expand_button").onclick = onClickExpandWorkExperience;

function onIndexLoad() {
    var profile_bw = document.getElementById("profile_photo");
    var profile_colour = document.getElementById("profile_photo_colour");

    setOpacityFade(profile_colour, true);
    setOpacityFade(profile_bw, false);

    var svgPath = document.querySelectorAll("path");

    svgPath.forEach((path, index) => {
        setTimeout(() => {
            setSvgColorFadeIn(path, "secondary");
        }, index * 75);
    });

    var element = document.getElementById("work_experience_wrapper");
    setOpacityFade(element, true);

    var rows = document.getElementsByClassName("we_table_row");

    for (let i = 0; i < rows.length; i++) {
        if (rows[i].style.opacity == 0) {
            setTimeout(() => {            
                setOpacityFade(rows[i], true);
            }, 500 + (i * 500));
        }
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

function setSvgColorFadeIn(element, color) {
    element.style.transition = "fill 0.3s ease-in-out, stroke 0.3s ease-in-out";
    element.style.fill = "var(--" + color + ") !important";
    element.style.stroke = "var(--" + color + ") !important";
}

function onClickExpandWorkExperience() { 
    var weTableWrapper = document.getElementById("we_table_wrapper");
    if (weTableWrapper.style.maxHeight === '0px') {
        weTableWrapper.style.maxHeight = weTableWrapper.scrollHeight + 'px';
    } else {
        weTableWrapper.style.maxHeight = '0px';
    }
}
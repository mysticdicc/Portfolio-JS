import { msalInstance } from "./auth.js";

window.onload = onLoadLoginRedirectWindow;

function onLoadLoginRedirectWindow() {
    msalInstance.handleRedirectPromise().then(() => {
        window.location.replace("index.html");
    }).finally(() => {
        const element = document.getElementById("loginlogout");
        if (!element) return;
        if (msalInstance.getAllAccounts().length > 0) {
            element.href = "logout.html";
            element.children[0].innerText = "Log Out";
        } else {
            element.href = "login.html";
            element.children[0].innerText = "Log In";
        }
    });
}


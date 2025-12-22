import { msalInstance } from "./auth.js";

window.onload = onLoadLoginWindow;

async function onLoadLoginWindow() {
    var path = window.location.pathname;
    var page = path.split("/").pop();

    if (page == "login.html") {
        msalInstance.handleRedirectPromise().then((response) => {
            if (!response) {
                msalInstance.loginRedirect();
            }
            else {
                document.location.href = "index.html";
            }
        });
    } else if (page == "logout.html") {
        msalInstance.handleRedirectPromise().then(async (response) => {
            if (!response) {
                await msalInstance.logoutRedirect();
                document.location.href = "index.html";
            }
            else {
                document.location.href = "index.html";
            }
        });
    }
}
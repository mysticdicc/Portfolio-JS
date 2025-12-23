import { PublicClientApplication } from "@azure/msal-browser";

const prodRedirect = "https://portfolio.richweb.uk/login-redirect.html";
const devRedirect = "http://localhost:5173/login-redirect.html";

const msalConfig = {
  auth: {
    clientId: "7d1ba0fc-fef6-4827-8328-fe467f5ceba8",
    authority: "https://login.microsoftonline.com/900269ce-f8d4-4048-8883-1df6b8de010a",
    redirectUri: prodRedirect
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);
initAuth();

async function initAuth() {
  await msalInstance.initialize();
  window.msalInstance = msalInstance;

  const element = document.getElementById("loginlogout");

  if (null != element) {
      if (msalInstance.getAllAccounts().length > 0) {
        element.href = "logout.html";
        element.children[0].innerText = "Log Out";
    } else {
        element.href = "login.html";
        element.children[0].innerText = "Log In";
    }
  }
}

export function getAuthState() {
  return msalInstance.getAllAccounts().length > 0;
}

export function getAuthToken() {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length === 0) {
    return null;
  }

  const request = {
    scopes: ["api://7d1ba0fc-fef6-4827-8328-fe467f5ceba8/post.edit"],
    account: accounts[0]
  };

  return msalInstance.acquireTokenSilent(request)
    .then(response => response.accessToken)
    .catch(() => null);
}
//
//  connection.ts
//
//  Generated by Poll Castillo on 15/02/2023.
//
import { _userAgent } from "./endpoints.js";
export const connect = (mail, password) => {
    const generate = async () => {
        const URL = 'https://backend.netliinks.com:443/oauth/token';
        const ReqOptions = {
            method: 'POST',
            body: `grant_type=password&username=${mail}&password=${password}`,
            headers: {
                Accept: "application/json",
                "User-agent": `${_userAgent}`,
                Authorization: "Basic YzNjMDM1MzQ2MjoyZmM5ZjFiZTVkN2IwZDE4ZjI1YmU2NDJiM2FmMWU1Yg==",
                "Content-Type": "application/x-www-form-urlencoded",
                Cookie: "JSESSIONID=CDD208A868EAABD1F523BB6F3C8946AF",
            }
        };
        fetch(URL, ReqOptions)
            .then((response) => response.json())
            .then((response) => {
            const loginContainer = document.getElementById('login-container');
            localStorage.setItem('access_token', response.access_token);
            window.location.reload();
            if (response.error === "invalid_grant") {
                const loginButton = document.getElementById;
                loginButton.innerHTML = `<span>
            <i data-feather="loader" class="button_loader"></i>
          </span>`;
            }
        });
    };
    generate();
};
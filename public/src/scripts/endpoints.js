const NetliinksUrl = 'https://backend.netliinks.com:443/rest/entities/';
export let token = localStorage.getItem('access_token');
export const _userAgent = navigator.userAgent;
let headers = new Headers();
headers.append('Authorization', `Bearer ${token}`);
headers.append('Content-Type', "application/json");
headers.append('Cookie', "JSESSIONID=CDD208A868EAABD1F523BB6F3C8946AF");
export const getToken = async (mail, password) => {
    const URL = 'https://backend.netliinks.com:443/oauth/token';
    const ReqOptions = {
        method: 'POST',
        body: `grant_type=password&username=${mail}&password=${password}`,
        headers: {
            Accept: 'application/json',
            "User-agent": `${_userAgent}`,
            Authorization: 'Basic YzNjMDM1MzQ2MjoyZmM5ZjFiZTVkN2IwZDE4ZjI1YmU2NDJiM2FmMWU1Yg==',
            "Content-Type": 'application/x-www-form-urlencoded',
            Cookie: "JSESSIONID=CDD208A868EAABD1F523BB6F3C8946AF",
        }
    };
    const res = await fetch(URL, ReqOptions);
    return res.json();
};
/**
 *
 * @returns user information, type, business,
 * customers, guards and more
 */
export const getUserInfo = async () => {
    const userInfo = {
        url: 'https://backend.netliinks.com:443/rest/userInfo?fetchPlan=full',
        method: 'GET'
    };
    const options = {
        method: userInfo.method,
        headers: headers,
        redirect: 'follow'
    };
    return fetch(userInfo.url, options)
        .then((req) => req.json())
        .catch((err) => console.info(err));
};
/**
 *
 * @param url
 *
 * @returns a specific data from url
 */
// export async function getData(url: RequestInfo): Endpoint
export const getData = async (url) => {
    let ReqOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
    const res = await fetch(url, ReqOptions);
    return await res.json();
};
/**
 *
 * @param entities name of a specific entity to get.
 *
 * @returns all content of a specific
 * entity (all bussines data for example).
 */
export const getEntitiesData = async (entities) => {
    const URL = `${NetliinksUrl}${entities}?fetchPlan=full&orderby=createdDate`;
    return await getData(URL);
};
/**
 *
 * @param entities name of a specific entity to search.
 * @param entity name of a specific entity to get.
 *
 * @returns all data of specified entity.
 */
export const getEntityData = async (entities, entity) => {
    const URL = `${NetliinksUrl}${entities}/${entity}?fetchPlan=full&orderby=createdDate`;
    return getData(URL);
};
export const updateEntity = async (entities, entity, raw) => {
    const URL = `${NetliinksUrl}${entities}/${entity}`;
    const ReqOptions = {
        method: 'PUT',
        headers: headers,
        body: raw,
        redirect: 'follow'
    };
    await fetch(URL, ReqOptions)
        .then(res => res.json())
        .catch(err => console.error('Error: ', err));
};
export const deleteEntity = async (entities, entity) => {
    const URL = `${NetliinksUrl}${entities}/${entity}?fetchPlan=full`;
    const ReqOptions = {
        method: 'DELETE',
        headers: headers,
        redirect: 'follow'
    };
    await fetch(URL, ReqOptions)
        .then(res => res.json())
        .catch(err => console.error('Error: ', err));
};
export const registerEntity = async (raw) => {
    const req = {
        url: 'https://backend.netliinks.com:443/rest/entities/User',
        method: 'POST'
    };
    const requestOptions = {
        method: req.method,
        headers: headers,
        body: raw,
        redirect: 'follow'
    };
    fetch(req.url, requestOptions)
        .then((req) => req.json())
        .then(req => (console.log(req)))
        .catch((err) => console.info(err));
};
export const filterEntities = async (user) => { };
export const setPassword = async (user) => {
    const req = {
        url: 'https://backend.netliinks.com:443/rest/services/UserServiceBean/updatePassword',
        method: 'POST'
    };
    const requestOptions = {
        method: req.method,
        headers: headers,
        body: user,
        redirect: 'follow'
    };
};

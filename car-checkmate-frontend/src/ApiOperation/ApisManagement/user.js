import { getApi, postApi } from '../ApiCalls/ApiCalls';

export async function signUp(data) {
    const formData = new FormData();

    for(let key of Object.keys(data)){
        formData.append(key, data[key]) // key and value
    }
    const payload = {
        url: "http://localhost:3000/user/register",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }
    return postApi(payload.url, payload.data, payload.headers);
}

export async function signIn(data) {
    const formData = new FormData();
    for(let key of Object.keys(data)){
        formData.append(key, data[key]) // key and value
    }
    const payload = {
        url: "http://localhost:3000/user/login",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }
    return postApi(payload.url, payload.data, payload.headers);
}

import {API_BASE_URL} from "./ApiConfig";

export function call(api, method, request){
    let  headers = new Headers({
        "Content-Type" : "application/json"
    });
    
    let options = {
        headers : headers,
        url : API_BASE_URL + api,
        method : method,
    };
    
    if (request){
        options.body = JSON.stringify(request);
    }
    
    return fetch(options.url, options).then((response) => {
        if (response.status === 200){
            return response.json();
        }
    }).catch((error) => {
        console.log(error);
    });
    
}
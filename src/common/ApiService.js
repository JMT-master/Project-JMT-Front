import Swal from "sweetalert2";
import {API_BASE_URL} from "./ApiConfig";

export function call(api, method, request){
    let  headers = new Headers({
        "Content-Type" : "application/json"
    });

    if(request.accessToken && request.accessToken != null) {
      headers.append("Authorization", "Bearer " + request.accessToken);
    }
    
    let options = {
        headers : headers,
        url : API_BASE_URL + api,
        method : method,
    };

    console.log(options.url);
    
    if (request){
        options.body = JSON.stringify(request);
    }
    
    return fetch(options.url, options).then((response) => {
        console.log("call_response : ", response);
        if (response.status === 200){
            return response.json();
        }
    }).catch((error) => {
        console.log(error);
    });
    
}

//   export function emailSend(loginDto) {
//     console.log("loginDto : ", loginDto);
//     call("/login", "POST", loginDto)
//     .then(response => {
//         console.log("signin response : ",response);
//     })

//     return function emailSend() {
//         return a;
//     };
  
//   }
import Swal from "sweetalert2";
import {API_BASE_URL} from "./ApiConfig";

export function call(api, method, request){
    let  headers = new Headers({
        "Content-Type" : "application/json",
    });

    // if(request.accessToken && request.accessToken != null) {
    //   headers.append("Authorization", "Bearer " + request.accessToken);
    // }
  // return call("/auth/signin","POST", {})
  //    .then((response) => {
  //      localStorage.setItem("ACCESS_TOKEN", response.token)
  //      console.log("response : " + response);
  //      window.location.href = "/";
  //    });

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

export function signin(loginDto) {
    console.log("loginDto : ", loginDto);
    return call("/login", "POST", loginDto)
    .then(response => {
        console.log("signin response : ",response);

        if(response !== undefined) {
            localStorage.setItem("ACCESS_TOKEN", response.accessToken);
            localStorage.setItem("REFRESH_TOKEN", response.refreshToken);
            window.location.href = "/";
        }
    })

  }

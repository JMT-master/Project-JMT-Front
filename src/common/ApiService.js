import Swal from "sweetalert2";
import {API_BASE_URL} from "./ApiConfig";
import { Cookies } from "react-cookie";
import moment from "moment/moment";

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

    console.log('request : ', request);
    console.log('options.body : ', options.body);

    return fetch(options.url, options).then((response) => {
        console.log("call_response : ", response);
        if (response.status === 200){
            return response.json();
        }
    }).catch((error) => {
        console.log(error);
    });

}
  
  // Cookie 값 설정
  export const getCookie = () => {
    const cookies = new Cookies();
    return cookies.get('ACCESS_TOKEN');
  }

  // Date Format
  export const setDateFormat = (data) => {
    const revDate = new Date(data);
    const chnDate = moment(revDate).format('YYYY-MM-DD');
    return chnDate;
  }

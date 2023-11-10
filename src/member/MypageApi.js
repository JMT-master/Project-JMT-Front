import { call } from "../common/ApiService";

  //나의 일정
 export const selectMyTravelScehdule = () => {
    return call("/travel/selectMyTravelScehdule", "GET",null)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    })
  }

  //찜한일정
export const selectWishTravelScehdule = () => {
  return call("/wish/wishTpsSelect", "GET", null)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

  //찜한 여행지
export const selectTravelDes = () => {
    return call("/wish/wishTdnSelect", "GET",null)
    .then((response) => {
      console.log("responseddddddddddd",response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    })
  }

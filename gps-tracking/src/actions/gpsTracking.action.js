/**
 * Summary: Summary of the test action
 * Description: Create test for testing
 * @author Pawan Gupta
 * @date  18 jan 2019
 */

//Import
import { APIService } from "../service/api";
import { urlConstants } from "../constants/uri.constants";
import { responseActions } from "./response.action";

//Public Method
/**
 * Description: handle getdata
 * @return {Promise}
 */
const getData = () => {
  let url = "";
  let body = { OperationType: "10300", Data: "N/A" };
  let header = {};
  url = urlConstants.TEST;

  return APIService.post(url, header, body).then(
    data => {
      let getResponse = responseActions.response(data);
      if (getResponse) {
        return getResponse;
      } else {
        return null;
      }
    },
    error => {
      return responseActions.errorResponse(error);
    }
  );
};

//Public Method
/**
 * Description: handle getdata
 * @return {Promise}
 */
const getMapData = (start) => {
  let url = "";
  url = urlConstants.GEOPOINT + "?deviceId="+window.deviceId+"&start="+start;
  console.log(">>>>>>>>>>>>>>>",start)
  console.log("url>>>", url);
  
  return APIService.get(url).then(
    data => {
      console.log("APIService???", data);
      let getResponse = data ;//responseActions.response(data);

      console.log("APIService11111111111111???", getResponse);


      if (getResponse) {
        return getResponse;
      } else {
        return null;
      }
    },
    error => {
      return responseActions.errorResponse(error);
    }
  );
};

/**
 * Description: handle getdata
 * @return {Promise}
 */
const getZoomMapData = () => {
  let url = "";
  url = urlConstants.TEST + "?deviceId="+window.deviceId;
  console.log("url>>>", url);
  
  return APIService.get(url).then(
    data => {
      console.log("APIService???", data);
      let getResponse = responseActions.response(data);
      if (getResponse) {
        return getResponse;
      } else {
        return null;
      }
    },
    error => {
      return responseActions.errorResponse(error);
    }
  );
};


//Public Method
/**
 * Description: handle postdata
 * @return {Promise}
 */
const postMapData = (mouseMoveCoordinates, zoomLevel, centerCoordinates, currentProgress, pointsDone) => {
  let url = "";
  url = urlConstants.TEST + "?deviceId="+window.deviceId + "&" + "&mouseMoveLat="+mouseMoveCoordinates.lat+"&mouseMoveLng="+mouseMoveCoordinates.lng + "&zoomLevel="+zoomLevel+"&centerLat="+centerCoordinates.lat+"&centerLng="+centerCoordinates.lng+"&currentLatitude="+currentProgress.lat+"&currentLongitude="+currentProgress.lng+"&currentStep="+currentProgress.step+"&pointsDone="+pointsDone;
  console.log("url ----->>>", url); 
  console.log(window.deviceId)

  console.log(
    "mouseMoveCoordinates, zoomLevel, centerCoordinates ---> ",
    mouseMoveCoordinates,
    zoomLevel,
    centerCoordinates,
    currentProgress
  );

  return APIService.post(url).then(
    data => {
      console.log("POST APIService???", data);
      let getResponse = responseActions.response(data);
      if (getResponse) {
        return getResponse;
      } else {
        return null;
      }
    },
    error => {
      return responseActions.errorResponse(error);
    }
  );
};


//Public Method
/**
 * Description: handle postdata
 * @return {Promise}
 * //URL: http://localhost:8081/gpstrackingnew/zoomin?deviceId=9b9e3bedb0426e75&latitude=3&longitude=4&zoomLevel=22
 */
const postZoomIn = (pointsDone,currentProgress) => {
  let url = "";
  url = urlConstants.ZOOMIN + "?deviceId="+window.deviceId + "&currentStep="+currentProgress.step+"&currentLatitude="+currentProgress.lat+"&currentLongitude="+currentProgress.lng+"&pointsDone="+pointsDone;
  console.log("url ----->>>", url); 
  console.log(window.deviceId)

  // console.log(
  //   "mouseMoveCoordinates, zoomLevel, centerCoordinates ---> ",
  //   mouseMoveCoordinates,
  //   zoomLevel
  //     );

  return APIService.get(url).then(
    data => {
      console.log("POST APIService???", data);
      let getResponse = data; //responseActions.response(data);
      if (getResponse) {
        return getResponse;
      } else {
        return null;
      }
    },
    error => {
      return responseActions.errorResponse(error);
    }
  );
};

//Public Method
/**
 * Description: handle postZoom
 * @return {Promise}
 * //URL: http://localhost:8081/gpstrackingnew/zoom?deviceId=9b9e3bedb0426e75&zoomLevel=22
 */
const postZoom = (zoomLevel) => {
  let url = "";
  url = urlConstants.ZOOM + "?deviceId="+window.deviceId + "&zoomLevel="+zoomLevel;
  console.log("url ----->>>", url); 
  console.log(window.deviceId)

  // console.log(
  //   "mouseMoveCoordinates, zoomLevel, centerCoordinates ---> ",
  //   mouseMoveCoordinates,
  //   zoomLevel
  //     );

  return APIService.get(url).then(
    data => {
      console.log("POST APIService???", data);
      let getResponse = data; //responseActions.response(data);
      if (getResponse) {
        return getResponse;
      } else {
        return null;
      }
    },
    error => {
      return responseActions.errorResponse(error);
    }
  );
};

//Public Method
/**
 * Description: handle postZoom
 * @return {Promise}
 * //URL: http://localhost:8081/gpstrackingnew/drag?deviceId=9b9e3bedb0426e75&zoomLevel=22
 */
const postDrag = (centerCoordinates) => {
  let url = "";
  url = urlConstants.DRAG + "?deviceId="+window.deviceId +"&centerLat="+centerCoordinates.lat+"&centerLng="+centerCoordinates.lng;
  console.log("url ----->>>", url); 
  console.log(window.deviceId)

  // console.log(
  //   "mouseMoveCoordinates, zoomLevel, centerCoordinates ---> ",
  //   mouseMoveCoordinates,
  //   zoomLevel
  //     );

  return APIService.get(url).then(
    data => {
      console.log("POST APIService???", data);
      let getResponse = data; //responseActions.response(data);
      if (getResponse) {
        return getResponse;
      } else {
        return null;
      }
    },
    error => {
      return responseActions.errorResponse(error);
    }
  );
};

//Public Method
/**
 * Description: view cordinated
 * @return {Promise}
 */
const viewCoordinates = () => {
  let url = "";
  url = urlConstants.VIEW + "?deviceId="+window.deviceId;
  console.log("url ----->>>", url); 
  console.log(window.deviceId)

  return APIService.get(url).then(
    data => {
      console.log("get cordinates???", data);
      let getResponse = responseActions.response(data);
      if (getResponse) {
        return getResponse;
      } else {
        return null;
      }
    },
    error => {
      return responseActions.errorResponse(error);
    }
  );
};

//Public Method
/**
 * Description: view cordinated
 * @return {Promise}
 */
const viewDeviceStatus = () => {
  let url = "";
  url = urlConstants.VIEWDEVICESTATUS + "?deviceId="+window.deviceId;
  console.log("url ----->>>", url); 
  console.log(window.deviceId)

  return APIService.get(url).then(
    data => {
      console.log("get device status???", data);
      let getResponse = responseActions.response(data);
      if (getResponse) {
        return getResponse;
      } else {
        return null;
      }
    },
    error => {
      return responseActions.errorResponse(error);
    }
  );
};

//Public Method
/**
 * Description: reset data
 * @return {Promise}
 */
const resetdata = () => {
  let url = "";
  url = urlConstants.RESETDATA + "?deviceId="+window.deviceId;
  console.log("url ----->>>", url); 
  console.log(window.deviceId)

  return APIService.post(url).then(
    data => {
      console.log("reset status???", data);
      let getResponse = responseActions.response(data);
      if (getResponse) {
        return getResponse;
      } else {
        return null;
      }
    },
    error => {
      return responseActions.errorResponse(error);
    }
  );
};

//Export testActions
export const testActions = {
  getData,
  getMapData,
  getZoomMapData,
  postMapData,
  postZoomIn,
  postZoom,
  postDrag,
  viewCoordinates,
  viewDeviceStatus,
  resetdata
};

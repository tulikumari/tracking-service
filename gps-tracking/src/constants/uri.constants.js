export const API_DIRECTORY = {
  //DOC_ROOT: "https://api.coindesk.com/v1/bpi/currentprice.json"
  //DOC_ROOT: "http://10.131.126.69:8081/gpstracking"
  DOC_ROOT: window.config.gpsTrackingService
};
export const urlConstants = {
  DOCROOT:API_DIRECTORY.DOC_ROOT,

  GEOPOINT: API_DIRECTORY.DOC_ROOT + "/geopoint" ,
  VIEW: API_DIRECTORY.DOC_ROOT + "/view" ,
  VIEWDEVICESTATUS: API_DIRECTORY.DOC_ROOT + "/viewDeviceStatus" ,
  STARTDEVICE: API_DIRECTORY.DOC_ROOT + "/startdevice" ,
  
  STARTDEVICE: API_DIRECTORY.DOC_ROOT + "/stopdevice" ,
  DRAG: API_DIRECTORY.DOC_ROOT + "/drag" ,
  ZOOMIN: API_DIRECTORY.DOC_ROOT + "/zoomin" ,
  ZOOMOUT: API_DIRECTORY.DOC_ROOT + "/zoomout" ,
  ZOOM: API_DIRECTORY.DOC_ROOT + "/zoom" ,
  DRAG: API_DIRECTORY.DOC_ROOT + "/drag" ,
  RESETDATA: API_DIRECTORY.DOC_ROOT + "/resettable" ,


  TEST: API_DIRECTORY.DOC_ROOT,
  BASEURL: API_DIRECTORY.DOC_ROOT
};

//URL: http://localhost:8081/gpstrackingnew/geopoint?deviceId=9b9e3bedb0426e75
//URL: http://localhost:8081/gpstrackingnew/view?deviceId=9b9e3bedb0426e75
//URL: http://localhost:8081/gpstrackingnew/startdevice?deviceId=9b9e3bedb0426e75&timeInterval=5
//URL:  http://localhost:8081/gpstrackingnew/stopdevice?deviceId=9b9e3bedb0426e75
//URL: http://localhost:8081/gpstrackingnew/drag?deviceId=9b9e3bedb0426e75&latitude=1&longitude=2&zoomLevel=11
//URL: http://localhost:8081/gpstrackingnew/zoomin?deviceId=9b9e3bedb0426e75&latitude=3&longitude=4&zoomLevel=22
//URL: http://localhost:8081/gpstrackingnew/zoomout?deviceId=9b9e3bedb0426e75&latitude=5&longitude=6&zoomLevel=33








const express = require("express");
const app = express();
const dbConnectionManager = require("./db");
const constants = require("./constants");
const dbHelper = require("./dbhelper");
const Promise = require("promise");

//Description: we need to get geolocation at every timeinterval
//1. get geoservice data
//2. insert geoservice data into table
//3. send back geoservice data to ui
//URL: http://localhost:8081/gpstrackingnew/geopoint?deviceId=9b9e3bedb0426e75
app.get("/gpstrackingnew/geopoint", (req, res) => {
  var deviceId = req.query.deviceId;
  var start = req.query.start;
  if (deviceId ) {
    // if(start === "1") {
    //         deleteDeviceCordinate = dbHelper.deleteDeviceCoordinates(deviceId);
    //         deleteDeviceCordinate.then(
    //               function (dataRespone) {
    //                 console.log(dataRespone);
    //                 //res.send("/gpstracking/get --> " + dataRespone.message);
    //                 var updateCoordinates = dbHelper.updateCoordinates(
    //                   deviceId,
    //                   0,
    //                   0,
    //                   "",
    //                   ""
    //                 );
    //                 updateCoordinates.then(
    //                   function (dataRespone) {
    //                     console.log(dataRespone);
    //                     res.send(JSON.parse('[{"isTransfer":"0"}]'));
    //                   },
    //                   function (errorResponse) {
    //                     console.log(errorResponse);
    //                     res.send("/gpstracking/get --> " + errorResponse.message);
    //                   }
    //                 );
    //               },
    //               function (errorResponse) {
    //                 console.log(errorResponse);
    //                 res.send("/gpstracking/get --> " + errorResponse.message);
    //               }
    //         );
    // }
    var Request = require("request");
    var uri = constants.GEOSERVICE + "?peerid=" + deviceId +"&start="+start;
    Request.get(uri, (error, response, body) => {
      if (error) {
        res.send(new Error(error));
      }

      console.log(JSON.parse(body).length);
      var responseData = JSON.parse(body);
      if (responseData.length == 0) {
        res.send(new Error("Error is missing"));
      }
      
      if(JSON.parse(body).length === 0) {
        res.send(responseData);
      } else {
        console.log("responseData.isTransfer",responseData[0].isTransfer)
        if (responseData[0].isTransfer === "1") {
            var getLatitude = responseData[0].latitude;
            var getLongitude = responseData[0].longitude;

            //check device is exits or not
            deviceInfo = dbHelper.deviceDetails(deviceId);
            console.log("deviceInfo--> ", deviceInfo);
            deviceInfo.then(
              function (data) {
                //add corrdinates
                  
                if(start === "1") {
                  deleteDeviceCordinate = dbHelper.deleteDeviceCoordinates(deviceId);
                  deleteDeviceCordinate.then(
                        function (dataRespone) {
                          console.log(dataRespone);
                          //res.send("/gpstracking/get --> " + dataRespone.message);
                          var updateCoordinates = dbHelper.updateCoordinates(
                            deviceId,
                            0,
                            0,
                            "",
                            ""
                          );
                          updateCoordinates.then(
                            function (dataRespone) {
                              console.log(dataRespone);
                              res.send(JSON.parse('[{"isTransfer":"0"}]'));
                            },
                            function (errorResponse) {
                              console.log(errorResponse);
                              res.send("/gpstracking/get --> " + errorResponse.message);
                            }
                          );
                        },
                        function (errorResponse) {
                          console.log(errorResponse);
                          res.send("/gpstracking/get --> " + errorResponse.message);
                        }
                  );
                }
                /*****Working */
                addDevice = dbHelper.insertCoordinates(deviceId, getLatitude, getLongitude);
                addDevice.then(
                  function (dataRespone) {
                    console.log(dataRespone);
                    //res.send("/gpstracking/get --> " + dataRespone.message);
                    res.send(responseData);
                  },
                  function (errorResponse) {
                    console.log(errorResponse);
                    res.send("/gpstracking/get --> " + errorResponse.message);
                  }
                );
                /*****Working */
              },
              function (errorResponse) {
                console.log(errorResponse.message);
                res.send("/gpstracking/get --> " + errorResponse.message);
              }
            );
          } else {
            deleteDeviceCordinate = dbHelper.deleteDeviceCoordinates(deviceId);
            deleteDeviceCordinate.then(
                  function (dataRespone) {
                    console.log(dataRespone);
                    //res.send("/gpstracking/get --> " + dataRespone.message);
                    var updateCoordinates = dbHelper.updateCoordinates(
                      deviceId,
                      0,
                      0,
                      "",
                      ""
                    );
                    updateCoordinates.then(
                      function (dataRespone) {
                        console.log(dataRespone);
                        res.send(JSON.parse('[{"isTransfer":"0"}]'));
                      },
                      function (errorResponse) {
                        console.log(errorResponse);
                        res.send("/gpstracking/get --> " + errorResponse.message);
                      }
                    );
                  },
                  function (errorResponse) {
                    console.log(errorResponse);
                    res.send("/gpstracking/get --> " + errorResponse.message);
                  }
            );
            //dbHelper.deleteDeviceCoordinates(deviceId);
            // res.send(JSON.parse('[{"isTransfer":"0"}]'));
          }
       }
    }).on("error", function (err) {
      console.error(err);
      //new Error(err);
      res.send(new Error(err));
    });
  } else {
    console.log("Some parameters are missing");
    res.send(new Error("Some parameters are missing"));
  }
});

//Description: this api is used for displayer page
//URL: http://localhost:8081/gpstrackingnew/view?deviceId=9b9e3bedb0426e75
app.get("/gpstrackingnew/view", (req, res) => {
  var deviceId = req.query.deviceId;
  deviceInfo = dbHelper.viewCoordinates(deviceId);
  deviceInfo.then(
    function (resData) {
      console.log("response data----->" + resData);
      console.log("response data----->" + resData.length);
      res.send(resData);
    },
    function (error) {
      //when empty
      console.log("reject-->" + error.message);
    });

  
});

//Description: this api is used for displayer page
//URL: http://localhost:8081/gpstrackingnew/viewDeviceStatus?deviceId=9b9e3bedb0426e75
app.get("/gpstrackingnew/viewDeviceStatus", (req, res) => {
  var deviceId = req.query.deviceId;
  deviceInfo = dbHelper.viewDeviceStatus(deviceId);
  deviceInfo.then(
    function (resData) {
      console.log("response data----->" + resData);
      console.log("response data----->" + resData.length);
      res.send(resData);
    },
    function (error) {
      //when empty
      console.log("reject-->" + error.message);
    });

});

//Description: Start the service
//1. insert device with status or update status of device depending upon status
//URL: http://localhost:8081/gpstrackingnew/startdevice?deviceId=9b9e3bedb0426e75&timeInterval=5
app.get("/gpstrackingnew/startdevice", (req, res) => {
  console.log("/gpstracking/startdevice");
  var deviceInfo;
  var deviceId;
  var timeInterval;
  var deviceStatus = 1;
  var addDevice;
  var updateDeviceStatus;
  var updateDeviceStatus;

  //check the data for querystring
  if (req.query.deviceId && req.query.timeInterval) {
    //get data from querystring
    deviceId = req.query.deviceId;
    timeInterval = req.query.timeInterval;

    //check device is exits or not
    deviceInfo = dbHelper.deviceDetails(deviceId);
    deviceInfo.then(
      function (data) {
        //if device found , update device with status only when status is not 1
        if (data.status == 0 || data.status == 2) {
          updateDeviceStatus = dbHelper.updateDeviceStatus(
            deviceId,
            deviceStatus
          );
          updateDeviceStatus.then(
            function (resData) {
              console.log("response data----->" + resData);
              console.log("Data has been updated successfully");
            },
            function (errorData) {
              console.log("reject-->" + errorData);
            }
          );
        } else {
          console.log("Device is already started.");
        }
      },
      function (data) {
        //add device with status and timeInterval
        console.log("reject-->" + data);
        addDevice = dbHelper.addDevice(deviceId, deviceStatus, timeInterval);
      }
    );
    // dbHelper.start(deviceId);
  } else {
    console.log(" Deviceid or timeinterval is not available ");
  }

  res.send("startdevice");
});

//Description: Stop the service
//1. update status of device from gpstracking_device_status table
//2. delete all data of this device from gpstracking_coordinates table
//URL:  http://localhost:8081/gpstrackingnew/stopdevice?deviceId=9b9e3bedb0426e75
app.get("/gpstrackingnew/stopdevice", (req, res) => {
  console.log("/gpstracking/stopdevice");
  var deviceInfo;
  var deviceId;
  if (req.query.deviceId) {
    deviceId = req.query.deviceId;
    deviceInfo = dbHelper.deviceDetails(deviceId);

    deviceInfo.then(
      function (data) {
        if (data.device_id) {
          dbHelper.stop(deviceId);
          dbHelper.deleteDeviceCoordinates(deviceId);
          res.send("stop --> device id is found");
        } else {
          console.log("device id is not found");
          res.send("stop --> device id is not found");
        }
      },
      function (responseData) {
        console.log(responseData);
        res.send("stop --> reject" + responseData.message);
      }
    );
  } else {
    console.log(" Deviceid is not available ");
  }
  //res.send("/gpstracking/stop");
});

//Description: Save coordinates during zoomin
//URL: http://localhost:8081/gpstrackingnew/zoomin?deviceId=9b9e3bedb0426e75&latitude=3&longitude=4&zoomLevel=22
app.get("/gpstrackingnew/zoomin", (req, res) => {
  console.log("/gpstracking/zoomin");
  var deviceInfo;
  var deviceId;
  var currentStep;
  var pointsDone;
  var currentLatitude;
  var currentLongitude;
 
  //check the data for querystring
  if (req.query.deviceId) {
    //get data from querystring
    deviceId = req.query.deviceId;
    currentStep = req.query.currentStep;
    pointsDone = req.query.pointsDone;
    currentLatitude = req.query.currentLatitude;
    currentLongitude = req.query.currentLongitude;

    //check device is exits or not
    deviceInfo = dbHelper.deviceDetails(deviceId);
    deviceInfo.then(
      function (data) {
        //add corrdinates
        var updateCoordinates = dbHelper.updateCoordinates(
          deviceId,
          pointsDone,
          currentStep,
          currentLatitude,
          currentLongitude
        );
        updateCoordinates.then(
          function (dataRespone) {
            console.log(dataRespone);
            res.send("/gpstracking/zoomin --> " + dataRespone.message);
          },
          function (errorResponse) {
            console.log(errorResponse);
            res.send("/gpstracking/zoomin --> " + errorResponse);
          }
        );
      },
      function (errorResponse) {
        res.send("/gpstracking/zoomin --> " + errorResponse);
      }
    );
  } else {
    console.log(" error during fetching data ");
    res.send(" error during fetching data ");
  }
});

//Description: Save coordinates during zoomout
//URL: http://localhost:8081/gpstrackingnew/zoomout?deviceId=9b9e3bedb0426e75&latitude=5&longitude=6&zoomLevel=33
app.post("/gpstrackingnew/zoomout", (req, res) => {
  console.log("/gpstracking/zoomout");
  var deviceInfo;
  var deviceId;
  var latitude;
  var longitude;
  var zoomLevel;

  //check the data for querystring
  if (req.query.deviceId) {
    //get data from querystring
    deviceId = req.query.deviceId;
    latitude = req.query.latitude;
    longitude = req.query.longitude;
    zoomLevel = req.query.zoomLevel;

    //check device is exits or not
    deviceInfo = dbHelper.deviceDetails(deviceId);
    deviceInfo.then(
      function (data) {
        //add corrdinates
        var updateCoordinates = dbHelper.updateCoordinates(
          deviceId,
          latitude,
          longitude,
          zoomLevel
        );
        updateCoordinates.then(
          function (dataRespone) {
            console.log(dataRespone);
            res.send("/gpstracking/zoomout --> " + dataRespone.message);
          },
          function (errorResponse) {
            console.log(errorResponse);
            res.send("/gpstracking/zoomout --> " + errorResponse);
          }
        );
      },
      function (errorResponse) {
        res.send("/gpstracking/zoomout --> " + errorResponse);
      }
    );
  } else {
    console.log(" Error during fetching data ");
    res.send(" Error during fetching data ");
  }
});



//Description: Save coordinates during zoomout
//URL: http://localhost:8081/gpstrackingnew/zoom?deviceId=9b9e3bedb0426e75&latitude=5&longitude=6&zoomLevel=33
app.get("/gpstrackingnew/zoom", (req, res) => {
  console.log("/gpstracking/zoom");
  var deviceInfo;
  var deviceId;
  var zoomLevel;
 
 
  //check the data for querystring
  if (req.query.deviceId) {
    //get data from querystring
    deviceId = req.query.deviceId;
    zoomLevel = req.query.zoomLevel;

    //check device is exits or not
    deviceInfo = dbHelper.deviceDetails(deviceId);
    deviceInfo.then(
      function (data) {
        //add corrdinates
        var updateZoom = dbHelper.updateZoom(
          deviceId,
          zoomLevel,
        );
        updateZoom.then(
          function (dataRespone) {
            console.log(dataRespone);
            res.send("/gpstracking/zoomin --> " + dataRespone.message);
          },
          function (errorResponse) {
            console.log(errorResponse);
            res.send("/gpstracking/zoomin --> " + errorResponse);
          }
        );
      },
      function (errorResponse) {
        res.send("/gpstracking/zoomin --> " + errorResponse);
      }
    );
  } else {
    console.log(" error during fetching data ");
    res.send(" error during fetching data ");
  }
});

//Description: Save coordinates during drag
//URL: http://localhost:8081/gpstrackingnew/drag?deviceId=9b9e3bedb0426e75&latitude=5&longitude=6&zoomLevel=33
app.get("/gpstrackingnew/drag", (req, res) => {
  console.log("/gpstracking/drag");
  var deviceInfo;
  var deviceId;
  var currentLatitude;
  var currentLongitude;
 
 
  //check the data for querystring
  if (req.query.deviceId) {
    //get data from querystring
    deviceId = req.query.deviceId;
    latitude = req.query.centerLat;
    longitude = req.query.centerLng;

    //check device is exits or not
    deviceInfo = dbHelper.deviceDetails(deviceId);
    deviceInfo.then(
      function (data) {
        //add corrdinates
        var updateDrag = dbHelper.updateDrag(
          deviceId,
          latitude,
          longitude
        );
        updateDrag.then(
          function (dataRespone) {
            console.log(dataRespone);
            res.send("/gpstracking/updateDrag --> " + dataRespone.message);
          },
          function (errorResponse) {
            console.log(errorResponse);
            res.send("/gpstracking/updateDrag --> " + errorResponse);
          }
        );
      },
      function (errorResponse) {
        res.send("/gpstracking/zoomin --> " + errorResponse);
      }
    );
  } else {
    console.log(" error during fetching data ");
    res.send(" error during fetching data ");
  }
});


//Description: reset table delete in future
//URL:  http://localhost:8081/gpstrackingnew/resettable?deviceId=9b9e3bedb0426e75
app.post("/gpstrackingnew/resettable", (req, res) => {
  console.log("/gpstracking/resettable");
  var deviceInfo;
  var deviceId;
  if (req.query.deviceId) {
    deviceId = req.query.deviceId;
    deviceInfo = dbHelper.resetTable(deviceId);

    deviceInfo.then(
      function (dataRespone) {
        console.log(dataRespone);
        res.send("/gpstracking/resettable --> ");
      },
      function (errorResponse) {
        console.log(errorResponse);
        res.send("/gpstracking/resettable --> ");
      }
    );
  } else {
    console.log(" Deviceid is not available ");
  }
  //res.send("/gpstracking/stop");
});

// Listen to default port, or 8080
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

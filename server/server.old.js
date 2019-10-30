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
//URL: http://localhost:8081/gpstracking/geopoint?deviceId=9b9e3bedb0426e75&latitude=28.6062&longitude=78.4307&zoomLevel=5
app.get("/gpstracking/geopoint", (req, res) => {
  var deviceId = req.query.deviceId;
  var zoomLevel = req.query.zoomLevel;
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;

  if (deviceId && zoomLevel && zoomLevel && longitude && latitude) {
    var Request = require("request");
    var uri = constants.GEOSERVICE + "?peerid=" + deviceId;
    Request.get(uri, (error, response, body) => {
      if (error) {
        res.send(new Error(err));
      }

      console.log(JSON.parse(body).length);
      var responseData = JSON.parse(body);
      if (responseData.length == 0) {
        res.send(new Error("Error is missing"));
      }
      var getLatitude = responseData[0].longitude;
      var getLongitude = responseData[0].latitude;

      //check device is exits or not
      deviceInfo = dbHelper.deviceDetails(deviceId);
      console.log("deviceInfo--> ", deviceInfo);
      deviceInfo.then(
        function (data) {
          //add corrdinates
          addDevice = dbHelper.addCoordinates(
            deviceId,
            latitude,
            longitude,
            zoomLevel,
            getLatitude,
            getLongitude,
            "getgeopoint"
          );
          addDevice.then(
            function (dataRespone) {
              console.log(dataRespone);
              res.send("/gpstracking/get --> " + dataRespone.message);
            },
            function (errorResponse) {
              console.log(errorResponse);
              res.send("/gpstracking/get --> " + errorResponse);
            }
          );
        },
        function (errorResponse) {
          console.log(errorResponse.message);
          res.send("/gpstracking/get --> " + errorResponse.message);
        }
      );

      res.send(JSON.parse(body));
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
//URL: http://localhost:8081/gpstracking/view?deviceId=9b9e3bedb0426e75
app.get("/gpstracking/view", (req, res) => {
  var deviceId = req.query.deviceId;
  deviceInfo = dbHelper.getCoordinates(deviceId);
  deviceInfo.then(
    function (resData) {
      console.log("response data----->" + resData);
      console.log("response data----->" + resData.length);
    },
    function (error) {
      //when empty
      console.log("reject-->" + error.message);
    });

  res.send("/gpstracking/view ");
});

//Description: Start the service
//1. insert device with status or update status of device depending upon status
//URL: http://localhost:8081/gpstracking/startdevice?deviceId=9b9e3bedb0426e75&timeInterval=5
app.get("/gpstracking/startdevice", (req, res) => {
  console.log("/gpstracking/startdevice");
  var deviceInfo;
  var deviceId;
  var timeInterval;
  var deviceStatus = 1;
  var addDevice;
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
//URL:  http://localhost:8081/gpstracking/stopdevice?deviceId=9b9e3bedb0426e75
app.get("/gpstracking/stopdevice", (req, res) => {
  console.log("/gpstracking/stop");
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

//Description: Save coordinates during drag
//URL: http://localhost:8081/gpstracking/drag?deviceId=9b9e3bedb0426e75&latitude=28.6062&longitude=78.4307&zoomLevel=8&dragEndLatitude=1&dragEndLongitude=2
app.post("/gpstracking/drag", (req, res) => {
  console.log("/gpstracking/drag");
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
    dragEndLatitude = req.query.dragEndLatitude;
    dragEndLongitude = req.query.dragEndLongitude;

    //check device is exits or not
    deviceInfo = dbHelper.deviceDetails(deviceId);
    deviceInfo.then(
      function (data) {
        //add corrdinates
        addDevice = dbHelper.addCoordinates(
          deviceId,
          latitude,
          longitude,
          zoomLevel,
          dragEndLatitude,
          dragEndLongitude,
          "drag"
        );
        addDevice.then(
          function (dataRespone) {
            console.log(dataRespone);
            res.send("/gpstracking/drag --> " + dataRespone.message);
          },
          function (errorResponse) {
            console.log(errorResponse);
            res.send("/gpstracking/drag --> " + errorResponse);
          }
        );
      },
      function (errorResponse) {
        res.send("/gpstracking/drag --> " + errorResponse);
      }
    );
  } else {
    console.log(" error during fetching data ");
    res.send(" error during fetching data ");
  }
});

//Description: Save coordinates during zoomin
//URL: http://localhost:8081/gpstracking/zoomin?deviceId=9b9e3bedb0426e75&latitude=28.6062&longitude=78.4307&zoomLevel=8&zoomInLatitude=1&zoomInLongitude=2
app.post("/gpstracking/zoomin", (req, res) => {
  console.log("/gpstracking/zoomin");
  var deviceInfo;
  var deviceId;
  var latitude;
  var longitude;
  var zoomLevel;
  var zoomInLatitude;
  var zoomInLongitude;

  //check the data for querystring
  if (req.query.deviceId) {
    //get data from querystring
    deviceId = req.query.deviceId;
    latitude = req.query.latitude;
    longitude = req.query.longitude;
    zoomLevel = req.query.zoomLevel;
    zoomInLatitude = req.query.zoomInLatitude;
    zoomInLongitude = req.query.zoomInLongitude;

    //check device is exits or not
    deviceInfo = dbHelper.deviceDetails(deviceId);
    deviceInfo.then(
      function (data) {
        //add corrdinates
        addDevice = dbHelper.addCoordinates(
          deviceId,
          latitude,
          longitude,
          zoomLevel,
          zoomInLatitude,
          zoomInLongitude,
          "zoomin"
        );
        addDevice.then(
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
//URL: http://localhost:8081/gpstracking/zoomout?deviceId=9b9e3bedb0426e75&latitude=28.6062&longitude=78.4307&zoomLevel=8&zoomOutLatitude=1&zoomOutLongitude=2
app.post("/gpstracking/zoomout", (req, res) => {
  console.log("/gpstracking/zoomout");
  var deviceInfo;
  var deviceId;
  var latitude;
  var longitude;
  var zoomLevel;
  var zoomOutLatitude;
  var zoomOutLongitude;

  //check the data for querystring
  if (req.query.deviceId) {
    //get data from querystring
    deviceId = req.query.deviceId;
    latitude = req.query.latitude;
    longitude = req.query.longitude;
    zoomLevel = req.query.zoomLevel;
    zoomOutLatitude = req.query.zoomOutLatitude;
    zoomOutLongitude = req.query.zoomOutLongitude;

    //check device is exits or not
    deviceInfo = dbHelper.deviceDetails(deviceId);
    deviceInfo.then(
      function (data) {
        //add corrdinates
        addDevice = dbHelper.addCoordinates(
          deviceId,
          latitude,
          longitude,
          zoomLevel,
          zoomOutLatitude,
          zoomOutLongitude,
          "zoomout"
        );
        addDevice.then(
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

// Listen to default port, or 8080
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

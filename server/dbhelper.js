const Promise = require("promise");

const dbConnectionManager = require("./db");

module.exports = {
  addCoordinates: function( deviceId, latitude, longitude, zoomLevel, dragEndLatitude,  dragEndLongitude,  movementType ) {
    return new Promise(function(resolve, reject) {
      var sql = "";
      var connection = "";
      try {
        connection = dbConnectionManager.dbConnection();
        sql =
          "INSERT INTO gpstracking_coordinates (device_id, latitude_center, longitude_center, zoom_level, latitude_movement, longitude_movement	, movement_type) ";
        sql +=
          " VALUES ( '" +
          deviceId +
          "', '" +
          latitude +
          "', '" +
          longitude +
          "', " +
          zoomLevel +
          ", '" +
          dragEndLatitude +
          "', '" +
          dragEndLongitude +
          "', '" +
          movementType +
          "' )";

        console.log(sql);
        connection.query(sql, function(err, result, fields) {
          console.log("----" + err);
          if (err) {
            reject(new Error(err));
          }
          console.log("+++++" + err);
          resolve({ message: "Data has been added successfully" });
        });
        connection.end();
      } catch (err) {
        console.log(err);
        reject(new Error(err));
      }
    });
  },

  insertCoordinates: function( deviceId, latitude, longitude ) {
    return new Promise(function(resolve, reject) {
      var sql = "";
      var connection = "";
      try {
        connection = dbConnectionManager.dbConnection();
        sql = "INSERT INTO gpstracking_coordinates (device_id, latitude, longitude) VALUES ('" + deviceId + "', '" + latitude + "', '" + longitude + "' )";

        console.log(sql);
        connection.query(sql, function(err, result, fields) {
          if (err) {
            reject(new Error(err));
          }
          resolve({ message: "Data has been added successfully" });
        });
        connection.end();
      } catch (err) {
        console.log(err);
        reject(new Error(err));
      }
    });
  },


  updateCoordinates: function( deviceId, pointsDone, currentStep, currentLatitude, currentLongitude ) {
    return new Promise(function(resolve, reject) {
      var sql = "";
      var connection = "";
      try {
        connection = dbConnectionManager.dbConnection();
        sql = " update gpstracking_device_status set status = 1 , points_done ='" + pointsDone + "', current_step ='" + currentStep + "', current_latitude ='" + currentLatitude + "', current_longitude ='" + currentLongitude + "'  where device_id='" + deviceId + "' ";

        console.log(sql);
        connection.query(sql, function(err, result, fields) {
          console.log("----" + err);
          if (err) {
            reject(new Error(err));
          }
          console.log("+++++" + err);
          resolve({ message: "Data has been updated successfully" });
        });
        connection.end();
      } catch (err) {
        console.log(err);
        reject(new Error(err));
      }
    });
  },

  updateZoom: function( deviceId, zoomLevel ) {
    return new Promise(function(resolve, reject) {
      var sql = "";
      var connection = "";
      try {
        connection = dbConnectionManager.dbConnection();
        sql = " update gpstracking_device_status set status = 1 , zoom_level='" + zoomLevel + "'  where device_id='" + deviceId + "' ";

        console.log(sql);
        connection.query(sql, function(err, result, fields) {
          console.log("----" + err);
          if (err) {
            reject(new Error(err));
          }
          console.log("+++++" + err);
          resolve({ message: "Data has been updated successfully" });
        });
        connection.end();
      } catch (err) {
        console.log(err);
        reject(new Error(err));
      }
    });
  },

  updateDrag: function( deviceId, latitude, longitude ) {
    return new Promise(function(resolve, reject) {
      var sql = "";
      var connection = "";
      try {
        connection = dbConnectionManager.dbConnection();
        sql = " update gpstracking_device_status set status = 1 , latitude_center ='" + latitude + "', longitude_center	='" + longitude + "' where device_id='" + deviceId + "' ";

        console.log(sql);
        connection.query(sql, function(err, result, fields) {
          console.log("----" + err);
          if (err) {
            reject(new Error(err));
          }
          console.log("+++++" + err);
          resolve({ message: "Data has been updated successfully" });
        });
        connection.end();
      } catch (err) {
        console.log(err);
        reject(new Error(err));
      }
    });
  },

  stop: function(deviceId) {
    return new Promise(function(resolve, reject) {
      var sql = "";
      var connection = "";
      try {
        connection = dbConnectionManager.dbConnection();
        sql =
          " update gpstracking_device_status set status = 2 where device_id='" +
          deviceId +
          "' ";
        connection.query(sql, function(err, result, fields) {
          if (err) {
            reject(new Error(err));
          }
          console.log(result.affectedRows + " record(s) updated");
          resolve({ message: result.affectedRows + " record(s) updated" });
        });
        connection.end();
      } catch (err) {
        console.log(err);
        reject(new Error(err));
      }
    });
  },

  getCoordinates: function(deviceId) {
    return new Promise(function(resolve, reject) {
      var data = "";
      var sql = "";
      var connection = "";
      try {
        connection = dbConnectionManager.dbConnection();

        sql =
          "SELECT t1.* FROM `gpstracking_coordinates` t1 LEFT JOIN `gpstracking_device_status` t2 on t1.device_id = t2.device_id where t2.status=1 and t2.device_id = '" +
          deviceId +
          "' and movement_type = 'getgeopoint'";
        console.log("sql-->", sql);
        connection.query(sql, function(err, result, fields) {
          if (err) {
            reject(new Error(err));
          }
          if (result.length > 0) {
              console.log(result.length);
              console.log(result);
                resolve(result);
          } else {
            console.log("empty data");
            resolve([])
            //reject({ message: "data is not available" });
          }
        });
        connection.end();
      } catch (err) {
        console.log(err);
        reject(new Error(err));
      }
    });
  },

  viewCoordinates: function(deviceId) {
    return new Promise(function(resolve, reject) {
      var data = "";
      var sql = "";
      var connection = "";
      try {
        connection = dbConnectionManager.dbConnection();

        sql =
          "SELECT t1.* FROM `gpstracking_coordinates` t1 LEFT JOIN `gpstracking_device_status` t2 on t1.device_id = t2.device_id where t2.status=1 and t2.device_id = '" +
          deviceId + "'" ;
        console.log("sql-->", sql);
        connection.query(sql, function(err, result, fields) {
          if (err) {
            reject(new Error(err));
          }
          if (result.length > 0) {
              console.log(result.length);
              console.log(result);
                resolve(result);
          } else {
            console.log("empty data");
            resolve([])
            //reject({ message: "data is not available" });
          }
        });
        connection.end();
      } catch (err) {
        console.log(err);
        reject(new Error(err));
      }
    });
  },

  viewDeviceStatus: function(deviceId) {
    return new Promise(function(resolve, reject) {
      var data = "";
      var sql = "";
      var connection = "";
      try {
        connection = dbConnectionManager.dbConnection();

        sql =
          "SELECT t2.* FROM `gpstracking_device_status` t2 where t2.status=1 and t2.device_id = '" +
          deviceId + "'" ;
        console.log("sql-->", sql);
        connection.query(sql, function(err, result, fields) {
          if (err) {
            reject(new Error(err));
          }
          if (result.length > 0) {
              console.log(result.length);
              console.log(result);
                resolve(result);
          } else {
            console.log("empty data");
            resolve([])
            //reject({ message: "data is not available" });
          }
        });
        connection.end();
      } catch (err) {
        console.log(err);
        reject(new Error(err));
      }
    });
  },

  deviceDetails: function(deviceId) {
    return new Promise(function(resolve, reject) {
      var data = "";
      var sql = "";
      var connection = "";
      try {
        connection = dbConnectionManager.dbConnection();
        sql =
          "select * from gpstracking_device_status where device_id='" +
          deviceId +
          "'";
        console.log("sql-->", sql);
        connection.query(sql, function(err, result, fields) {
          if (err) {
            reject(new Error(err));
          }
          if (result.length > 0) {
            data = result[0].device_id;
            resolve(result[0]);
          } else {
            //reject("Deviceid is not available");
            reject({ message: "Deviceid is not available" });
          }
        });
        connection.end();
      } catch (err) {
        console.log(err);
        reject(new Error(err));
      }
    });
  },

  addDevice: function(deviceId, status, timeInterval) {
    return new Promise(function(resolve, reject) {
      var sql = "";
      var connection = "";
      try {
        connection = dbConnectionManager.dbConnection();
        sql =
          "INSERT INTO gpstracking_device_status (device_id, status, time_interval) VALUES ('" +
          deviceId +
          "', " +
          status +
          ", " +
          timeInterval +
          ")";

        console.log(sql);
        connection.query(sql, function(err, result, fields) {
          if (err) {
            reject(new Error(err));
          }
          resolve(1);
          resolve({ message: "data added successfully" });
        });
        connection.end();
      } catch (err) {
        console.log(err);
        reject(new Error(err));
      }
    });
  },

  updateDeviceStatus: function(deviceId, status) {
    return new Promise(function(resolve, reject) {
      var sql = "";
      var connection = "";
      try {
        connection = dbConnectionManager.dbConnection();
        sql =
          " update gpstracking_device_status set status = " +
          status +
          " where device_id='" +
          deviceId +
          "' ";
        connection.query(sql, function(err, result, fields) {
          if (err) {
            reject(new Error(err));
          }
          console.log(result.affectedRows + " record(s) updated");
          //resolve(1);
          reject (new Error(result.affectedRows +  " record(s) updated" ));
          //resolve({ message: result.affectedRows + " record(s) updated" });
        });
        connection.end();
      } catch (err) {
        console.log(err);
        reject(new Error(err));
      }
    });
  },

  deleteDeviceCoordinates: function(deviceId) {
    return new Promise(function(resolve, reject) {
      var sql = "";
      var connection = "";
      try {
        connection = dbConnectionManager.dbConnection();
        sql =
          " delete from gpstracking_coordinates where device_id='" +
          deviceId +
          "' ";
        connection.query(sql, function(err, result, fields) {
          if (err) {
            reject(new Error(err));
          }
          console.log("Number of records deleted: " + result.affectedRows);
          //resolve(1);
          resolve({
            message: "Number of records deleted: " + result.affectedRows
          });
        });
        connection.end();
      } catch (err) {
        console.log(err);
        reject(new Error(err));
      }
    });
  },

  /************static function remove in future 
   * add explicitly lat and long
  */
  viewCoordinatesDummy: function(deviceId) {
    return new Promise(function(resolve, reject) {
      var data = "";
      var sql = "";
      var connection = "";
      try {
        connection = dbConnectionManager.dbConnection();

        sql =
          "SELECT t1.* FROM `gpstracking_coordinates` t1 LEFT JOIN `gpstracking_device_status` t2 on t1.device_id = t2.device_id where t2.device_id = '" +
          deviceId + "' ORDER BY t1.id DESC LIMIT 1" ;
        console.log("sql-->", sql);
        connection.query(sql, function(err, result, fields) {
          if (err) {
            reject(new Error(err));
          }
          if (result.length > 0) {
              console.log(result.length);
              console.log(result);
                resolve(result[0]);
          } else {
            console.log("empty data");
            resolve([])
            //reject({ message: "data is not available" });
          }
        });
        connection.end();
      } catch (err) {
        console.log(err);
        reject(new Error(err));
      }
    });
  },
  resetTable1: function(deviceId) {
    return new Promise(function(resolve, reject) {
      var sql = "";
      var connection = "";
      try {
        connection = dbConnectionManager.dbConnection();
        sql =
          " TRUNCATE `gpstracking_coordinates`" ;
        connection.query(sql, function(err, result, fields) {
          if (err) {
            reject(new Error(err));
          }
          console.log(result.affectedRows + " record(s) updated");
          resolve({ message: result.affectedRows + " record(s) updated" });
        });
        connection.end();
      } catch (err) {
        console.log(err);
        reject(new Error(err));
      }
    });
  },

  resetTable: function(deviceId) {

    console.log("8..........resetTable-----" , deviceId)

    return new Promise(function(resolve, reject) {
      var data = "";
      var sql = "";
      var connection = "";
      try {

        console.log("9.............resetTable-----" , deviceId);
        
        connection = dbConnectionManager.dbConnection();

        sql = "TRUNCATE `gpstracking_coordinates`" ;
        console.log("sql-->", sql);
        connection.query(sql, function(err, result, fields) {
           if (err) {
                reject(new Error(err));
              } 
              resolve({
                message: "Number of records deleted: "
              });
        });
        // sql =
        //   "UPDATE `gpstracking_device_status` SET `points_done` = '0', `current_step` = '0', `current_latitude` = '', `current_longitude` = '', `latitude_center` = '', `longitude_center` = '', `zoom_level` = '0' WHERE `gpstracking_device_status`.`device_id` = '"+ deviceId +"';" ;
        //   console.log("sql-->", sql);
        //   connection.query(sql, function(err, result, fields) {
        //       if (err) {
        //         reject(new Error(err));
        //       }         
        //       resolve({
        //         message: "Number of records updated: "
        //       });
        //   })
        connection.end();
      } catch (err) {
        console.log(err);
        reject(new Error(err));
      }
    });
  },

};

<template>
  <div class="container">
    <div id="googleMap"></div>
    <div id="btn-sec">
      <!-- <button class="btn-green btn-big" @click="stopBtn()" :disabled="disableStop == 1">Stop</button> -->
    </div>
  </div>
</template>

<script>
import { testActions } from "../../actions/gpsTracking.action";

export default {
  name: "TestComp",
  components: {},
  data() {
    return {
      data: {},
      disableStart: 0,
      disableStop: 0,
      stepSize: 5000,
      map: "",
      markers: [],
      pointsDone: [],
      bounds: "",
      myInterval: "",
      startPoint: "",
      endPoint: "",
      progress: "",
      stopFlag: false,
      myPath: "",
      step: "",
      stepAdd: 30,
      stepTime: 30,
      mapOptions: {},
      mapPoints: [],
      mouseMove: { lat: "", lng: "" },
      zoomLevel: 0,
      center: { lat: "", lng: "" },
      intervalId: "",
      deviceId: "",
      intervalFlag: 0,
      getElementById: "",
      getDataFlag: 0,
      refreshInterval: 1000,
      serData: ""
    };
  },
  methods: {
    initializeMap: function(coordinates) {
      console.log("coordinates---", coordinates);
      this.mapOptions = {
        zoom: coordinates.zoomLevel,
        center: { lat: coordinates.centerLat, lng: coordinates.centerLng },
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      console.log(this.mapOptions);

      //Create map
      this.map = new google.maps.Map(
        document.getElementById("googleMap"),
        this.mapOptions
      );

      this.bounds = new google.maps.LatLngBounds();
      var carSymbol = {
        path:
          "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z",
        strokeColor: "#000",
        scale: 0.7,
        fillOpacity: 1,
        fillColor: "#999999",
        anchor: new google.maps.Point(10, 25),
        rotation: -320
      };

      //Iterate through all points in mapPoints
      this.mapPoints.forEach((value, key) => {
        var myLatLng = new google.maps.LatLng(value.latitude, value.longitude); //create marker
        this.marker = new google.maps.Marker({
          position: myLatLng,
          icon: carSymbol,
          map: this.map,
          visible: false
        });
        this.markers.push(this.marker);
        this.bounds.extend(myLatLng); //add to bounds and path
      });
  
    },

    //Following function gets called one polyline at a time
    pathAnimation: function(point) {
      this.markers[0].setVisible(true); //Make marker visible once path has reached that point
      //Set start & end point for this polyline
      console.log("this.pointsDone1111>>>", this.pointsDone);
      this.startPoint = this.pointsDone[point];
      console.log("startPoint1111>>>", this.startPoint);
      this.endPoint = new google.maps.LatLng(
        this.mapPoints[point + 1].latitude,
        this.mapPoints[point + 1].longitude
      );
      var lineSymbol = {
        path:
          "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z",
        strokeColor: "#000",
        scale: 0.7,
        fillOpacity: 1,
        fillColor: "#22d422",
        anchor: new google.maps.Point(10, 25)
      };

      //Create the polyline
      this.myPath = new google.maps.Polyline({
        path: this.pointsDone,
        geodesic: false,
        strokeColor: "#777",
        strokeOpacity: 1.0,
        strokeWeight: 4,
        map: this.map,
        icons: [
          {
            icon: lineSymbol,
            offset: "100%"
          }
        ]
      });
      this.pointsDone.push(this.endPoint); //Add this point to the array keeping points that have already been animated to
      this.animationLoop(0);
    },

    //Animation loop
    animationLoop: function(progressPoint) {
      console.log("startPoint>>>", this.startPoint);
      this.step = progressPoint;
      this.myInterval = setInterval(() => {
        this.step += this.stepAdd;
        if (this.step > this.stepSize) {
          clearInterval(this.myInterval); //Done drawing, clear the interval, and call pathAnimation() again, IF we're not done animating all the polylines
          this.myInterval = "";

          if (this.pointsDone.length - 1 < this.mapPoints.length - 1) {
            this.myPath.set("icons", []); //remove symbol
            this.pathAnimation(this.pointsDone.length - 1); //End remove symbol
          }
        } else {
          //Not done drawing yet...
          this.progress = google.maps.geometry.spherical.interpolate(
            this.startPoint,
            this.endPoint,
            this.step / this.stepSize
          );
          this.myPath.setPath([this.startPoint, this.progress]);
        }
      }, this.stepTime);
    },

    startBtn: function() {
      if (this.deviceId && !this.intervalid) {
        const self = this;
        self.getMapData();

        this.intervalid = setInterval(function() {
          self.getMapData();
        }, self.refreshInterval);
      } else {
        if (!this.deviceId) {
          alert("deviceId is missing at url");
        }
      }
      if (this.stopFlag) {
        this.animationLoop(this.step);
      }
    },

    
    //
    /**
     * Description : Get the map data by using axios
     */
    getMapData() {
      testActions
        .viewCoordinates()
        .then(this.successHandleGetMapData)
        .catch(this.errorHandleGetMapData);
    },

    /**
     * Description : Handle success
     * @param {object}  data
     */
    successHandleGetMapData(data) {
      for (var key in data) {
        this.mapPoints[key] = data[key];
      }
      testActions
        .viewDeviceStatus()
        .then(this.successHandleGetStatusData)
        .catch(this.errorHandleGetStatusData);
    },

    /**
     * Description : Handle error
     * @param {object}  error
     */
    errorHandleGetMapData(error) {},

     /**
     * Description : Handle success
     * @param {object}  data
     */
    successHandleGetStatusData(data) {     
      this.dynMapData(data);
    },

    /**
     * Description : Handle error
     * @param {object}  error
     */
    errorHandleGetStatusData(error) {},

    /**
     * Description : Set the map data dynamically
     * @param {object}  data
     */
    dynMapData(data) {
      let originalData = data[0];
      data = data[0].data;
      console.log("originalData--------------", originalData);

      if (this.getDataFlag == 1) {
        this.map.setZoom(originalData.zoom_level * 1); //Todo: we need to update the collection only.
        this.map.setCenter({
          lat: originalData.latitude_center * 1,
          lng: originalData.longitude_center * 1
        });
        return 0;
      }

     

      this.serData = {
        centerLat: originalData.latitude_center * 1,
        centerLng: originalData.longitude_center * 1,
        zoomLevel: originalData.zoom_level * 1,
        currentLatitude: originalData.current_latitude * 1,
        currentLongitude: originalData.current_longitude * 1,
        pointsDone: originalData.points_done * 1,
        currentStep: originalData.current_step * 1
      };
      console.log(data);
      console.log(this.serData);

      console.log("this.mapPoints.length>>>>>>>>>>",this.mapPoints.length)
      if (originalData.points_done >= 2) {
          this.initializeMap(this.serData);
          this.disableStart = 1;
          this.disableStop = 0;
          console.log("start>>>>>>>>>>>>>>>")
          this.setStartingMap(this.serData);
          this.getDataFlag = 1;
      }
    },

    /**
     * Description : start map from controller point
     */
    setStartingMap(coordinates) {
      setTimeout(() => {
          console.log("start111111111111111111111>>>>>>>>>>>>>>>")
          console.log(
            "coordinatescoordinatescoordinatescoordinatescoordinates",
            coordinates
          );

          //enter points before mid path
          for (var key in this.mapPoints) {
            if (key == 0) this.markers[0].setVisible(true);
            if (key < coordinates.pointsDone - 1) {
              console.log("key", key);
              this.pointsDone.push(
                new google.maps.LatLng(
                  this.mapPoints[key].latitude,
                  this.mapPoints[key].longitude
                )
              );
            }
          }
          let clonePoint = [...this.pointsDone]; //enter mid path
          clonePoint.push(
            new google.maps.LatLng(
              coordinates.currentLatitude,
              coordinates.currentLongitude
            )
          );

          //Create the polyline
          var lineSymbol = {
            path:
              "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z",
            strokeColor: "#000",
            scale: 0.7,
            fillOpacity: 1,
            fillColor: "#22d422",
            anchor: new google.maps.Point(10, 25)
          };

          this.myPath = new google.maps.Polyline({
            path: clonePoint,
            geodesic: false,
            strokeColor: "#777",
            strokeOpacity: 1.0,
            strokeWeight: 4,
            map: this.map
          });

          this.myPath = new google.maps.Polyline({
            path: clonePoint,
            geodesic: false,
            strokeColor: "#777",
            strokeOpacity: 1.0,
            strokeWeight: 4,
            map: this.map,
            icons: [
              {
                icon: lineSymbol,
                offset: "100%"
              }
            ]
          });
          this.startPoint = new google.maps.LatLng(
            this.mapPoints[coordinates.pointsDone - 2].latitude,
            this.mapPoints[coordinates.pointsDone - 2].longitude
          );
          this.endPoint = new google.maps.LatLng(
            this.mapPoints[coordinates.pointsDone - 1].latitude,
            this.mapPoints[coordinates.pointsDone - 1].longitude
          );

          this.pointsDone.push(this.endPoint);
          //this.animationLoop(coordinates.currentStep);
          this.animationLoop(coordinates.currentStep);
        },2000)
    },

  },

  mounted() {
    this.deviceId = window.deviceId;
    this.getElementById = document.getElementById("googleMap");
    this.startBtn();
  }
};
</script>
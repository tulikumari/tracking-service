const express = require("express");
const app = express();

let index = 0;
let latitude = 0;
let longitude = 0;

app.get("/geoservice/Out/getGPSBypeeridAndTimestampServlet", (request, response) => {

  var start = request.query.start;
  if(start === "1") index = 0;
  let data = [{
    "id": 1,
    "latitude": -33.9244,
    "longitude": 18.4230
  },
  {
    "id": 2,
    "latitude": -33.9234,
    "longitude": 18.4240
  },
  {
    "id": 3,
    "latitude": -33.9239,
    "longitude": 18.4247
  },
  {
    "id": 4,
    "latitude": -33.9236,
    "longitude": 18.4250
  },
  {
    "id": 5,
    "latitude": -33.9243,
    "longitude": 18.4259
  },
  {
    "id": 6,
    "latitude": -33.9246,
    "longitude": 18.4257
  },
  {
    "id": 7,
    "latitude": -33.9248,
    "longitude": 18.4259
  },
  {
    "id": 8,
    "latitude": -33.9244,
    "longitude": 18.4262
  }
  ];


  if (index < data.length) {
    latitude = data[index].latitude
    longitude = data[index].longitude
    index++;
    response.send(JSON.parse('[{"peerID":"9B9E3BEDB0426E75","isTransfer":"1","latitude":' + latitude + ',"accuracy":0,"longitude":' + longitude + ',"timestamp":1542797956000}]'));
  }
  else {
    // response.send(JSON.parse('[]'));
    // if(start==1)
    // {
    //   index=0;
    // }
    latitude = data[0].latitude
    longitude = data[0].longitude
    index = 0;
    response.send(JSON.parse('[{"peerID":"9B9E3BEDB0426E75","isTransfer":"0","latitude":' + latitude + ',"accuracy":0,"longitude":' + longitude + ',"timestamp":1542797956000}]'));
  }


});


// Listen to default port, or 8080
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

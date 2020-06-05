const request = require('request-promise-native');

const fetchMyIP = function() {
  const ip = { 
    url: "https://api.ipify.org/?format=json",
    resolveWithFullResponse:  true
  }
  return request(ip);
}

const fetchCoordsByIP = function(coor) {
  const ip = JSON.parse(coor.body).ip;
  return request("https://ipvigilante.com/" + ip)

};

const fetchISSFlyOverTimes = function(body) {

  let coord = {}
  const jsonString = JSON.parse(body);

  coord.latitude = jsonString.data.latitude;
  coord.longitude = jsonString.data.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coord.latitude}&lon=${coord.longitude}`)
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .catch((error) => {
    console.log('Error:', error.statusCode)
  })
}

module.exports = { nextISSTimesForMyLocation };
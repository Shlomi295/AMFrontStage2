
require("dotenv/config"); //load the config file env, can be used by calling process.env.{variableName}
const req = require("request");
const express = require("express");
const router = express.Router();


//get request - forwarding API to check if there's an image match for a fish in the database and returns details
router.get('/', function (request, response) {
    let inBody = request.query.body;
    let pLat = null;
    let pLong = null;
    // let theSocket = userSocket;
    //link for local testing (http://localhost:8081/) ------
   // reqObject = "http://localhost:8081/checkFishMatch?body=" + JSON.stringify(inBody);
    //----------
    //access via cloud (PAAS)
    reqObject = "https://anglermatehub.us-south.cf.appdomain.cloud/checkFishMatch?body=" + JSON.stringify(inBody);
    req(reqObject, (err, result) => {
  
      //if true match being returned in response, initiate alert via webserver
      try {
        let matchData = JSON.parse(result.body);
        let theSocket = request.query.socket;
        pLat = request.query.place.lat;
        pLong = request.query.place.long;
  
        console.log(request.query);
  
        if (matchData.fishMatch) {
          const match = {
            fish: matchData.fish,
            lat: pLat,
            long: pLong,
            socket: theSocket
          }
          io.emit('matchFound', match);
          console.log('match is found');
        } else {
          console.log('match is not found');
        }
        console.log(matchData.fishMatch);
      } catch (e) {
        console.log(e);
      }
  
      if (err) { return console.log(err); }
      console.log(result.body)
      response.send(result.body);
    });
  });

  module.exports = router;
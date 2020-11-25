const firebase = require("firebase");
// const fn = require("./buffer")
const user = "lenovo-x230";
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


var firebaseConfig = {
    apiKey: "AIzaSyCpgK3RYLaWs6TGt7JbV3RnC7RTX3a78eY",
    authDomain: "esp8266-bnb.firebaseapp.com",
    databaseURL: "https://esp8266-bnb.firebaseio.com",
    projectId: "esp8266-bnb",
    storageBucket: "esp8266-bnb.appspot.com",
    messagingSenderId: "668844078690",
    appId: "1:668844078690:web:04b1447997b1f3059a833b",
    measurementId: "G-GCB40LQD55"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// IF conectado genero un documento users/nro/conectado
var myConnectionsRef = firebase.database().ref(`${user}`);
var connectedRef = firebase.database().ref('.info/connected');
connectedRef.on('value', function (snap) {
    if (snap.val() === true) {
        var con = myConnectionsRef.push();
        con.onDisconnect().remove();
        con.set(true);
    }
});
// DELETE DATABASE
// if (true) { firebase.database().ref().remove(); }

const formatDateNow = () => {
    const dateObject = new Date(Date.now());
    const year = dateObject.getFullYear();
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const timeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return timeString;
};

const ref = firebase.database().ref();
let payload = {};
let timeString = '';

setInterval(() => {
    // INTERVAL ARRANCA INTERVAL //
    timeString = formatDateNow()
    //TEMPERATURA
    let reqTemp = new XMLHttpRequest();
    reqTemp.open('GET', 'http://192.168.1.25/temperature', true);
    reqTemp.onreadystatechange = aEvt => {
        payload={};
        if (reqTemp.readyState == 4) {
            if (reqTemp.status == 200) {
                console.log(reqTemp.responseText + " temperatura");
                payload[`Temperatura/${timeString}`] = reqTemp.responseText;
                console.log(payload);
                ref.update(payload);
            }
            else
                dump("Error loading page\n");
        }
    };
    reqTemp.send(null);
    // HUMEDAD
    let reqHum = new XMLHttpRequest();
    reqHum.open('GET', 'http://192.168.1.25/humidity', true);
    reqHum.onreadystatechange = aEvt => {
        payload={};
        if (reqHum.readyState == 4) {
            if (reqHum.status == 200) {
                console.log(reqHum.responseText + " humedad");
                payload[`Humedad/${timeString}`] = reqHum.responseText;
                console.log(payload);
                ref.update(payload);
            }
            else
                dump("Error loading page\n");
        }
    };
    reqHum.send(null);


}, 600000);


/*



// INTERVALO DE ESCRITURA EN FIREBASE
setInterval(() => {
    let connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", (snap) => {
        uploadFeatures = fn.readValues();
            if (uploadFeatures.length > 0) {
              payload = {};
                    uploadFeatures.forEach((e) => {
                      const timeString = fn.formatDateNow();
                      let title = e.tagName.replace(/\./g,"-");
                      message = {
                        "tagName": e.tagName,
                        "tagValue": e.tagValue,
                        "Quality": e.Quality,
                        "server_timestamp": {
                          ".sv": "timestamp",
                        },
                        "system_timestamp": e.timeStamp,
                        "hasChanged": e.hasChanged,
                        User: fn.userNum
                      };
                      payload[`Logs/${title}/${timeString}`] = message;
                    });
              console.log(payload);
              ref.update(payload);
              console.log("Uploaded..");
              // VER ACA QUE ESTOY SUBIENDO CUALQUIER COSA
              fn.deleteValues();
            }

    });
  }, uploadTime);


  on("/temperature"
  ("/humidity",
  ("/pressure"
  xhttp.send();


  xhttp.open("GET", "/temperature", true);

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    Serial.println("INDEX REQUESTED");
    request->send(SPIFFS, "/index.html");
  });
    server.on("/temperature", HTTP_GET, [](AsyncWebServerRequest *request){
    Serial.println("TEMP REQUESTED");
    request->send_P(200, "text/plain", readBME280Temperature().c_str());
  });
  server.on("/humidity", HTTP_GET, [](AsyncWebServerRequest *request){
    Serial.println("HUM REQUESTED");
    request->send_P(200, "text/plain", readBME280Humidity().c_str());
  });
   server.on("/pressure", HTTP_GET, [](AsyncWebServerRequest *request){
    Serial.println("DAX REQUESTED");
    request->send_P(200, "text/plain", readBME280Pressure().c_str());
  });


    let connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", (snap) => {
        uploadFeatures = fn.readValues();
        if (uploadFeatures.length > 0) {
            payload = {};
            uploadFeatures.forEach((e) => {
                const timeString = fn.formatDateNow();
                let title = e.tagName.replace(/\./g, "-");
                message = {
                    "tagName": e.tagName,
                    "tagValue": e.tagValue,
                    "Quality": e.Quality,
                    "server_timestamp": {
                        ".sv": "timestamp",
                    },
                    "system_timestamp": e.timeStamp,
                    "hasChanged": e.hasChanged,
                    User: fn.userNum
                };
                payload[`Logs/${title}/${timeString}`] = message;
            });
            console.log(payload);
            ref.update(payload);
            console.log("Uploaded..");
            // VER ACA QUE ESTOY SUBIENDO CUALQUIER COSA
            fn.deleteValues();
        }

    });


  */
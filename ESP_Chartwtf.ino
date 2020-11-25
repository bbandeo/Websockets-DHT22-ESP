#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <Hash.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FS.h>
#include <Wire.h>
#include <DHT.h>
#include <Adafruit_Sensor.h>

#define DHTPIN 5  
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE); //I2C

const char* ssid = "WiFi-fibertel-bandeo-2.4G";
const char* password = "corrientes789";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

String readBME280Temperature() {
  float t = dht.readTemperature();
  if (isnan(t)) {    
    Serial.println("Falló la lectura de Temperatura °C del DHT22 sensor!");
    return "";
  }
  else {
    Serial.println(t);
    return String(t,2);
  }
}
String readBME280Humidity() {
  float h = dht.readHumidity();
  if (isnan(h)) {
    Serial.println("Falló la lectura de Humedad del DHT22 sensor!");
    return "";
  }
  else {
    Serial.println(h);
     return String(h,2);
  }
}

String readBME280Pressure() {
  float p = dht.readTemperature(true);
  if (isnan(p)) {
    Serial.println("Falló la lectura de Temperatura Farenheit del DHT22 sensor!");
    return "";
  }
  else {
    Serial.println(p);
    return String(p,2);
  }
}

void setup(){
  //Serial.begin(115200);
  Serial.begin(9600);
  dht.begin();
  
  if(!SPIFFS.begin()){
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi..");
  }
  Serial.println(WiFi.localIP());

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

  server.begin();
  // FINISH SETUP
}
 
void loop(){
  /*
// float humedad = dht.readHumidity();
//  float temperatura = dht.readTemperature();
//  float farenheit = dht.readTemperature(true);

  // if(isnan(humedad) || isnan(temperatura) || isnan(farenheit)){
  //   Serial.println("Failed to read from DHT22 sensor");
    
  //   delay(2500);
  //   return;
  //   }

Serial.print("Humedad: ");
Serial.print(humedad);
Serial.print(" % ");
Serial.print("  ||  Temperatura: ");
Serial.print(temperatura);
Serial.print(" °C ");
Serial.print(" - ");
Serial.print(farenheit);
Serial.print(" °F ");
Serial.println(WiFi.localIP());
delay(2500);*/
}

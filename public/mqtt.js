    var client;
	var pm10 = "";
	var pm25 = "";
	var pm100 = "";
	var oa_temp = "";
	function connect(){
		  client = new Paho.MQTT.Client("10.1.1.15", 1884, '', "mqtt_panel" + parseInt(Math.random() * 100, 10));
		  client.onConnectionLost = onConnectionLost;
		  client.onMessageArrived = onMessageArrived;
		  client.connect({
            onSuccess: onConnect, 
            userName : "agent",
            password : "passwd"
            });
		  console.log("Connected");
	}
	function onConnect() {
		  client.subscribe("aqi/sensor/particulate_matter_100m_concentration/state");
		  client.subscribe("aqi/sensor/particulate_matter_25m_concentration/state");
		  client.subscribe("aqi/sensor/particulate_matter_10m_concentration/state");
		  client.subscribe("outdoor_air/sensor/outdoor_temperature/state");
	}
	function onConnectionLost(responseObject) {
		  if (responseObject.errorCode !== 0) {
		   console.log("onConnectionLost:"+responseObject.errorMessage);
		  }
	}
	function onMessageArrived(message) {
		  console.log("onMessageArrived: "+ message.payloadString + " - " + message.destinationName);
		  if(message.destinationName == "aqi/sensor/particulate_matter_10m_concentration/state"){ pm10 = message.payloadString; }
		  if(message.destinationName == "aqi/sensor/particulate_matter_100m_concentration/state"){ pm100 = message.payloadString; }
		  if(message.destinationName == "aqi/sensor/particulate_matter_25m_concentration/state"){ pm25 = message.payloadString; }
		  if(message.destinationName == "outdoor_air/sensor/outdoor_temperature/state"){ oa_temp = message.payloadString; }
		  let pm10_ = parseInt(pm10);
		  let pm25_ = parseInt(pm25);
		  let pm100_ = parseInt(pm100)
		  document.getElementById("pm10-tag").innerHTML = pm10_;
		  document.getElementById("pm100-tag").innerHTML = pm100_;
		  document.getElementById("pm25-tag").innerHTML = pm25_;
		  document.getElementById("oua-temp-tag").innerHTML = oa_temp;

		  if(pm100_ <= 25){document.querySelector("#pm100-card").classList.replace("bg-light", "bg-success")}
		  else if(pm100_ >= 26 && pm100_ <= 100){document.querySelector("#pm100-card").classList.replace("bg-light", "bg-warning")}
		  else if(pm100_ >= 101){document.querySelector("#pm100-card").classList.replace("bg-light", "bg-danger")};

		  if(pm10_ <= 50){document.querySelector("#pm10-card").classList.replace("bg-light", "bg-success")}
		  else if(pm10_ >= 51 && pm10_ <= 200){document.querySelector("#pm10-card").classList.replace("bg-light", "bg-warning")}
		  else if(pm10_ >= 201){document.querySelector("#pm10-card").classList.replace("bg-light", "bg-danger")};

		  if(pm25_ <= 25){document.querySelector("#pm25-card").classList.replace("bg-light", "bg-success")}
		  else if(pm25_ >= 26 && pm25_ <= 100){document.querySelector("#pm25-card").classList.replace("bg-light", "bg-warning")}
		  else if(pm25_ >= 101){document.querySelector("#pm25-card").classList.replace("bg-light", "bg-danger")};
	}
	connect();

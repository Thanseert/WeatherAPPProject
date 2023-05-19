const express = require("express");
const { write } = require("fs");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));



app.get("/" , function(req , res){
    res.sendFile(__dirname + "/index.html");
app.post("/" , function(req ,  res){
    const query = req.body.cityname;
    const appkey = "df10817a374340173163ef2c44c3a065"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metrics&appid=" + appkey;
    https.get(url , function(response){
        console.log(response.statusCode);
        response.on("data" , function(data){
            const weather = JSON.parse(data)
            const temp = weather.main.temp
            const desc = weather.weather[0].description
            const icon = weather.weather[0].icon
            const imageUrl = ("http://openweathermap.org/img/wn/ " + icon + "@2x.png")
            res.write("<p>The weather description is " + desc + "</p>");
            res.write("<h1>The temparature in " + query +" is " + temp + " degree celcuis</h1>")
            res.write("<img src='" + imageUrl + "'>");
            res.send();
        })
    });
})

});

app.listen(3000 , function() {
    console.log("server running on port 3000");
})


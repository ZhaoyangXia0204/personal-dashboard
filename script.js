//MAP


// WEATHER
$(".citySearch").on("click", function(){
    var newCity = $("#currentCity").val();
    console.log(newCity);
    generateCurrent(newCity);
    generateForecast(newCity);

});

// generateCurrent();
// generateForecast();
function generateCurrent(userSearch) {
    // var userSearch = "newark"; //remove variable afterwords
    $(".fiveDay").empty();
    var latCoord = "";
    var lonCoord = "";
    var apiKey = "f1347b661a93475fb7c664d08aaa163f";
    var queryURL =
        "https://api.weatherbit.io/v2.0/current?city=" + userSearch + "&units=I&key=" +
        apiKey;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (current) {
        console.log(current);
        var currentObject = current.data[0];
        // $(".today").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
        $(".dateTime").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a")) //currentObject.city_name + ", " + currentObject.state_code +" Temperature: " + currentObject.temp + "° F"
        $(".cityTemp").text(currentObject.city_name + ", " + currentObject.state_code +" Temperature: " + currentObject.temp + "° F");
        // $(".currentCity").text(
        //     currentObject.city_name + ", " + currentObject.state_code
        // );
        // $(".currentTemp").text("Temperature: " + currentObject.temp + "° F");
        var latCoord = currentObject.lat;
        console.log("lat is: " + latCoord);
        var lonCoord = currentObject.lon;
        console.log("lon is: " + lonCoord);
        // generateMap(latCoord,lonCoord);
        var map = L.map('map', {
            layers: MQ.mapLayer(),
            center: [latCoord, lonCoord],
            zoom: 12
        });
     
    
        MQ.trafficLayer().addTo(map);
    
      
        
    });
}
function generateForecast(userSearch) {
    // var userSearch = "edison,nj"; //remove variable afterwords
    var apiKey = "f1347b661a93475fb7c664d08aaa163f";
    var queryURL =
        "http://api.weatherbit.io/v2.0/forecast/daily?city=" +
        userSearch +
        "&units=I&days=16&key=" +
        apiKey;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (forecast) {
        console.log(forecast);
        for (let i = 0; i < 5; i++) {
            var forecastObject = forecast.data[i];
            // var title = $("<h1>").addClass("card-title").text("Five Day Weather Forecast: ");
            // var biggerCard = $("<div id='container'>").addClass("card blue-grey darken-1");
            var forecastCard = $("<div>");
            var forecastDayOf = $("<p>");
            // var forecastDate = $("<p>");
            var forecastIcon = $("<img>");
            var forecastHigh = $("<p>");
            var forecastLow = $("<p>");
            var forecastDesc = $("<p>");
            // var dayOfWeek = (moment().day());
            // var dayNum = dayOfWeek + i;
            // console.log (dayNum);
            var forecastCode = forecastObject.weather.icon;
            var forecastIconCode =
                "https://www.weatherbit.io/static/img/icons/" +
                forecastCode +
                ".png"; //https://www.weatherbit.io/static/img/icons/{icon_code}.png
            forecastCard.addClass("col card");
            forecastIcon.attr("src", forecastIconCode);
            forecastDayOf.text(moment()
                .add((moment().day()) + i - 2, "d")
                .format("MMMM Do"));; //returns sunday as 0, monday as 1...need to run this value through an if statement and change the text accordingly
            forecastHigh.text("High: " + forecastObject.high_temp + "° F");
            forecastLow.text("Low: " + forecastObject.low_temp + "° F");
            forecastDesc.text(forecastObject.weather.description);
            forecastCard.append(
                forecastDayOf,
                forecastIcon,
                forecastHigh,
                forecastLow,
                forecastDesc
            );
            $(".fiveDay").append(forecastCard);
            // $("#container").append(
            //     title,
            //     forecastCard)
            // $(".fiveDay").append(biggerCard);
        }
    });
}
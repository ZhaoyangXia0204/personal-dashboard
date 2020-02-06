//MAP
window.onload = function () {

    var map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [40.731701, -73.993411],
        zoom: 12
    });

    MQ.trafficLayer().addTo(map);

};

// WEATHER
//Link to subreddits maybe in a dropdown? Add maybe 10-15 subreddits in dropdown? and limit it to top 5?
generateCurrent();
generateForecast();
function generateCurrent() {
    // var userSearch = "newark"; //remove variable afterwords
    var apiKey = "f1347b661a93475fb7c664d08aaa163f";
    var queryURL =
        "https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&units=I&key=" +
        apiKey;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (current) {
        console.log(current);
        var currentObject = current.data[0];
        $(".today").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
        $(".currentCity").text(
            currentObject.city_name + ", " + currentObject.state_code
        );
        $(".currentTemp").text("Temperature: " + currentObject.temp + "° F");
        $(".currentWind").text(
            "Wind Speed: " +
            currentObject.wind_spd +
            " MPH " +
            currentObject.wind_cdir
        );
        $(".currentHumidity").text("Humidity: " + currentObject.rh + "%");
    });
}
function generateForecast() {
    var userSearch = "edison,nj"; //remove variable afterwords
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
                .add((moment().day()) + i - 1, "d")
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
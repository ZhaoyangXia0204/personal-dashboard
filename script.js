//Get local storage
var lsName = JSON.parse(localStorage.getItem("info"));
console.log(lsName);
var localName = lsName[0].firstName;
var localLastName = lsName[0].lastName;
var localLocation = lsName[0].location;
console.log("Your name is: " + localName + " " + localLastName + " " + "Your home is: " + localLocation);
generateCurrent(localLocation);
generateForecast(localLocation);
var currentTime = moment().hour();
console.log(currentTime);
if (currentTime >= 0 && currentTime < 12) {
  $(".brand-logo").text("Good Morning, " + localName + " " + localLastName)
} else if (currentTime >= 12 && currentTime < 18) {
  $(".brand-logo").text("Good Afternoon, " + localName + " " + localLastName)
} else if (currentTime >= 18 && currentTime < 24) {
  $(".brand-logo").text("Good Evening, " + localName + " " + localLastName)
}

// WEATHER
$(".citySearch").on("click", function () {
  var newCity = $("#currentCity").val();
  console.log(newCity);
  generateCurrent(newCity);
  generateForecast(newCity);

});

// This function gets the current weather
function generateCurrent(userSearch) {
  $(".fiveDay").empty();
  var apiKey = "f10eb9f8eb6541a19b79c3e4015efc78";
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
    $(".dateTime").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a")) 
    $(".cityTemp").text(currentObject.city_name + ", " + currentObject.state_code + " Temperature: " + currentObject.temp + "° F" + " " + currentObject.weather.description);
    var latCoord = currentObject.lat;
    console.log("lat is: " + latCoord);
    var lonCoord = currentObject.lon;
    console.log("lon is: " + lonCoord);
    var map = L.map('map', {
      layers: MQ.mapLayer(),
      center: [latCoord, lonCoord],
      zoom: 12
    });
    MQ.trafficLayer().addTo(map);
  });
}

// This function generates the forecast
function generateForecast(userSearch) {
  var apiKey = "f10eb9f8eb6541a19b79c3e4015efc78";
  var queryURL =
    "https://api.weatherbit.io/v2.0/forecast/daily?city=" +
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
      var forecastCard = $("<div>");
      var forecastDayOf = $("<p>");
      var forecastIcon = $("<img>");
      var forecastHigh = $("<p>");
      var forecastLow = $("<p>");
      var forecastDesc = $("<p>");
      var forecastCode = forecastObject.weather.icon;
      var forecastIconCode =
        "https://www.weatherbit.io/static/img/icons/" +
        forecastCode +
        ".png";
      forecastCard.addClass("col card blue-grey darken-1 white-text");
      forecastIcon.attr("src", forecastIconCode);
      forecastDayOf.text(moment()
        .add(1 + i, "d")
        .format("MMMM Do"));;
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
    }
  });
}

// Stocks Ticker 
var intervalTime = 60;
document.addEventListener('DOMContentLoaded', () => {
  // https://financialmodelingprep.com/developer/docs
  var stockList = ["AAPL", "GOOGL", "NFLX", "TWTR", "INTC", "MSFT", "AMZN", "CRON", "TSLA"];
  for (let i = 0; i < stockList.length; i++) {
    var stockIndex = stockList[i]
    getRequest(
      'https://financialmodelingprep.com/api/v3/stock/real-time-price/' + stockIndex + '?datatype=json',
      drawOutput
    );
    function drawOutput(responseText) {
      let resp = JSON.parse(responseText);
      var newTicket = $("<div>");
      newTicket.addClass("ticker-item");
      newTicket.html(resp.symbol + `<span style="color: white">` + " $ " + resp.price + `</span>`);
      $(".ticker-move").append(newTicket);
    }
  }

  function getRequest(url, success) {
    var req = false;
    try {
      req = new XMLHttpRequest();
    } catch (e) {
      try {
        req = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          req = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          return false;
        }
      }
    }
    if (!req) return false;
    if (typeof success != 'function') success = function () { };
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status === 200) {
          success(req.responseText)
        }
      }
    }
    req.open("GET", url, true);
    req.send(null);
    return req;
  }
})

// News Sections
$(".newsSearch").on("click", function () {
  $(".newsCard").empty();
  var searchTerm = $("#userNewsSearch").val();
  console.log(searchTerm);
  var apiKey = "3be1193829c74cafbb17c2c9c41adec0";
  var queryURL = "https://newsapi.org/v2/everything?q=" + searchTerm + "&apiKey=" + apiKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (news) {
    console.log(news)
    for (let i = 0; i < 10; i++) {
      var newsTitle = news.articles[i].title;
      var newsLink = news.articles[i].url;
      console.log(newsTitle);
      console.log(newsLink);
      var newsListItems = $("<li>");
      var newsItems = $("<a>");
      newsItems.text(newsTitle);
      newsItems.attr("href", newsLink);
      newsItems.addClass("white-text");
      newsListItems.append(newsItems);
      $(".newsCard").append(newsListItems);
    }
  })
})

generateNews();
function generateNews() {
  var apiKey = "3be1193829c74cafbb17c2c9c41adec0";
  var queryURL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + apiKey;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (news) {
    console.log(news)
    for (let i = 0; i < 10; i++) {
      var newsTitle = news.articles[i].title;
      var newsLink = news.articles[i].url;
      console.log(newsTitle);
      console.log(newsLink);
      var newsListItems = $("<li>");
      var newsItems = $("<a>");
      newsItems.text(newsTitle);
      newsItems.attr("href", newsLink);
      newsItems.addClass("white-text");
      newsListItems.append(newsItems);
      $(".newsCard").append(newsListItems);
    }
  })

};

// To-do List Dynamic
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var spanClose = document.getElementsByClassName("close")[0];
var spanDone = document.getElementsByClassName("done")[0];

btn.onclick = function () {
  $("#title").val("");
  $("#details").val("");
  modal.style.display = "block";
}

spanClose.onclick = function () {
  modal.style.display = "none";
}

spanDone.onclick = function () {
  modal.style.display = "none";
  var eventTitle = $("#title").val();
  var eventList = $("<li>");
  eventList.text(eventTitle);
  $("#events").append(eventList);
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

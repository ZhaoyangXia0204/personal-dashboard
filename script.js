// generateCurrent();
// // generateForecast();



// function generateCurrent () {
//     // var userSearch = "newark"; //remove variable afterwords
//     var apiKey = "f1347b661a93475fb7c664d08aaa163f";
//     var queryURL = "https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=" + apiKey;
//     console.log (queryURL); 
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(current){
//         console.log(current);
//         var currentObject = current.data[0];
//     })
// }

// function generateForecast () {
//     var userSearch = "newark"; //remove variable afterwords
//     var apiKey = "f1347b661a93475fb7c664d08aaa163f";
//     var queryURL = "http://api.weatherbit.io/v2.0/forecast/daily?city=" + userSearch + "&units=I&days=16&key=" + apiKey;
//     console.log (queryURL);
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(forecast){
//         console.log(forecast);
//     })
// }
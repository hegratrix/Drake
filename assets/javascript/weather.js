var config = {
  apiKey: "AIzaSyCzzV_Q0Xb1DSeNP4SFcWD-Z2HoJmxZ2NU",
  authDomain: "group-project-1-f0fcb.firebaseapp.com",
  databaseURL: "https://group-project-1-f0fcb.firebaseio.com",
  projectId: "group-project-1-f0fcb",
  storageBucket: "group-project-1-f0fcb.appspot.com",
  messagingSenderId: "119110396333"
}
  firebase.initializeApp(config);

  let db = firebase.database()
  let userRef = db.ref()

//API call on button click to retrieve temp at both city inputs
$("#compare-btn").on("click", function (event) {
  event.preventDefault();
  $("#current-temp").empty();

  let city1 = $(".city1-input").val();
  let city2 = $(".city2-input").val();
  let url1 =
    "https://api.apixu.com/v1/current.json?key=b44ed5063f3342b280513045181409&q=" +
    city1;
  let url2 =
    "https://api.apixu.com/v1/current.json?key=b44ed5063f3342b280513045181409&q=" +
    city2;

  $.get(url1)
    .then(function (r) {
      let results = r.current;
      city1Temp = results.temp_f;
      city1Hum = results.humidity;
      city1Wind = results.wind_mph;
    })
    .then(city1 => {
      $.get(url2)
        .then(function (r) {
          let results = r.current;
          city2Temp = results.temp_f;
          let city2Hum = results.humidity;
          let city2Wind = results.wind_mph;
          let city2Condition = results.condition.text;
          let city2Icon = results.condition.icon;
          let tempDifference = Math.round(city1Temp - city2Temp);
          let humDifference = Math.round(city1Hum - city2Hum);
          let windDifference = Math.round(city1Wind - city2Wind);

          $("#current-temp").append(tempDifference + "\xB0 F");
          $("#current-temp").append(humDifference + "%");
          $("#current-temp").append(windDifference + " mph");
          $("#current-temp").append(city2Condition);
          $("#current-temp").append("https:" + city2Icon);

          console.log()
        })
        .catch(function (e) { });
    })
    .catch(function (e) { });
});





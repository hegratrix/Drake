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
  
  newCity2 = decodeURIComponent(window.location.search)

// get info and push to firebase change to result page
$("#compare-btn").on("click", function (event) {
 event.preventDefault();
 $("#current-temp").empty();
 let city1 = $(".city1-input").val();
 let city2 = $(".city2-input").val();
 let fromDate = $(".leaving").val();
 let toDate = $(".returning").val();
 userRef.push ({
        city1,
        city2,
        fromDate,
        toDate
 })
 let newCity2 = "?para1=" + city2;
 console.log(newCity2)
 location.replace ('./results.html' + newCity2)
//  location.replace('./locations.html')
})


// // using firebase, show results

userRef.on("child_added", function(snapshot) {
  let city1 = snapshot.val().city1;
  let city2 = snapshot.val().city2;
  let fromDate = snapshot.val().fromDate;
  let toDate = snapshot.val().toDate;
  let from = moment(fromDate, "YYYY-MM-DD");
  let to = moment(toDate, "YYYY-MM-DD");
  let duration = to.diff(from, "days");

  let url1 =
         "https://api.apixu.com/v1/forecast.json?key=b44ed5063f3342b280513045181409&q=" +
         city1 +
         "&days=10"
  
  let url2 =
         "https://api.apixu.com/v1/forecast.json?key=b44ed5063f3342b280513045181409&q=" +
         city2 +
         "&days=10"
  
  Promise.all([$.get(url1), $.get(url2)])
  .then(function (results) {
        //  console.log(results);
  
         const city1Forecasts = results[0].forecast.forecastday.filter(
           day => day.date >= fromDate
         );

         const city2Forecasts = results[1].forecast.forecastday.filter(
           day => day.date >= fromDate
         );
         let tempDiffMessage = ''
         let windDiffMessage = ''
         let humidityDiffMessage = ''

         for (let i = 0; i < duration; i++) {
                let date = city1Forecasts[i].date;
                let day = moment(date).format('dddd')
                // console.log(day)
                const city1DayMax = city1Forecasts[i].day.maxtemp_f;
                const city2DayMax = city2Forecasts[i].day.maxtemp_f;
                const maxDiff = Math.round(city1DayMax - city2DayMax);
                // console.log(`Day ${i + 1}: ${Math.round(maxDiff)}`);
                       if (maxDiff < 0) {
                              tempDiffMessage = maxDiff*-1 + ' degrees warmer'
                       } else {
                              tempDiffMessage = maxDiff + ' degrees cooler'
                       }
                const city1DayHum = city1Forecasts[i].day.avghumidity;
                const city2DayHum = city2Forecasts[i].day.avghumidity;
                // console.log(city1DayHum)
                // console.log(city2DayHum)
                const humDiff = Math.round(city1DayHum - city2DayHum);
                // console.log(`Day ${i + 1}: ${Math.round(humDiff)}`);
                       if (humDiff < 0) {
                              humidityDiffMessage = humDiff*-1 + '% more humidity'
                       } else {
                              humidityDiffMessage = humDiff + '% less humidity'
                       }
                const city1DayWind = city1Forecasts[i].day.maxwind_mph;
                const city2DayWind = city2Forecasts[i].day.maxwind_mph;
                const winDiff = Math.round(city1DayWind - city2DayWind);
                // console.log(`Day ${i + 1}: ${Math.round(winDiff)}`);
                       if (winDiff < 0) {
                              let windDiffMessage = winDiff*-1 + 'mph more wind'
                       } else {
                              let windDiffMessage = winDiff + 'mph less wind'
                       }
                const city2Condition = city2Forecasts[i].day.condition.text;
                const city2Icon = city2Forecasts[i].day.condition.icon;
                // console.log(`Day ${i + 1}: ${city2Condition}`)
                // console.log(`Day ${i + 1}: https:${city2Icon}`)
       
               $("#card-holder").append(`
                       <div class="card mb-3" style="width: 18rem;">
                       <img class="card-img-top" src="https:${city2Icon}" alt="Card image cap">
                       <h2 id="card-city">${city2}</h2>
                       <div class="card-body">
                              <p class="card-text font-weight-bold text-center">${day}: ${city2Condition}</p>
                              <p class="card-text text-center">${tempDiffMessage}</p>
                              <p class="card-text text-center">${humidityDiffMessage}</p>
                              <p class="card-text text-center">${windDiffMessage}</p>
                       </div>
                       </div>
               `);
         }
  })
  .catch(function (err) {
        //  console.log(err);
  });
})  

document.getElementById("new-comparison").onclick = function () {
location.href = "./index.html";
};

document.getElementById("to-do").onclick = function () {
location.href = "./locations.html"+ newCity2;
};
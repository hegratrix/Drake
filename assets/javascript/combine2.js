var config = {
        apiKey: "AIzaSyBXMP6_M6jiWJQa8MWuKRPTCrQMHrJZqVE",
        authDomain: "drake-group.firebaseapp.com",
        databaseURL: "https://drake-group.firebaseio.com",
        projectId: "drake-group",
        storageBucket: "drake-group.appspot.com",
        messagingSenderId: "701715902088"
}
       firebase.initializeApp(config)
       const db = firebase.firestore()
       const settings = {timestampsInSnapshots: true}
       db.settings(settings)

// get info and push to firebase change to result page
$("#compare-btn").on("click", function (event) {
        event.preventDefault()
        // $("#current-temp").empty();
        let city1 = $(".city1-input").val();
        console.log(city1)
        let city2 = $(".city2-input").val();
        let fromDate = $(".leaving").val();
        let toDate = $(".returning").val();
        console.log(email)
        db.collection("user").doc(email).set({
                
                starting: city1,
                destination: city2,
                leaving: fromDate,
                returning: toDate,
        })

       let newEmail = "?para1=" + email;
       console.log(newEmail)
       location.replace ('./results.html'+newEmail)
})

db.collection("user").get().then(function(snapshot) {
        snapshot.forEach(function(doc) {
                        console.log(doc.data().trip.destination)
                let city1 = doc.data().trip.starting;
                        console.log(city1)
                let city2 = doc.data().trip.destination;
                        console.log(city2)
                let fromDate = doc.data().trip.leaving;
                        console.log(fromDate)
                let toDate = doc.data().trip.returning;
                        console.log(toDate)
                let from = moment(fromDate).format("YYYY-MM-DD");
                console.log(from)
                let to = moment(toDate).format("YYYY-MM-DD");
                console.log(to)
                let duration = to.diff(from, "days");
        
                let url1 ="https://api.apixu.com/v1/forecast.json?key=b44ed5063f3342b280513045181409&q=" +      city1 +"&days=10"
                        console.log(url1)
                let url2 ="https://api.apixu.com/v1/forecast.json?key=b44ed5063f3342b280513045181409&q=" + city2 +"&days=10"
                        console.log(url2)
                Promise.all([$.get(url1), $.get(url2)])
                .then(function (results) {
                                console.log(results);
                        const city1Forecasts = results[0].forecast.forecastday.filter(
                                day => day.date >= from
                        );
                        const city2Forecasts = results[1].forecast.forecastday.filter(
                                day => day.date >= from
                        );
                        let tempDiffMessage = ''
                        let windDiffMessage = ''
                        let humidityDiffMessage = ''

                        for (let i = 0; i < duration+1; i++) {
                     let date = city1Forecasts[i].date;
                     let day = moment(date).format('dddd')
                    //  console.log(day)
                     const city1DayMax = city1Forecasts[i].day.maxtemp_f;
                     const city2DayMax = city2Forecasts[i].day.maxtemp_f;
                     const maxDiff = Math.round(city1DayMax - city2DayMax);
                     console.log(`Day ${i + 1}: ${Math.round(maxDiff)}`);
                            if (maxDiff < 0) {
                                   tempDiffMessage = maxDiff*-1 + ' degrees warmer'
                            } else {
                                   tempDiffMessage = maxDiff + ' degrees cooler'
                            }
                     const city1DayHum = city1Forecasts[i].day.avghumidity;
                     const city2DayHum = city2Forecasts[i].day.avghumidity;
                    //  console.log(city1DayHum)
                    //  console.log(city2DayHum)
                     const humDiff = Math.round(city1DayHum - city2DayHum);
                    //  console.log(`Day ${i + 1}: ${Math.round(humDiff)}`);
                            if (humDiff < 0) {
                                   humidityDiffMessage = humDiff*-1 + '% more humidity'
                            } else {
                                   humidityDiffMessage = humDiff + '% less humidity'
                            }
                     const city1DayWind = city1Forecasts[i].day.maxwind_mph;
                     const city2DayWind = city2Forecasts[i].day.maxwind_mph;
                     const winDiff = Math.round(city1DayWind - city2DayWind);
                    //  console.log(`Day ${i + 1}: ${Math.round(winDiff)}`);
                            if (winDiff < 0) {
                                windDiffMessage = winDiff*-1 + 'mph more wind'
                            } else {
                                windDiffMessage = winDiff + 'mph less wind'
                            }
                     const city2Condition = city2Forecasts[i].day.condition.text;
                     const city2Icon = city2Forecasts[i].day.condition.icon;
                    //  console.log(`Day ${i + 1}: ${city2Condition}`)
                     console.log(`Day ${i + 1}: https:${city2Icon}`)
            
                    $("#card-holder").append(`
                            <div class="card mb-3" style="width: 18rem;">
                            <img class="card-img-top" src="https:${city2Icon}" alt="Card image cap">
                            <h2 id="card-city">${city2}</h2>
                            <div class="card-body">
                                   <p class="card-text font-weight-bold">${day}: ${city2Condition}</p>
                                   <p class="card-text">${tempDiffMessage}</p>
                                   <p class="card-text">${humidityDiffMessage}</p>
                                   <p class="card-text">${windDiffMessage}</p>
                            </div>
                            </div>
                    `);
              }
       })
})

       .catch(function (err) {
              console.log(err);
       });
})
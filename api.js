//API call on button click to retrieve temp at both city inputs
$(".btn").on("click", function (event) {
     event.preventDefault();
     let city1 = $("#city1-input").val();
     let city2 = $("#city2-input").val();
     let url1 = "https://api.apixu.com/v1/current.json?key=b44ed5063f3342b280513045181409&q=" + city1;
     let url2 = "https://api.apixu.com/v1/current.json?key=b44ed5063f3342b280513045181409&q=" + city2;
      
     $.get(url1)
     .then(function (r) {
          console.log(r)
          let results = r.current;
          city1Temp = results.temp_f;
          city1Hum = results.humidity;
          console.log(city1Hum)
     })
       .then(city1 => {
         $.get(url2)
           .then(function (r) {
             console.log(r)
             let results = r.current;
             city2Temp = results.temp_f;
             let tempDifference = Math.round(city1Temp - city2Temp)
             $("#forecast-temp").append(tempDifference + "\xB0 F");
             let city2Hum = results.humidity;
             let humDifference = Math.round(city1Hum - city2Hum)
             console.log(city2Hum)
             console.log(humDifference + "%")
             $("#forecast-temp").append(humDifference + "%");
           })
           .catch(function (e) {
           })
       })
       .catch(function (e) {
       });
    });
   
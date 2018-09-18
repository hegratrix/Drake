//API call on button click to retrieve temp at both city inputs

$(".btn").on("click", function (event) {
     event.preventDefault();
     let city1 = $("#city1-input").val();
     let url1 = "https://api.apixu.com/v1/current.json?key=b44ed5063f3342b280513045181409&q=" + city1;

     $.get(url1)
          .then(function (r) {
               console.log(r)
               var results = r.current;
               var city1temp = results.temp_f;
               $("#forecast-temp").append(city1temp)
          })
          .catch(function (e) {
          });

     let city2 = $("#city2-input").val();
     let url2 = "https://api.apixu.com/v1/current.json?key=b44ed5063f3342b280513045181409&q=" + city2;

     $.get(url2)
          .then(function (r) {
               console.log(r)
               var results = r.current;
               var city2temp = results.temp_f;
               $("#forecast-temp").append(city2temp)
          })
          .catch(function (e) {
          });
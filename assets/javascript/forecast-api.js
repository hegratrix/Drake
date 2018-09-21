$(".btn").on("click", function (event) {
  event.preventDefault();
  $("#forecast").empty();

  let city1 = $("#city1-input").val();
  let city2 = $("#city2-input").val();
  //Calculating Days in trip
  let fromDate = $("#leaving").val(),
    toDate = $("#returning").val(),
    from,
    to,
    duration;

  from = moment(fromDate, "YYYY-MM-DD");
  to = moment(toDate, "YYYY-MM-DD");
  duration = to.diff(from, "days");

  let url1 =
    "https://api.apixu.com/v1/forecast.json?key=b44ed5063f3342b280513045181409&q=" +
    city1 +
    "&days=10"

  //changed the last part of the api to include "10" instead of duration. They say they provide *up to 10days of forecast
  // so I am pulling the max data in and stepping into the correct dates below.

  let url2 =
    "https://api.apixu.com/v1/forecast.json?key=b44ed5063f3342b280513045181409&q=" +
    city2 +
    "&days=10"

  //changed the last part of the api to include "10" instead of duration. They say they provide *up to 10days of forecast
  // so I am pulling the max data in and stepping into the correct dates below.

  Promise.all([$.get(url1), $.get(url2)])
    .then(function (results) {
      console.log(results);
      console.log(duration);
      console.log(toDate);
      console.log(fromDate);
      //added filter here so it would start pulling from the correct dates
      const city1Forecasts = results[0].forecast.forecastday.filter(
        day => day.date >= fromDate
      );

      console.log(city1Forecasts);
      //added this console log for city1Forecasts to see how much data we are getting back from the api since there is a limit and we dont always know
      console.log(results[0].forecast.forecastday);
      //added filter here so it would start pulling from the correct dates
      const city2Forecasts = results[1].forecast.forecastday.filter(
        day => day.date >= fromDate
      );
      console.log(city2Forecasts);
      for (let i = 0; i < duration; i++) {
        const city1DayMax = city1Forecasts[i].day.maxtemp_f;
        const city2DayMax = city2Forecasts[i].day.maxtemp_f;
        const maxDiff = city1DayMax - city2DayMax;
        console.log(`Day ${i + 1}: ${Math.round(maxDiff)}`);

        const city1DayHum = city1Forecasts[i].day.avghumidity;
        const city2DayHum = city2Forecasts[i].day.avghumidity;
        const humDiff = city1DayHum - city2DayHum;
        console.log(`Day ${i + 1}: ${Math.round(humDiff)}`);

        const city1DayWind = city1Forecasts[i].day.maxwind_mph;
        const city2DayWind = city2Forecasts[i].day.maxwind_mph;
        const winDiff = city1DayWind - city2DayWind;
        console.log(`Day ${i + 1}: ${Math.round(winDiff)}`);

        const city2Condition = city2Forecasts[i].day.condition.text;
        const city2Icon = city2Forecasts[i].day.condition.icon;
        console.log(`Day ${i + 1}: ${city2Condition}`);
        console.log(`Day ${i + 1}: https:${city2Icon}`);

        $("#forecast").append(`
        <div>Day ${i + 1}: ${Math.round(maxDiff)} \xB0 F </div>`);
        $("#forecast").append(
          `<div>Day ${i + 1}: ${Math.round(humDiff)}%</div>`
        );
        $("#forecast").append(
          `<div>Day ${i + 1}: ${Math.round(winDiff)}mph</div>`
        );
        $("#forecast").append(`<div>Day ${i + 1}: ${city2Condition}</div>`);
        $("#forecast").append(
          `<div>Day ${i +
          1}: <img id="weatherIcon" src="https:${city2Icon}" alt=weatherIcon></div>`
        );
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

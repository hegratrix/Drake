let citySearch = decodeURIComponent(window.location.search);
citySearch = citySearch.substring(1);
citySearch = citySearch.replace("para1=", "");


$("#search-btn").on("click", function(event) {
  event.preventDefault();
  $("#location-holder").empty();
  let cityFinal = citySearch;
  let search = $(".foursquare-input").val();
  $.get(
    "https://api.foursquare.com/v2/venues/explore?client_id=3YERGI2M0YLICHXAYSS3E0HUGHJNPVPOET02V3UFM2SKPIJV&client_secret=PYF2M30ZSHNXR0KWY2YNSLVF0W3SI5RYGYFRDH1VEWJBVVSD&v=20180323&limit=10&near=" +
      cityFinal +
      "&query=" +
      search
  )
    .then(function(results) {
      
      const venueLength = results.response;
      
      const itemArr = results.response.groups[0].items;

      for (let i = 0; 0 < itemArr.length; i++) {
        const venue = itemArr[i].venue;
        
        const name = venue.name;
        const locationStreet = venue.location.formattedAddress[0];
        const locationCity = venue.location.formattedAddress[1];
        const category = venue.categories[0].name;        
        
        $("#location-holder").append(`
        <div class="card mb-3" style="width: 18rem;">
          <div class="card-body">
            <p class="card-text font-weight-bold text-center">${name}</p>
            <p class="card-text text-center">${category}</p>
            <p class="card-text text-center">${locationStreet}</p>
          </div>
        </div>
      `);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
});

document.getElementById("new-comp-btn").onclick = function() {
  location.href = "./index.html";
};

document.getElementById("compare-btn").onclick = function() {
  location.href = "./results.html";
};
=======
//console.log("Attempt to contact API");
//$.get(
//  "https://api.foursquare.com/v2/venues/explore?client_id=3YERGI2M0YLICHXAYSS3E0HUGHJNPVPOET02V3UFM2SKPIJV&client_secret=PYF2M30ZSHNXR0KWY2YNSLVF0W3SI5RYGYFRDH1VEWJBVVSD&v=20180323&limit=1&ll=40.7243,-74.0018&query=coffee"
//)
//  .then(function(response) {
//    console.log(response)
//})
// .catch(function(error) {
//  console.error(error)
//});

$(".btn").on("click", function(event) {
    event.preventDefault();
    let city2 = $("#city2-input").val();
    let search = $("#foursquare-input").val();
    $.get(
        "https://api.foursquare.com/v2/venues/explore?client_id=3YERGI2M0YLICHXAYSS3E0HUGHJNPVPOET02V3UFM2SKPIJV&client_secret=PYF2M30ZSHNXR0KWY2YNSLVF0W3SI5RYGYFRDH1VEWJBVVSD&v=20180323&limit=10&near=" +
            city2 +
            "&query=" +
            search
    )
        .then(function(results) {
            console.log(results);
            const venueLength = results.response;
            console.log(venueLength);
            const itemArr = results.response.groups[0].items;

            for (let i = 0; 0 < itemArr.length; i++) {
                const venue = itemArr[i].venue;
                console.log(itemArr[i].venue);
                const name = venue.name;
                const locationStreet = venue.location.formattedAddress[0];
                const locationCity = venue.location.formattedAddress[1];
                const category = venue.categories[0].name;

                console.log(venue);
                console.log(name);
                console.log(location);
                console.log(category);

                $("#foursquare").append(`
              <div>${name}`);
                $("#foursquare").append(`
              <div>${category}`);
                $("#foursquare").append(`
              <div>${locationStreet}   ${locationCity}`);
            }
        })
        .catch(function(err) {
            console.log(err);
        });
});

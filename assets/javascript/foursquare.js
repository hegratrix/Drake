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

let destinationCity = decodeURIComponent(window.location.search);
destinationCity = destinationCity.substring(1);
finalCity = destinationCity.replace('para1=', "");

console.log(finalCity);

$("#search-btn").on("click", function(event) {
    event.preventDefault();
    let city2 = finalCity
    let search = $(".foursquare-input").val();
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

                $("#location-holder").append(`
              <div>${name}`);
                $("#location-holder").append(`
              <div>${category}`);
                $("#location-holder").append(`
              <div>${locationStreet}   ${locationCity}`);
                
            }
        })
        .catch(function(err) {
            console.log(err);
        });
});

document.getElementById("new-comp-btn").onclick = function () {
    location.href = "./index.html";
};

document.getElementById("compare-btn").onclick = function () {
    location.href = "./results.html";
};




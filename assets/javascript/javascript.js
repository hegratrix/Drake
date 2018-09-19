// randomized the background image

var myImages = [
     // "../Group-Project-1/assets/images/desert.jpg",
     "../Group-Project-1/assets/images/beach.png",
     // "../Group-Project-1/assets/images/city2.jpg",
     // "../Group-Project-1/assets/images/rain.jpg",
     // "../Group-Project-1/assets/images/forest.jpg",
     // "../Group-Project-1/assets/images/vegas.jpg",
     // "../Group-Project-1/assets/images/grand-canyon.jpg",
     // "../Group-Project-1/assets/images/london.jpg",
     // "../Group-Project-1/assets/images/seattle.jpg",
     // "../Group-Project-1/assets/images/night-sky.jpg",
];

function changeImg(imgNumber) {

     var imgShown = document.body.style.backgroundImage;
     var newImgNumber = Math.floor(Math.random() * myImages.length);
     document.body.style.backgroundImage = 'url(' + myImages[newImgNumber] + ')';
}

window.onload = changeImg

// DATE PICKER FUNCTIONALITY

// need #startDate and #endDate as IDs in depart/return forms

// var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
// $('#startDate').datepicker({
//      uiLibrary: 'bootstrap4',
//      iconsLibrary: 'fontawesome',
//      minDate: today,
//      maxDate: function () {
//           return $('#endDate').val();
//      }
// });
// $('#endDate').datepicker({
//      uiLibrary: 'bootstrap4',
//      iconsLibrary: 'fontawesome',
//      minDate: function () {
//           return $('#startDate').val();
//      }
// });





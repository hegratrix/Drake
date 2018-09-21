// randomized the background image

var myImages = [
     "./assets/images/desert.jpg",
     "./assets/images/beach.png",
     "./assets/images/city2.jpg",
     "./assets/images/rain.jpg",
     "./assets/images/forest.jpg",
     "./assets/images/vegas.jpg",
     "./assets/images/grand-canyon.jpg",
     "./assets/images/london.jpg",
     "./assets/images/seattle.jpg",
     "./assets/images/night-sky.jpg",
];

function changeImg() {

     var imgShown = document.body.style.backgroundImage;
     var newImgNumber = Math.floor(Math.random() * myImages.length);
     console.log(newImgNumber)
     document.body.style.backgroundImage = 'url(' + myImages[newImgNumber] + ')';
}

window.onload = changeImg()

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





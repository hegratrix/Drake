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
     document.body.style.backgroundImage = 'url(' + myImages[newImgNumber] + ')';
}

window.onload = changeImg()
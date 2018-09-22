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

// sign up pop up window
var modal = document.getElementById('myModal')
var btn = document.getElementById("myBtn")
var span = document.getElementsByClassName("close")[0]

btn.onclick = function() {
    event.preventDefault()
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
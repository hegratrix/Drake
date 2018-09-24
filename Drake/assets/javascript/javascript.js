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

// Get the modal
var modal = document.getElementById('myModalSignUp');
var modal2 = document.getElementById('myModalLogIn');
// Get the button that opens the modal
var btn = document.getElementById("myBtnSignUp");
var btn2 = document.getElementById("myBtnLogIn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close2")[0];
// When the user clicks the button, open the modal 
   btn.onclick = function() {
    event.preventDefault()
    modal.style.display = "block";
}
btn2.onclick = function() {
    event.preventDefault()
    modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

span2.onclick = function() {
    modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    } else if (event.target == modal2) {
        modal2.style.display = "none";
    }
}
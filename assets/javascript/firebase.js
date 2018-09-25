let email = ""
$('#submit-register').click(function (event){
  event.preventDefault()
  email = $('#email-register').val()
  let password1 = $('#password1-register').val()
  let password2 = $('#password2-register').val()
  let status = true
  console.log(status)
  // checks if email is valid
  if ((email.includes('@')===false) || (email.includes('.')===false)) {
    $('#sign-up-email').css('color','red')
    $('#sign-up-email').text('Please enter a valid email address')
    status = false
  } else {
    $('#sign-up-email').css('color', 'black')
    $('#sign-up-email').text('Email Address')
  }
  // checks if password is right length
  if (password1.length < 6) {
    $('#sign-up-password').css('color','red')
    $('#sign-up-password').text('Please enter a password with minimum of 6 characters')
    status = false
  } else {
    $('#sign-up-password').css('color','black')
    $('#sign-up-password').text('Password')
  }
  // checks to see if passwords match
  if (password1 !== password2) {
    $('#sign-up-password2').css('color','red')
    $('#sign-up-password2').text("Passwords don't match")
    status = false
  } else {
    $('#sign-up-password2').css('color','black')
    $('#sign-up-password2').text("Confirm Password")
  }
  // if everything is valid, pushes info to firebase
  if (status === true) {
    firebase.auth().createUserWithEmailAndPassword(email, password1).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('close')
      console.log(errorCode)
      console.log(errorMessage)
      if (errorCode.includes('auth/email-already-in-use')) {
        $('#sign-up-email').css('color','red')
        $('#sign-up-email').text('That email is already in use')
      } else {
        modal.style.display = "none"
      }
    });
  }
})

$('#submit-login').click(function (event){
  event.preventDefault()
  email = $('#email-login').val()
  // let password1 = $('#password1-login').val()
  if (status === true) {
    firebase.auth().createUserWithEmailAndPassword(email, password1).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      if (errorCode.includes('auth/email-already-in-use')) {
        modal.style.display = "none"
      } else {
        $('#email-login').css('color','red')
        $('#email-login').text('Email Not Recognized')
      }
    })
  }
})

function showPassword() {
  let type= $('#password1-register').attr('type')
  if (type === 'password') { 
    $('#password1-register').attr('type','text')
    $('#password2-register').attr('type','text')
  } else {
    $('#password1-register').attr('type','password')
    $('#password2-register').attr('type','password')
  }
}

function showPassword2() {
  let type= $('#password-login').attr('type')
  if (type === 'password') { 
    $('#password-login').attr('type','text')
  } else {
    $('#password-login').attr('type','password')
  }
}
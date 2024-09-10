// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "",
  authDomain: "eagle-airways.firebaseapp.com",
  projectId: "eagle-airways",
  storageBucket: "eagle-airways.appspot.com",
  messagingSenderId: "",
  appId: "",
  databaseURL: "https://eagle-airways-default-rtdb.firebaseio.com/",
  measurementId: "",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var auth = firebase.auth();
var db = firebase.firestore();
var database = firebase.database();
var functions = firebase.functions();

// Global variable for users uid
var user_uid = "";
var email = "";
var password = "";
var setError = "";

// Data extraction stuff
var user_flight_info = "";
var user_departure = "";
var user_destination = "";
var user_departure_date = "";
var user_return_date = "";
var user_no_of_adults = "";

var user_adult_salutation = "";
var user_adult_first_name = "";
var user_adult_last_name = "";
var user_adult_code = "";
var user_adult_number = "";
var user_adult_email = "";

// ------------------------------------------- onAuthStateChanged ---------------------------------------------

// setting the uid of the current user
firebase.auth().onAuthStateChanged((user) => {
  if(!setError && alertText) {
    alertText.style.display = "none"
  } else if(setError && alertText) {
    alertText.style.display = "none"
  }

  if (user) {
    user_uid = user.uid;
    console.log(user_uid);
    if(navbarBookingButton) {
      navbarBookingButton.style.display = "block";
    }
    if(navbarItineraryButton) {
      navbarItineraryButton.style.display = "block";
    }
    if(navbarLogoutButton) {
      navbarLogoutButton.style.display = "block";
    }
    if(navbarSignupButton) {
      navbarSignupButton.style.display = "none";
    }
    if(navbarLoginButton) {
      navbarLoginButton.style.display = "none";
    }
    if(document.getElementById("navbar-email-display")) {
      document.getElementById("navbar-email-display").innerHTML = user.email;
    }
  }
  else {
    if(navbarBookingButton) {
      navbarBookingButton.style.display = "none";
    }
    if(navbarItineraryButton) {
      navbarItineraryButton.style.display = "none";
    }
    if(navbarLogoutButton) {
      navbarLogoutButton.style.display = "none";
    }
    if(navbarSignupButton) {
      navbarSignupButton.style.display = "block";
    }
    if(navbarLoginButton) {
      navbarLoginButton.style.display = "block";
    }
    document.getElementById("navbar-email-display").innerHTML = '';
  }
  // checks whether the browser ends with itinerary and then calls the function wich displays the data
  if (window.location.href.endsWith("itinerary.html")) {
    accessData();
  }
});

const navbarBookingButton = document.querySelector("#navbar-booking-button");
const navbarItineraryButton = document.querySelector("#navbar-itinerary-button");
const alertText = document.querySelector("#alert-box");

const navbarLogoutButton = document.querySelector("#navbar-logout-button");
const navbarSignupButton = document.querySelector("#navbar-signup-button");
const navbarLoginButton = document.querySelector("#navbar-login-button");
if (navbarLogoutButton) {
  navbarLogoutButton.addEventListener("click", (e) => {
    e.preventDefault();

    logoutUser();
  });
}

// ------------------------------------------- itinerary.html ---------------------------------------------

// Code to get data back and display it on the flight details screen
function accessData() {
  var databaseRef = database.ref(user_uid);

  // Gets the data as an object back
  databaseRef.on(
    "value",
    function (snapshot) {
      data = snapshot.val();
      var first_name = data.user_adult_first_name;
      var flight_info = data.user_flight_info;
      var departure = data.user_departure;
      var destination = data.user_destination;
      var departure_date = data.user_departure_date;
      var return_date = data.user_return_date;
      var no_of_adults = data.user_no_of_adults;

      // some regex to remove the airport name and keep only the city
      console.log(departure);
      console.log(departure.match(/[a-zA-Z]*/g, "")[0]);

      departure = departure.match(/[a-zA-Z]*/g, "")[0];
      destination = destination.match(/[a-zA-Z]*/g, "")[0];
      // console.log(departure.replaceAll(/[\s][\S][a-zA-Z0-9][\s]*/g, ''))
      // console.log(departure.replaceAll(/[\s\S[a-zA-Z0-9]*\s[a-zA-Z0-9]*\S[a-zA-Z0-9]*\S+]/g, ''))
      // console.log(departure.replaceAll(/[^a-z0-9+]/g, ''))

      var departure_content = "";
      departure_content += "<td>" + first_name + "</td>";
      departure_content += "<td>" + flight_info + "</td>";
      departure_content += "<td>" + 4091 + "</td>";
      departure_content += "<td>" + departure + "</td>";
      departure_content += "<td>" + destination + "</td>";
      departure_content += "<td>" + departure_date + "</td>";

      var return_content = "";
      return_content += "<td>" + first_name + "</td>";
      return_content += "<td>" + flight_info + "</td>";
      return_content += "<td>" + 4092 + "</td>";
      return_content += "<td>" + destination + "</td>";
      return_content += "<td>" + departure + "</td>";
      return_content += "<td>" + return_date + "</td>";

      console.log(snapshot.val());
      $("#user-table-departure").append(departure_content);
      $("#user-table-return").append(return_content);

      // Dynamic value for payment
      document.getElementById("total-payment").innerHTML = `${50000 * parseInt(no_of_adults)}`;
    },
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
}

// ------------------------------------------- booking2.html ---------------------------------------------

function calcValue2() {
  user_adult_salutation = document.getElementById("user-adult-salutation")
    .value;
  user_adult_first_name = document.getElementById("user-adult-first-name")
    .value;
  user_adult_last_name = document.getElementById("user-adult-last-name").value;
  user_adult_code = document.getElementById("user-adult-code").value;
  user_adult_number = document.getElementById("user-adult-number").value;
  user_adult_email = document.getElementById("user-adult-email").value;

  writeUserData2();
}
// sending data to firebase with UID as the key
function writeUserData2() {
  firebase.database().ref(user_uid).update({
    user_adult_salutation: user_adult_salutation,
    user_adult_first_name: user_adult_first_name,
    user_adult_last_name: user_adult_last_name,
    user_adult_code: user_adult_code,
    user_adult_number: user_adult_number,
    user_adult_email: user_adult_email,
  });
}
const booking2Btn = document.querySelector("#booking2-button");
if (booking2Btn) {
  booking2Btn.addEventListener("click", (e) => {
    e.preventDefault();

    console.log(user_uid);
    calcValue2();

    // needed the timeout function because otherwise the redirection was happening way before data was getting sent
    setTimeout(function () {
      // location.href = "http://127.0.0.1:5500/itinerary.html";
      location.href = "https://eagle-airways.netlify.app/itinerary.html";
    }, 2000);
  });
}

// ------------------------------------------- booking.html ---------------------------------------------

// Sending booking.html data to firebase
function writeUserData() {
  console.log(user_uid);
  firebase.database().ref(user_uid).set({
    user_flight_info: user_flight_info,
    user_departure: user_departure,
    user_destination: user_destination,
    user_departure_date: user_departure_date,
    user_return_date: user_return_date,
    user_no_of_adults: user_no_of_adults,
  });
}
// Accessing data
function calcValue() {
  user_flight_info = document.getElementById("user-flight-info").value;
  user_departure = document.getElementById("user-departure").value;
  user_destination = document.getElementById("user-destination").value;
  user_departure_date = document.getElementById("user-departure-date").value;
  user_return_date = document.getElementById("user-return-date").value;
  user_no_of_adults = document.getElementById("user-no-of-adults").value;

  // Displaying the data collected from the top
  // document.getElementById("user_display").innerHTML = user_details;
  writeUserData();
}
// Button to send data - booking.html
const booking1Btn = document.querySelector("#booking1-button");
if (booking1Btn) {
  booking1Btn.addEventListener("click", (e) => {
    e.preventDefault();

    console.log(user_uid);
    calcValue();

    // needed the timeout function because otherwise the redirection was happening way before data was getting sent
    setTimeout(function () {
      // location.href = "http://127.0.0.1:5500/booking2.html";
      location.href = "https://eagle-airways.netlify.app/booking2.html";
    }, 2000);
  });
}

// ---------------------------------------------------- Authentication --------------------------------------------

// Creating a user
const signUpBtn = document.querySelector("#signup-btn");
if (signUpBtn) {
  signUpBtn.addEventListener("click", (e) => {
    e.preventDefault();

    email = document.getElementById("user-email-signup").value;
    password = document.getElementById("user-password-signup").value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        // setting error message
        setError = error.message
        console.log(setError)
        alertText.style.display = "block"
        alertText.innerHTML = setError
      });
    console.log("User created!");
  });
}

// Logging out the user
function logoutUser() {
  auth.signOut();
  console.log("User logged out!");
}

// Logging in the user
const loginBtn = document.querySelector("#login-btn");
if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    email = document.getElementById("user-email-login").value;
    password = document.getElementById("user-password-login").value;
    console.log(email, password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((cred) => {
        console.log("User logged in!");
      })
      .catch((error) => {
        // setting error message
        setError = error.message
        console.log(setError)
        alertText.style.display = "block"
        alertText.innerHTML = setError
      });
  });
}

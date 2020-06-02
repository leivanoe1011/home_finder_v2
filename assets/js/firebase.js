// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBlj8CgWXeF6dSo5fkma7K-iBOEUOtTpAg",
    authDomain: "anewproject-cb5cc.firebaseapp.com",
    databaseURL: "https://anewproject-cb5cc.firebaseio.com",
    projectId: "anewproject-cb5cc",
    storageBucket: "anewproject-cb5cc.appspot.com",
    messagingSenderId: "966136180453",
    appId: "1:966136180453:web:d996bfcf09907e4907ae0c"
};

// Initialize Firebase
var app1 = firebase.initializeApp(firebaseConfig, 'app1');

// initialize databases
var db1 = firebase.database(app1);


// Search Form Event Handler
// $("#submitButton").on("click", function (event) {
//     event.preventDefault();
//     var city = $(".userCity").val().toString()
//     var stateCode = $(".options").val().toString();

//     saveSearch(city, stateCode);
// });

$("#send_message").on("click", function (event) {
    event.preventDefault();
});


$("#send_message").on("click", function submitForm() {
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var message = $("#message").val();
    var date = $("#date").val();
    var time = $("#time").val();

    if(firstName == "" || lastName == "" || email == "" || date == "" || time == ""){
        M.toast({html: 'All fields are required!'})
        return false
    } else {
        M.toast({html: 'Form submitted successfully!'})
    }

    db1.ref('messages').push().set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        message: message,
        date: date,
        time: time,
    });
});





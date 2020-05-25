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
firebase.initializeApp(firebaseConfig);

$("#send_message").on("click", function (event) {
    event.preventDefault();
});

var firstName = ""
var lastName = ""
var email = ""
var message = ""
var date = ""

$("#send_message").on("click", function submitForm() {
    firstName = $("#firstName").val();
    lastName = $("#lastName").val();
    email = $("#email").val();
    message = $("#message").val();
    date = $("#date").val();



    firebase.database().ref('messages').push().set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        message: message,
        date: date
    });
});


// Configuration file to the Save Search Results
var firebaseConfig_SaveSearchResults = {
    apiKey: "AIzaSyAATbtZxRXHkvnP7CMemxc_8ibgyQLpWN4",
    authDomain: "grpprj1-home-finder.firebaseapp.com",
    databaseURL: "https://grpprj1-home-finder.firebaseio.com",
    projectId: "grpprj1-home-finder",
    storageBucket: "grpprj1-home-finder.appspot.com",
    messagingSenderId: "1063890729907",
    appId: "1:1063890729907:web:78a3392d4da6bb9acb69c6",
    measurementId: "G-LNPJ4N4NXZ"
  };




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
var app1 = firebase.initializeApp(firebaseConfig);
var app2 = firebase.initializeApp(firebaseConfig_SaveSearchResults);

// initialize databases
var db1 = firebase.database(app1);
var db2 = firebase.database(app2);


// Used to load all our search entries
var searchList = [];




function createButtons (saveSearch){
    var newResult = $("<button>");
    var city = saveSearch.city;
    var state = saveSearch.stateCode;

    newResult.text(city + ", " + stateCode);

    $("#previous_search").append(newResult);
}


function saveSearch(city, state){

    var searchObj = {
        city: city,
        stateCode: state
    }

    searchList.push(searchObj);

    database.ref().set({
        searchResults: JSON.stringify(searchList)
    });

    createButtons(searchObj);
}



$("#send_message").on("click", function (event) {
    event.preventDefault();
});



$("#send_message").on("click", function submitForm() {
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var message = $("#message").val();
    var date = $("#date").val();



    db1.ref('messages').push().set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        message: message,
        date: date
    });
});
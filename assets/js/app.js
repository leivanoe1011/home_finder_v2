

// Used to load the results from Realtor API
let realtorResults = [];


// Sample Favorite Card Array
var favoriteCards = [];

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

var app2 = firebase.initializeApp(firebaseConfig_SaveSearchResults, 'app2');

var db2 = firebase.database(app2);


function displayCard(index, homeWebSite, addressLine, beds, baths, city, state, price, lotSize, lotUnit, houseSize, houseUnit, houseImage) {

    var searchResults = $("#homeCards");
    var column = $("<div class='col s12 m6 l6 wow animate__animated animate__fadeInUp'>");

    // adding data target for favorite button functionality
    $(column).attr("data-target", index);

    var card = $("<div class='card large'>");
    var cardImgDiv = $("<div class='card-image'>");
    var cardBackground = $("<img height='300px'>");
    var spanCard = $("<span class='card-title'>");
    var cardContent = $("<div class='card-content' style='margin-top: -10px;'>");
    var cardAction = $("<div class='card-action'>");

    var link = $("<a href='" + homeWebSite + "' target='_blank'>");
    var homeLotSize = $("<p>");
    var bedBaths = $("<p>");
    var buildingSize = $("<p>");
    var location = $("<p>");
    var homePrice = $("<p>");
    
    spanCard.html(addressLine);

    bedBaths.html("Beds: "
        + beds
        + " Baths: "
        + baths);

    location.html("City: "
        + city
        + " State: "
        + state);

    homePrice.html("Listing price: $"
        + price
        + " ");

    // Favorite Icon
    var favoriteButton = $("<a>");
    $(favoriteButton).addClass("btn-floating waves-effect waves-light red right");

    var favIcon = $("<i>");
    $(favIcon).addClass("material-icons favorite_button");
    $(favIcon).attr("data-value", index);
    $(favIcon).text("favorite_border");

    $(favoriteButton).append(favIcon);

    // Check out Property Link
    var propertyLink = $("<a href='"
        + homeWebSite
        + "' target='_blank' style='color: #26a69a;'>"
        + "check out the property"
        + "</a>");

    $(cardAction).append(propertyLink);
    $(cardAction).append(favoriteButton);

    lotSize = (typeof lotSize !== "undefined" ? lotSize : "NA");
    lotUnit = (typeof lotUnit !== "undefined" ? lotUnit : "NA");

    homeLotSize.html("Lot size: "
        + lotSize
        + " "
        + lotUnit);

    houseSize = (typeof houseSize !== "undefined" ? houseSize : "NA")
    houseUnit = (typeof houseUnit !== "undefined" ? houseUnit : "NA")

    var imageUnavailable = cardBackground.attr("src", '\assets/images/unavailable-image.jpg');

    var houseThumbnail = cardBackground.attr("src", houseImage);


    imageUnavailable = (typeof houseImage !== "undefined" ? houseThumbnail : imageUnavailable);


    buildingSize.html("Building size: "
        + houseSize
        + " "
        + houseUnit);

    cardContent.append(cardAction, bedBaths, buildingSize, homeLotSize, location, homePrice);

    link.append(cardBackground);

    cardImgDiv.append(link, spanCard);

    card.append(cardImgDiv, cardContent);

    column.append(card);

    searchResults.append(column);

    $(".preloader-wrapper").hide();
    $("#submitButton").show();
}


// Function will be used to parse the Realtor API results and Favorite functionality
function createCard(index, house) {

    if (house.hasOwnProperty("lot_size")) {
        lotSize = (typeof house.lot_size.size !== "undefined" ? house.lot_size.size.toLocaleString() : "NA")
        lotUnit = (typeof house.lot_size.units !== "undefined" ? house.lot_size.units : "NA")
    }

    if (house.hasOwnProperty("building_size")) {
        houseSize = (typeof house.building_size.size !== "undefined" ? house.building_size.size.toLocaleString() : "NA")
        houseUnit = (typeof house.building_size.units !== "undefined" ? house.building_size.units : "NA")
    };

    // This will be used to create the Favorite Cards
    var propertyObj = {
        homeWebSite: house.rdc_web_url,
        addressLine: house.address.line,
        beds: house.beds,
        baths: house.baths,
        city: house.address.city,
        state: house.address.state,
        price: house.price.toLocaleString(),
        lotSize: lotSize,
        lotUnit: lotUnit,
        houseSize: houseSize,
        houseUnit: houseUnit,
        houseImage: house.thumbnail
    }

    realtorResults.push(propertyObj);

    displayCard(index, propertyObj.homeWebSite, propertyObj.addressLine, propertyObj.beds
        , propertyObj.baths, propertyObj.city, propertyObj.state, propertyObj.price
        , propertyObj.lotSize, propertyObj.lotUnit, propertyObj.houseSize, propertyObj.houseUnit, propertyObj.houseImage);
};


// Used to load all our search entries
var searchList = [];


function createButtons(saveSearch) {
    var newResult = $("<button>");
    newResult.addClass("waves-effect waves-light btn-small search_button");
    var city = saveSearch.city;
    var state = saveSearch.stateCode;

    newResult.html('<i class="material-icons left">home</i>' + city + ", " + state);

    $("#previous_search").append(newResult);
    $("#previous_search").show()
}

function saveSearch(city, state) {

    var searchObj = {
        city: city,
        stateCode: state
    }

    searchList.push(searchObj);

    // db2.ref().set({
    //     searchResults: JSON.stringify(searchList)
    // });

    createButtons(searchObj);
}



function getFavoriteCard(object, cardIndex) {
    var currentCardContainer = object;
    let currentCard;
    var valueId = cardIndex;

    $(currentCardContainer).children("div").each(function () {

        var targetId = $(this).data("target");

        if (valueId === targetId) {
            currentCard = $(this);
            return false;
        }
    });

    return currentCard;

}


function storeFavoriteCards(card) {

    var house = card;

    db2.ref().push({
        // searchResults: JSON.stringify(htmlObject)
        homeWebSite: house.homeWebSite,
        addressLine: house.addressLine,
        beds: house.beds,
        baths: house.baths,
        city: house.city,
        state: house.state,
        price: house.price,
        lotSize: house.lotSize,
        lotUnit: house.lotUnit,
        houseSize: house.houseSize,
        houseUnit: house.houseUnit,
        houseImage: house.houseImage
    });
}

db2.ref().on("value", function (snapshot) {

    var data = snapshot.val();

    console.log("Response from Firebase");
    console.log(data);

    // var parsedData = JSON.parse(data);

    // console.log(parsedData);
})


$(document).on("click", ".favorite_button", function () {

    var cardTargetId = $(this).data("value");

    var favoriteCard = realtorResults[cardTargetId];

    // var favoriteCard = getFavoriteCard(cardContainer,cardTargetId);

    console.log("Displaying Card");
    console.log(favoriteCard);

    storeFavoriteCards(favoriteCard);
});



$(document).ready(function () {
    $('select').formSelect();

    var states = [];

    function loadStates(data) {

        var response = data;

        for (var prop in response) {
            states.push(prop);
        };

    };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://states2.p.rapidapi.com/query?country=USA%3Fcountry%3DUSA",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "states2.p.rapidapi.com",
            "x-rapidapi-key": "5d4693a959msh4109217ff07938cp199915jsnb90f99a85b6d",
            "country": "USA"
        }
    };

    $.ajax(settings).then(function (response) {

        loadStates(response);

        for (var i = 0; i < states.length; i++) {
            var select = $(".stateCode");
            var option = $("<option>");

            option.html(states[i]);

            option.attr("value", states[i]);

            select.append(option);
        };
    });

    $('.sidenav').sidenav();

    $(".preloader-wrapper").hide();



    $("#submitButton").on("click", function (event) {
        event.preventDefault();

        var city = $(".userCity").val();
        var listCount = 24;
        var stateCode = $(".stateCode").val().toString();
        var minPrice = $(".minPrice").val();
        var maxPrice = $(".maxPrice").val();
        var minBaths = $(".minBaths").val();
        var maxBaths = $(".maxBaths").val();

        // Save search Results
        saveSearch(city, stateCode);

        console.log(city)

        $(".preloader-wrapper").show();
        $("#submitButton").hide();

        $("#homeCards").empty();

        console.log(stateCode);

        var apiSettings = {
            "url": "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance"
                + "&city=" + city
                + "&limit=" + listCount
                + "&offset=0"
                + "&state_code=" + stateCode
                + "&price_min=" + minPrice
                + "&price_max=" + maxPrice
                + "&baths_min=" + minBaths
                + "&baths_max=" + maxBaths,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "realtor.p.rapidapi.com",
                "x-rapidapi-key": "6348c7c3damsh9f06f3bf656de25p1004dajsn161cb5ca1bac"
            }
        };

        $.ajax(apiSettings).then(function (response) {
            console.log(response);
            console.log(apiSettings);

            // Used to extract the Favorites
            var results = response.properties

            for (var i = 0; i < results.length; i++) {

                createCard(i, results[i]);
            };

        });
    })
});
// Used to load the results from Realtor API
let realtorResults = [];

// Sample Favorite Card Array
var favoriteCards = [];

// Configuration file to the Favorites Database
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


function displayCard(index, propertyObj, favoritePage) {

    var inFavoritePg = favoritePage;
    var homeWebSite = propertyObj.homeWebSite;
    var addressLine = propertyObj.addressLine;
    var beds = propertyObj.beds;
    var baths = propertyObj.baths;
    var city = propertyObj.city;
    var state = propertyObj.state;
    var price = propertyObj.price;
    var lotSize = propertyObj.lotSize;
    var lotUnit = propertyObj.lotUnit;
    var houseSize = propertyObj.houseSize;
    var houseUnit = propertyObj.houseUnit;
    var houseImage = propertyObj.houseImage;
    var googleDirections = propertyObj.googleDirections;

    // console.log("Google URL: " + googleDirections);
    // console.log("Home website URL: "+ homeWebSite);

    var searchResults = $("#homeCards");
    var column = $("<div class='col s12 m6 l4 wow animate__animated animate__fadeInUp'>");

    // adding data target for favorite button functionality
    $(column).attr("data-target", index);

    var card = $("<div class='card large'>");
    var cardImgDiv = $("<div class='card-image'>");
    var cardBackground = $("<img height='300px' class='responsive-image'>");
    var spanCard = $("<span class='card-title'>");
    var cardContent = $("<div class='card-content'>");
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
    $(favIcon).attr("data-favPg", inFavoritePg);

    // Defines the page where this code is rendered
    if (inFavoritePg === 0) {
        $(favIcon).text("favorite_border");
    }
    else {
        $(favIcon).text("favorite");
    }

    $(favoriteButton).append(favIcon);

    // Check out Property Link
    var propertyLink = $("<a href='"
        + homeWebSite
        + "' target='_blank'>"
        + "Check out the property"
        + "</a>");
    // Google Maps Directions Link
    var directionLink = $("<a href='"
        + googleDirections
        + "' target='_blank'>"
        + "Get Directions"
        + "</a>");

    $(cardAction).append(propertyLink);
    $(cardAction).append(directionLink);
    $(cardAction).append(favoriteButton);

    lotSize = (typeof lotSize !== "undefined" ? lotSize : "NA");
    lotUnit = (typeof lotUnit !== "undefined" ? lotUnit : "");

    homeLotSize.html("Lot size: "
        + lotSize
        + " "
        + lotUnit);

    houseSize = (typeof houseSize !== "undefined" ? houseSize : "NA");
    houseUnit = (typeof houseUnit !== "undefined" ? houseUnit : "");

    var imageUnavailable = cardBackground.attr("src", '\assets/images/unavailable-image.jpg');

    var houseThumbnail = cardBackground.attr("src", houseImage);


    imageUnavailable = (typeof houseImage !== "undefined" ? houseThumbnail : imageUnavailable);


    buildingSize.html("Building size: "
        + houseSize
        + " "
        + houseUnit);

    cardContent.append(bedBaths, buildingSize, homeLotSize, location, homePrice);

    link.append(cardBackground);

    cardImgDiv.append(link, spanCard);

    card.append(cardImgDiv, cardContent, cardAction);

    column.append(card);

    searchResults.append(column);

    $(".preloader-wrapper").hide();
    $("#submitButton").show();
};


// Function will be used to parse the Realtor API results and Favorite functionality
function createCard(index, house){
    var lotSize = "NA"
    var lotUnit = ""
    var houseSize = "NA"
    var houseUnit = ""

    if (house.hasOwnProperty("lot_size")) {
        lotSize = (typeof house.lot_size.size !== "undefined" ? house.lot_size.size.toLocaleString() : "NA")
        lotUnit = (typeof house.lot_size.units !== "undefined" ? house.lot_size.units : "")
    }

    if (house.hasOwnProperty("building_size")) {
        houseSize = (typeof house.building_size.size !== "undefined" ? house.building_size.size.toLocaleString() : "NA")
        houseUnit = (typeof house.building_size.units !== "undefined" ? house.building_size.units : "")
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
        houseImage: house.thumbnail,
        googleDirections: `http://maps.google.com/maps?q=${house.address.city}+${house.address.state}+${house.address.line}`
    };
    // console.log (propertyObj);

    realtorResults.push(propertyObj);

    displayCard(index, propertyObj, 0);
}


// Used to load all our search entries
var searchList = [];



// Creates a button to access the search
function createButtons(saveSearch, index) {
    var newResult = $("<button>");
    $(newResult).addClass("waves-effect waves-light btn-small search_button");

    // The data index will be used to query the results 
    $(newResult).attr("data-index", index);

    var city = saveSearch.city;
    var state = saveSearch.stateCode;

    // We can add the form details as a data attribute

    $(newResult).html('<i class="material-icons left">home</i>' + city + ", " + state);

    $("#previous_search").append(newResult);
    $("#previous_search").show();
}

// Gathers all the information from a search
function saveSearch(city, stateCode, listCount, minPrice, maxPrice, minBaths, maxBaths, minBeds, maxBeds) {

    var searchObj = {
        city: city,
        stateCode: stateCode,
        listCount: listCount, 
        minPrice: minPrice, 
        maxPrice: maxPrice,
        minBaths: minBaths,
        maxBaths: maxBaths,
        minBeds: minBeds,
        maxBeds: maxBeds,
    };

    
    searchList.push(searchObj);

    var currentIndex = searchList.length;

    var loopLength = (( currentIndex <= 3 ) ? currentIndex : 3);

    // Load the search entries into the Session Storage
    sessionStorage.setItem("searchObj", JSON.stringify(searchList));

    $("#previous_search").empty();
  

    // Only the latest 3 search entries are loaded to the Index html previous search container
    while( loopLength > 0){

        currentIndex--;

        createButtons(searchList[currentIndex], currentIndex);

        loopLength--;
        
    }

}

// Function NOT used
function getFavoriteCard(object, cardIndex) {
    var currentCardContainer = object;
    let currentCard;
    var valueId = cardIndex;

    $(currentCardContainer).children("div").each(function () {
        var targetId = $(this).data("target");

        if (valueId === targetId) {
            currentCard = $(this);
            return false;
        };
    });

    return currentCard;

};


function storeFavoriteCards(card) {

    console.log("adding card to firebase");

    var house = card;

    db2.ref().push({
        homeWebSite: house.homeWebSite,
        addressLine: house.addressLine,
        beds: house.beds,
        baths: house.baths,
        city: house.city,
        state: house.state,
        price: house.price,
        lotSize: ((house.lotSize === undefined) ? "NA" : house.lotSize),
        lotUnit: ((house.lotUnit === undefined) ? "NA" : house.lotUnit),
        houseSize: ((house.houseSize === undefined) ? "NA" : house.houseSize),
        houseUnit: ((house.houseUnit === undefined) ? "NA" : house.houseUnit),
        houseImage: ((house.houseImage === undefined) ? "NA" : house.houseImage)
    });
};

// Used to store the favorite cards in the Index HTML
// Here we capture the Firebase Key when a new entry is Pushed
var favorites = [];

// Child added trigger to detect favorites when page loads and then add the "key" that exists in firebase so we can delete it later
db2.ref().on("child_added", function (snapshot) {
    // use jquery or whatever to signifiy favorites on page
    var favorite = snapshot.val();
    favorite.key = snapshot.key; // will include the key from firebase? no need to add that.

    favorites.push(favorite);
});


// Remove the favorite card from the Firebase Index
function removeStoredFavoriteCard(card) {
    console.log("Removing Card from Firebase");

    var addressLine = card.addressLine;
    var city = card.city;
    var state = card.state;
    var key = "";

    for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].addressLine === addressLine && favorites[i].city === city && favorites[i].state === state) {
            key = favorites[i].key;
            console.log(key);
            favorites.splice(i, 1);
            break;
        };
    };


    db2.ref().child(key).remove();
};


// Remove card when is displayed in the Favorite Index
function removeCard(cardId) {

    var currentCardTarget = $("#homeCards").find('[data-target="' + cardId + '"]');

    $(currentCardTarget).remove();

}

// Save House when selected to Favorite the home
$(document).on("click", ".favorite_button", function () {
    
    var currentFavoriteIcon = $(this).text();

    var cardTargetId = $(this).data("value");

    var isFavoritePg = $(this).data("favpg");

    let favoriteCard;


    if (isFavoritePg === 0) {
        console.log("In IF");
        favoriteCard = realtorResults[cardTargetId];
    }
    else {
        console.log("In else")
        favoriteCard = favoriteCards[cardTargetId];
    }

    // If the Card is not favorite, then we add the Favorite Icon with the Heard filled in
    if (currentFavoriteIcon === "favorite_border") {

        console.log("About to add entry in Firebase");

        $(this).text("favorite");

        // Adds new card to firebase database
        storeFavoriteCards(favoriteCard);
    }
    else {

        console.log("About to DELETE entry in Firebase");

        // Remove the favorite icon
        $(this).text("favorite_border");

        // Removes favorite card from firebase database
        removeStoredFavoriteCard(favoriteCard);

        // Currently in Favorite HTML
        if (isFavoritePg === 1) {

            removeCard(cardTargetId);

            favoriteCards.splice(cardTargetId, 1);
        }

    }

});


// Used to make the API call to the Realtor API
function makeRealtorApiCall(city, listCount, stateCode, minPrice, maxPrice, minBaths, maxBaths, minBeds, maxBeds) {

    // The card container must be empty before loading the new cards
    $("#homeCards").empty();

    var apiSettings = {
        "url": "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance"
            + "&city=" + city
            + "&limit=" + listCount
            + "&offset=0"
            + "&state_code=" + stateCode
            + "&price_min=" + minPrice
            + "&price_max=" + maxPrice
            + "&baths_min=" + minBaths
            + "&baths_max=" + maxBaths
            + "&beds_min=" + minBeds
            + "&beds_max=" + maxBeds,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "realtor.p.rapidapi.com",
            "x-rapidapi-key": "6348c7c3damsh9f06f3bf656de25p1004dajsn161cb5ca1bac"
        }
    };

   

    $.ajax(apiSettings).then(function (response) {

        // Used to extract the Favorites
        var results = response.properties

        for (var i = 0; i < results.length; i++) {
            createCard(i, results[i]);
        };

    });
}


function updateForm(searchSelected){

    var city = searchSelected.city;
    var state = searchSelected.stateCode;
    var listCount = searchSelected.listCount;
    var minPrice = searchSelected.minPrice;
    var maxPrice = searchSelected.maxPrice;
    var minBaths = searchSelected.minBaths;
    var maxBaths = searchSelected.maxBaths;
    var minBeds = searchSelected.minBeds;
    var maxBeds = searchSelected.maxBeds;


    $(".userCity").val(city.toUpperCase());
    $(".stateCode").val(state);
    $(".minPrice").val(minPrice);
    $(".maxPrice").val(maxPrice);
    $(".minBaths").val(minBaths);
    $(".maxBaths").val(maxBaths);
    $(".minBeds").val(minBeds);
    $(".maxBeds").val(maxBeds);

}

$("#advancedFilter").on("click", function () {
    $(".filter").toggle()
});


// Make an API call to the REALTOR API after selecting the Search Button
$(document).on("click", ".search_button", function () {

    var searchIndex = $(this).data("index");

    var searchArray = sessionStorage.getItem("searchObj");

    var parsedSearchArray = JSON.parse(searchArray);

    var searchSelected = parsedSearchArray[searchIndex];


    var city = searchSelected.city;
    var state = searchSelected.stateCode;
    var listCount = searchSelected.listCount;
    var minPrice = searchSelected.minPrice;
    var maxPrice = searchSelected.maxPrice;
    var minBaths = searchSelected.minBaths;
    var maxBaths = searchSelected.maxBaths;
    var minBeds = searchSelected.minBeds;
    var maxBeds = searchSelected.maxBeds;

    //update form entries
    updateForm(searchSelected);

    // Reach out to the API for the properties
    // makeRealtorApiCall(city, listCount, state, minPrice, maxPrice, minBaths, maxBaths);

})


// Loads up the Search Options when the page is refreshed
function previousSearchAvailable(){
    
    var previousSearchItems = sessionStorage.getItem("searchObj");

    if (previousSearchItems !== null){
       
        var parsedSearchItems = JSON.parse(previousSearchItems);
        var searchLength = parsedSearchItems.length - 1;
        var loopLength = ((parsedSearchItems.length <= 3 ) ? parsedSearchItems.length : 3);

        console.log("In previous search Avaialable")

        while (loopLength > 0){

            // The properties are parsed because this function is used by the Search Form as well
            createButtons(parsedSearchItems[searchLength], searchLength);

            loopLength--;
            searchLength--;
        }

    }
}


$(document).ready(function () {
    $("#previous_search").hide()

    $('select').formSelect();

    $(".filter").hide();

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
        var listCount = 15;
        var stateCode = $(".stateCode").val();
        var minPrice = $(".minPrice").val();
        var maxPrice = $(".maxPrice").val();
        var minBaths = $(".minBaths").val();
        var maxBaths = $(".maxBaths").val();
        var minBeds = $(".minBeds").val();
        var maxBeds = $(".maxBeds").val();
        
        if(stateCode == null || city == ""){
            M.toast({html: 'City and state are required!'})
            return false;
        }
        // Save search Results
        saveSearch(city, stateCode, listCount, minPrice, maxPrice, minBaths, maxBaths, minBeds, maxBeds);

        console.log(city);

        $(".preloader-wrapper").show();
        $("#submitButton").hide();


        console.log(stateCode);

        // submit API request to the Realtor API
        makeRealtorApiCall(city, listCount, stateCode, minPrice, maxPrice, minBaths, maxBaths, minBeds, maxBeds)
    });

    // Load all Search entries from Session Storage
    previousSearchAvailable();

});



// function previousSearchAvailable(){
    
//     var previousSearchItems = sessionStorage.getItem("searchObj");

//     if (previousSearchItems !== null){
       
//         var parsedSearchItems = JSON.parse(previousSearchItems);
//         var searchLength = parsedSearchItems.length - 1;
//         var loopLength = ((parsedSearchItems.length <= 3 ) ? parsedSearchItems.length : 3);

//         while (loopLength > 0){

//             // The properties are parsed because this function is used by the Search Form as well
//             saveSearch(parsedSearchItems[searchLength].city
//                 , parsedSearchItems[searchLength].stateCode
//                 , parsedSearchItems[searchLength].listCount
//                 , parsedSearchItems[searchLength].minPrice
//                 , parsedSearchItems[searchLength].maxPrice
//                 , parsedSearchItems[searchLength].minBaths
//                 , parsedSearchItems[searchLength].maxBaths);

//             loopLength--;
//             searchLength--;
//         }

//     }
// }
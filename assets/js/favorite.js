

// cards in favorite HTML
var favoriteCards = [];


function loadFavoriteObj(index, obj) {

    var homeWebSite = obj.homeWebSite;
    var addressLine = obj.addressLine;
    var beds = obj.beds;
    var baths = obj.baths;
    var city = obj.city;
    var state = obj.state;
    var price = obj.price;
    var lotSize = obj.lotSize;
    var lotUnit = obj.lotUnit;
    var houseSize = obj.houseSize;
    var houseUnit = obj.houseUnit;
    var houseImage = obj.houseImage;

    // displayCard(index, homeWebSite, addressLine, beds, baths, city, state, price, lotSize, lotUnit, houseSize, houseUnit, houseImage)
}

     

function displayFavoriteCard(index, propertyObj, favoritePage) {

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
    $(favIcon).addClass("material-icons infavorite_button");
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
    lotUnit = (typeof lotUnit !== "undefined" ? lotUnit : "NA");

    homeLotSize.html("Lot size: "
        + lotSize
        + " "
        + lotUnit);

    houseSize = (typeof houseSize !== "undefined" ? houseSize : "NA");
    houseUnit = (typeof houseUnit !== "undefined" ? houseUnit : "NA");

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


function removeDisplayedCard(cardId) {

    var currentCardTarget = $("#homeCards").find('[data-target="' + cardId + '"]');

    $(currentCardTarget).remove();

}

function removeFavoriteCard(key) {

    console.log("Removing Card from Firebase");

    db2.ref(key).remove();
    // db2.ref().child(key).remove();
};


// Save House when selected to Favorite the home
$(document).on("click", ".infavorite_button", function () {

    var cardTargetId = $(this).data("value");

    removeFavoriteCard(cardTargetId);

    removeDisplayedCard(cardTargetId);

});


$(document).ready(function () {


    // Initialize the Side Nav
    $(".sidenav").sidenav();
    $(".parallax").parallax();
    $('.slider').slider();
    $(".scrollspy").scrollSpy();
    $(".datepicker").datepicker({
        disableWeekends: true
    });

    // Added Scroll event listener for the Nav bar
    $(window).scroll(function () {

        if ($(window).scrollTop() > 20) {
            $("nav").addClass("white");
            $(".brand-logo").addClass("black-text");
            $(".nav_button").addClass("black-text");
            $("nav").removeClass("transparent white-text");
            $(".menu_icon").addClass("black-text");
        }
        else {
            $("nav").addClass("transparent white-text");
            $(".brand-logo").removeClass("black-text");
            $(".nav_button").removeClass("black-text");
            $(".menu_icon").removeClass("black-text");
        }
    });

    // var index = 0;

    var query = db2.ref().orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {

                var favoriteHome = childSnapshot.val();

                var key = childSnapshot.key

                favoriteCards.push(favoriteHome);

                // loadFavoriteObj(index,favoriteHome);

                displayFavoriteCard(key, favoriteHome, 1);

                // index++;
            })
        });
});


var states = [];

$(document).ready(function () {

    stateApi();

    $('.sidenav').sidenav();

    var zipCode = 37664;//$("#userZip").val().trim();
    var city = "kingsport";//$("#userCity").val().trim();
    var listCount = 9;//$("#listCount").val();
    var stateCode = "tennessee";//$("#stateCode").val().trim();
    var apiKey = "0c292c0993mshd75f0effe5adad9p120e45jsn157b0022e4d8";

    var apiSettings = {
        "url": "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance"
            + "&postal_code=" + zipCode
            + "&city=" + city
            + "&limit=" + listCount
            + "&offset=0"
            + "&state_code=" + stateCode + "",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "realtor.p.rapidapi.com",
            "x-rapidapi-key": apiKey
        }
    };

    $.ajax(apiSettings).then(function (response) {
        console.log(response);
        var results = response.properties
        for (i = 0; i < results.length; i++) {
            createCard();
        };


        function createCard() {
            var searchResults = $("#homeCards");
            var column = $("<div class='col l4'>");
            var card = $("<div class='card large'>");
            var cardImgDiv = $("<div class='card-image'>");
            var cardBackground = $("<img class='responsive-img'>");
            var spanCard = $("<span class='card-title'>");
            var cardContent = $("<div class='card-content'>");
            var cardAction = $("<div class='card-action'>");
            var lotSize = $("<p>");
            var bedBaths = $("<p>");
            var buildingSize = $("<p>");
            var location = $("<p>");
            var price = $("<p>");
            var house = results[i];
            var link = $("<a href='" + house.rdc_web_url + "' target='_blank'>")
            
            spanCard.html(house.address.line);

            // card.addClass("card medium");

            // innerCard.addClass("card-image");

            cardBackground.attr("src", house.thumbnail);

            lotSize.html("Lot size: " + house.lot_size.size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + house.lot_size.units);

            buildingSize.html("Building size: " + house.building_size.size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + house.building_size.units);

            bedBaths.html("Beds: " + house.beds + " Baths: " + house.baths);

            location.html("City: " + house.address.city + " State: " + house.address.state);

            price.html("Listing price: $" + house.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ");

            cardAction.html("<a href='" + house.rdc_web_url + "' target='_blank'>" + "check out the property" + "</a>")



            // cardBackground.addClass("responsive-img");

            // spanCard.addClass("card-title");

            // imgDiv.addClass("col l4");

            cardContent.append(cardAction);
            cardContent.append(bedBaths);
            cardContent.append(buildingSize);
            cardContent.append(lotSize);
            cardContent.append(location)
            cardContent.append(price)

            link.append(cardBackground);

            cardImgDiv.append(link)
            cardImgDiv.append(spanCard);

            card.append(cardImgDiv);
            card.append(cardContent);

            column.append(card);

            searchResults.append(column);

            $(".preloader-wrapper").hide();
        };
    });
});

function loadStates(data) {

    var response = data;

    for (var prop in response) {
        states.push(prop);
    }

}


function stateApi() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://states2.p.rapidapi.com/query?country=USA%3Fcountry%3DUSA",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "states2.p.rapidapi.com",
            "x-rapidapi-key": "0c292c0993mshd75f0effe5adad9p120e45jsn157b0022e4d8",
            "country": "USA"
        }
    }

    $.ajax(settings).done(function (response) {
        loadStates(response);
    });
}


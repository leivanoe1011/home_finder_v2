

$(document).ready(function () {
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
            "x-rapidapi-key": "0c292c0993mshd75f0effe5adad9p120e45jsn157b0022e4d8",
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

    $('select').formSelect();

    $('.sidenav').sidenav();

    $(".preloader-wrapper").hide();

    $("#submitButton").on("click", function (event) {
        event.preventDefault();

        var city = $(".userCity").val();
        var listCount = 24;
        var stateCode = $(".stateCode").val().toString();
        var minPrice = $(".minPrice").val();
        var maxPrice = $(".maxPrice").val();
        
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
                + "&state_code=" + stateCode + ""
                + "&price_min=" + minPrice
                + "&price_max=" + maxPrice,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "realtor.p.rapidapi.com",
                "x-rapidapi-key": "6348c7c3damsh9f06f3bf656de25p1004dajsn161cb5ca1bac"
            }
        };

        $.ajax(apiSettings).then(function (response) {
            console.log(response);
            console.log(apiSettings);
            var results = response.properties

            for (var i = 0; i < results.length; i++) {
                createCard(i);
            };


            function createCard(index) {

                var searchResults = $("#homeCards");
                var column = $("<div class='col s12 l4'>");
                
                // adding data target for favorite button functionality
                $(column).attr("data-target", index);

                var card = $("<div class='card large'>");
                var cardImgDiv = $("<div class='card-image'>");
                var cardBackground = $("<img height='300px'>");
                var spanCard = $("<span class='card-title'>");
                var cardContent = $("<div class='card-content'>");
                var cardAction = $("<div class='card-action'>");
                var house = results[i];
                var link = $("<a href='" + house.rdc_web_url + "' target='_blank'>");
                var lotSize = $("<p>");
                var bedBaths = $("<p>");
                var buildingSize = $("<p>");
                var location = $("<p>");
                var price = $("<p>");

                spanCard.html(house.address.line);

                bedBaths.html("Beds: " 
                + house.beds 
                + " Baths: " 
                + house.baths);

                location.html("City: " 
                + house.address.city 
                + " State: " 
                + house.address.state);

                price.html("Listing price: $" 
                + house.price.toLocaleString()
                + " ");


                // Favorite Icon
                var favoriteButton = $("<a>");
                $(favoriteButton).addClass("btn-floating waves-effect waves-light red right");

                var favIcon = $("<i>");
                $(favIcon).addClass("material-icons favorite_button");
                $(favIcon).attr("data-value",index);
                $(favIcon).text("favorite_border");

                $(favoriteButton).append(favIcon);

                // Check out Property Link
                var propertyLink = $("<a href='" 
                    + house.rdc_web_url 
                    + "' target='_blank'>" 
                    + "check out the property" 
                    + "</a>");

                // Google Maps Directions Link
                var directionLink =$("<a href='" 
                    + googleDirections
                    + "' target='_blank'>"
                    + "Get Directions" 
                    + "</a>");

                $(cardAction).append(propertyLink);
                $(cardAction).append(directionLink);
                $(cardAction).append(favoriteButton);

                cardAction.html("<a href='" 
                + house.rdc_web_url 
                + "' target='_blank' style='color: #26a69a;'>" 
                + "check out the property" 
                + "</a>");

                var sizeLot = "NA";

                var unitLot = "";

                if (house.hasOwnProperty("lot_size")) {
                    sizeLot = (typeof house.lot_size.size !== "undefined" ? house.lot_size.size.toLocaleString() : "NA")
                    unitLot = (typeof house.lot_size.units !== "undefined" ? house.lot_size.units : "NA")
                }

                lotSize.html("Lot size: " 
                + sizeLot 
                + " " 
                + unitLot);

                var sizeHouse = "NA";

                var unitHouse = "";

                if (house.hasOwnProperty("building_size")) {
                    sizeHouse = (typeof house.building_size.size !== "undefined" ? house.building_size.size.toLocaleString() : "NA")
                    unitHouse = (typeof house.building_size.units !== "undefined" ? house.building_size.units : "NA")
                };
                
                var imageUnavailable = cardBackground.attr("src", '\assets/images/unavailable-image.jpg');

                var houseThumbnail = cardBackground.attr("src", house.thumbnail);

                
                imageUnavailable = (typeof house.thumbnail !== "undefined" ? houseThumbnail : imageUnavailable);
               

                buildingSize.html("Building size: " 
                + sizeHouse 
                + " " 
                + unitHouse);

                cardContent.append(cardAction, bedBaths, buildingSize, lotSize, location, price);
                
                link.append(cardBackground);

                cardImgDiv.append(link, spanCard);

                card.append(cardImgDiv, cardContent);

                column.append(card);

                searchResults.append(column);

                $(".preloader-wrapper").hide();
                $("#submitButton").show();
            };
        });
    })
});
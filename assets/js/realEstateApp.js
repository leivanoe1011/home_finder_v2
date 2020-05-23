
// get local address
// Then translate either Geolocation or IP address to users local address and timezone
// Next display prospect properties around the area


var listing_state_code = "TN"
var listing_city = "Murfreesboro";
var listing_Zip_Code = "37128";
var listing_Limit = "10";
var apiKey = "0c292c0993mshd75f0effe5adad9p120e45jsn157b0022e4d8";
var listingsObj = $("#listings");



function displayResults(data){

    // console.log("In Display Results");

    //listingsObj

    $(listingsObj).empty();

    var properties = data.properties;

    console.log(properties);

    for(var i = 0; i < properties.length; i++){
        // console.log(properties[i]);
        
        var propertyLink = $("<a>");

        // $(propertyLink).addClass("col-lg-4 col-xl-4");

        $(propertyLink).addClass("card col-lg-3 col-xl-3");

        var listingLink = properties[i].rdc_web_url;

        $(propertyLink).attr("href",listingLink);

        var propertyImage = $("<img>");

        // if Undefined bring back default image
        var propertyImageUrl = properties[i].thumbnail;

        propertyImageUrl = typeof propertyImageUrl === "undefined" ? "https://ap.rdcpix.com/668ca688ef7f7d7b8c22a3b1e4ed89dal-m2443712745x.jpg" : propertyImageUrl


        $(propertyImage).attr("src", propertyImageUrl);

        $(propertyImage).addClass("card-img-top");

        var aboutHome = $("<div>");

        $(aboutHome).addClass("card-body");


        var propertyBed = properties[i].beds;

        var propertyBath = properties[i].baths_full;

        var propertySize = "NA";

        var propertySizeUnits = "NA";

        if(properties[i].hasOwnProperty("building_size")){
            
            propertySize = (typeof properties[i].building_size.size !== "undefined" ? properties[i].building_size.size : "NA");

            propertySizeUnits = (typeof properties[i].building_size.units !== "undefined" ? properties[i].building_size.units : "NA");
        }
        

        var homeDetails = '<span class="card-text"><strong>' + propertyBed + "</strong> Bed(s) " + 
            "<strong>" + propertyBath + "</strong> bath(s) "  
            +  "<strong>" + propertySize + "</strong> " +  propertySizeUnits+ "</span>";



        var otherDetails = $("<div>");

        $(otherDetails).addClass("row card-text");



        var homeAddress = '<span class="card-text col-lg-8 col-xl-8 home_address">' + properties[i].address.line + 
            "<br>" + properties[i].address.city + ", " + properties[i].address.state_code + 
            " " + properties[i].address.postal_code + '</span>'

            
        var emailButton = $("<a>");

        $(emailButton).addClass("btn btn-primary col-lg-4 col-xl-4");

        $(emailButton).attr("href","#");

        $(emailButton).text("Email Agent");

        
        $(otherDetails).append(homeAddress);

        $(otherDetails).append(emailButton);



        $(aboutHome).append(homeDetails);

        $(propertyLink).append(propertyImage);
        

        $(propertyLink).append(homeDetails);

        // $(propertyLink).append(homeAddress);
        $(propertyLink).append(otherDetails);

        $(propertyLink).appendTo(listingsObj);

    }

}

function realtorCall(city, state, zip, limit){
    

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance" 
            + "&postal_code=" + listing_Zip_Code 
            + "&city=" + listing_city 
            + "&limit=" + listing_Limit 
            + "&offset=0"
            +"&state_code=" + listing_state_code + "",
            
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "realtor.p.rapidapi.com",
            "x-rapidapi-key": apiKey
        }
    }


    $.ajax(settings).on(function (response) {
        console.log(response);
        
        displayResults(response);
    });
    
}


$("#getDemographics").on("click",function(event){
    
    event.preventDefault();

    var city = $("#cityEntry").val() ;

    city = (city !== null ? city : "NA");

    var state = $("#stateEntry").val();

    state = (state !== null ? state : "NA");

    var zip = $("#zipEntry").val();

    zip = (zip !== null ? zip : "NA");

    var limit = 20;

    // console.log(listing_Zip_Code + " " + listing_city + " " + listing_state_code);

    realtorCall(city, state, zip, limit)

});


$(document).ready(function(){
    realtorCall();
});







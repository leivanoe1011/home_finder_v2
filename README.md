# home_finder


The original Realtor API call that we can use a sample for the app.js

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?sort=relevance&city=New%20York%20City&limit=200&offset=0&state_code=NY",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "realtor.p.rapidapi.com",
		"x-rapidapi-key": "0c292c0993mshd75f0effe5adad9p120e45jsn157b0022e4d8"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});



Functionality and layout (Suggestion from Noe)
- Add a Header Cover Page
- When Scroll Down, the Navbar appears
- The Search Form would slide in (animation)
- When the user submits the search form, the homes will be loaded below the Search Form. 
- At the same time, a button will be generated that will save all the data from that search.  
	-- This functionality will give the user to go back to previous search criteria.

//Notes from Jason
1) Need to get call schedule date to popluate once selected.
2) Lets link our own social media pages unless we are going to use  your girlfriends.
3) Clean up search modules or at least make them more visually appealing
4) Too much white space between the search and contact zones.
5) Consider adding a few more pictures to the slide show.
6) I'd still like to attempt an animated landing/splash page. (I'll take that on myself, but wont spend too much time as it may not be worth all the effort)
7) There seems to be some errors caused by Google Translate. Do we even need this?
8) Im way behind on this API and what we can use it for. Itll take me time to read the documentation and get up to speed with you guys in case you were thinking of offering more search criteria.
9) Adding Google Maps API


var spotify = require('spotify');
 var nodeArgs = process.argv;

 var request = require("request"); 
 var movieName = "";


var Twitter = require('twitter'); 
var twitKeys = require("./keys.js"); 



var client = new Twitter(twitKeys.twitterKeys); // creates data to get, it uses exports from my key.js to grab the keys for the twitter auth.

var params = { q: 'bw70317', count: 20 }; // this is from the twitter  npm

var commands = process.argv[2];

var fs = require("fs");
var getSpotify = "";
 var movieName = "";


for (var i = 3; i < nodeArgs.length; i++) {

	if (i > 3 && i < nodeArgs.length) {

	getSpotify = getSpotify + "+" + nodeArgs[i];
}

	else {
		getSpotify += nodeArgs[i];
	}
}

for (var i =3; i < nodeArgs.length; i++) {

	if (i > 3 && i < nodeArgs.length) {

		movieName = movieName + "+" + nodeArgs[i];
	}

	else { 
		movieName += nodeArgs[i];
	}
}
// this loops through all the words in the node agrument, it starts at three because 2 is //
//is taken up by the "commands" (see switch)


switch (commands) {

	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	searchSpotify();
	break;

	case "movie-this":
	getMovie();
	break;

 	case "do-what-it-says":
 	itSays();
 	break;
};

// this is like the bank.js that allows the program to switch between commands from the user

function myTweets() {

	client.get('search/tweets', params, callback); //using .get from the api and client from above

	function callback(error, data, response) {

		var tweets = data.statuses;
		for (var i=0; i < tweets.length; i++) {

			if (error) {
				console.log(error);
			} // for loop goes through the data and places what is called on to the screen

			else {
				console.log(tweets[i].created_at);
				console.log(tweets[i].text);
				console.log("---------------------------------------------")
			}
		}

			}

	}


// this mirrors the twitter NPM -- the search/tweets is Get category
// the data.statuses grabs the data with the .get function and the statuses is from the API





function searchSpotify() {

if (!getSpotify) {

	getSpotify = "The Sign by Ace of Base";
} // runs if user doesnt put an input after calling the search
//spotify function by typing "spotify this song"

spotify.search({ type: 'track', query: getSpotify }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

 	

 	var spotifyData = data.tracks.items; // captures the data spotify

 	for (var i=0; i < spotifyData.length; i++) {

 		console.log("The Artist is " + spotifyData[i].artists[0].name);
 		console.log("The song is called " + spotifyData[i].name);
 		console.log("The preview link is " + spotifyData[i].preview_url);
 		console.log("The album is called " + spotifyData[i].album.name) // to get this one, i had to look under the API for album
 		console.log("---------------------------------------------")
 	} // the HW help helped me with this first two parts, the others werent so hard 
 	// from the API

  
});

}
// got tracks from spotify api

function getMovie() {


	if(!movieName) {

		movieName = "Mr. Nobody";

	       } // default if no [3] argument is called

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json$tomatoes=true";

var tomatoURL = "https://www.rottentomatoes.com/m/" + movieName;

// used this from the activity, same as spotify, including the queryURL
// got the RT /m from the api that Cherish shared. 


	request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {

  
  	console.log("The title of the movie is: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("The IMDB rating of this movie is " + JSON.parse(body).imdbRating);
    console.log("This movie was produced in " + JSON.parse(body).Country);
   	console.log("The language of this movie is " + JSON.parse(body).Language);
   	console.log("The plot of this movie is as follows " + JSON.parse(body).Plot);
   	console.log("The actors in this movie are " + JSON.parse(body).Actors);
   	console.log("The Rotten Tomatoes URL for this movie is " + tomatoURL);
   	console.log("---------------------------------------------")
         }

      }); 

} // JSON does it magic and returns the requests from OMDB api. HW helped with RT call



 function itSays () {

 	fs.appendFileSync("random.txt", "utf8", function (error, data) {

 		

 		var output = data.split(",")


 
 	});
 }

 // I couldn't figure this out, tried rewriting the function for spotify, then saw the 
 // comments in homework help and that just confused me furhter tbh. I tried messing with this:

// http://stackoverflow.com/questions/19739755/nodejs-callbacks-simple-example
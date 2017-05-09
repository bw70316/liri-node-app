//ADD NPM packages, twitter, keys(exported file see solution video: https://www.youtube.com/watch?v=1-k08YfQbec)
//


var keys = require('..keys.js');

var Twiter = require('twitter');

var getMyTweets = function() {

	var client = new Twitter(keys.twitterKeys);

	var params = (screen_name: "bw70316");
	client.get('statuses/user_timeline', params, function(error, tweets, response){

		if (!error) {

			for(var i = 0, i=tweets.length; i++) {
				console.log(tweets[i].created_at);
				console.log(' ');
				console.log(tweets[i].text);
			}

		}
	});

}

var spotify = require('spotify');

spotify.search({ type: 'track', query: 'dancing in the moonlight' },
	function(err, data) {

		if( err ) {
			console.log('Error occurred: ' + err);
			return;
		}

		var songs = data.tracks.items;
		for (var i=0; i<songs.length; i++) {
			console.log(i);
			console.log('artist(s): ' + songs[i].artists.map(
				getArtistNames));
			console.log('song name: ' + songs[i].name);
			//etc. see video 
		}

	
	});
}

// for the dowhat it says you need to reference a random.txt file that says 
//"spotify this song, I want it that way"

var doWhatItSays = function() {
	fs.readFile('random.txt', 'utf8', function(err, data) {

		if (err) throw err;

		var dataArr = data.split(',');
		if (dataArr.length == 2) {
			pick(dataArr[0], dataArr[1]);
		} else if (dataArr.length == 1) {
			pick(dataArr[0]);
		}
		});
	
}


//This shit above is saying split the data from the file into different arrays
//at the comma (data.split(',')). Each side of the comma becomes an argument of data












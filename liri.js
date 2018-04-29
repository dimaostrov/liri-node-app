require("dotenv").config();
const keys = require('./keys');

const Spotify = require('node-spotify-api');
const Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

const arg = process.argv[2];





if(arg === 'my-tweets'){
    var params = {screen_name: 'g3642563', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets.map(x => `${x.text} on ${x.created_at.split(' ')[0]} at ${x.created_at.split(' ')[3]}`));
      }
    });
} else if(arg === 'spotify-this-song'){

} else if(arg === 'movie-this'){

} else if(arg === 'do-what-it-says'){

}
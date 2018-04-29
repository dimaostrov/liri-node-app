require("dotenv").config();
const keys = require('./keys');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

const arg = process.argv[2];

if(arg === 'my-tweets'){

} else if(arg === 'spotify-this-song'){

} else if(arg === 'movie-this'){

} else if(arg === 'do-what-it-says'){
    
}
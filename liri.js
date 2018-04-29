require("dotenv").config();
const keys = require("./keys");

const Spotify = require("node-spotify-api");
const Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

const arg = process.argv[2];

if (arg === "my-tweets") {
  var params = { screen_name: "g3642563", count: 20 };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      console.log(
        tweets.map(
          x =>
            `${x.text} on ${x.created_at.split(" ")[0]} at ${
              x.created_at.split(" ")[3]
            }`
        )
      );
    }
  });
} else if (arg === "spotify-this-song") {
  spotify.search({ type: "track", query: process.argv[3] }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    let songs = data.tracks.items;
    console.log(JSON.stringify(songs.map(x => `${x.name} by ${x.artists[0].name}, preview here ${x.preview_url} on ${x.album.name}`), null, 2));
  });
} else if (arg === "movie-this") {
} else if (arg === "do-what-it-says") {
}

/*
x.artists[0].name = artist name 
x.name = song name
x.preview_url = song preview
x.album.name = album name





*/
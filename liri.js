const request = require('request');
const fs = require('fs');
require("dotenv").config();
const keys = require("./keys");

const Spotify = require("node-spotify-api");
const Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

const arg = process.argv[2];
const arg3 = process.argv[3];

async function doProcess(arg, arg3) {
    if (arg === "my-tweets") {
      var params = { screen_name: "g3642563", count: 20 };
      client.get("statuses/user_timeline", params, function(
        error,
        tweets,
        response
      ) {
        if (!error) {
            let toAppend = tweets.map(
              x =>
                `${x.text} on ${x.created_at.split(" ")[0]} at ${
                  x.created_at.split(" ")[3]
                }`
            )
            appendToFile(toAppend)
        }
      });
    } else if (arg === "spotify-this-song") {
      
      spotify.search({ type: "track", query: (arg3 || 'The Sign Ace of Base' ) }, function(
        err,
        data
      ) {
        if (err) {
          return console.log("Error occurred: " + err);
        }
        let songs = data.tracks.items;
        let toAppend = JSON.stringify(songs.map(x => `${x.name} by ${x.artists[0].name}, preview here ${x.preview_url} on ${x.album.name}`), null, 2);
        appendToFile(toAppend);
      });
    } else if (arg === "movie-this") {
      const movie = arg3 || 'Mr. Nobody';
      const url = `http://www.omdbapi.com/?apikey=trilogy&t=${movie}`;
      request(url, (error, response, body) => {
        var result = JSON.parse(body);
        var toAppend = `${result.Title} release on ${result.Released} with a rating of ${result.imdbRating} and RottenTomatoes rating of ${result.Metascore} produced in ${result.Country} in ${result.Language} language(s). ${result.Plot}`;
        appendToFile(toAppend)
      })
    } else if (arg === "do-what-it-says") {
      fs.readFile('./random.txt', 'utf-8', (err, data) => {
          if (err) throw err;
          var howMuch = data.split('\n').length;
          var command = data.split('\n')[Math.floor(Math.random(howMuch) * (howMuch))];
          console.log(command.split('\n'));
          command = command.split(',');
          doProcess(command[0], command[1])
      })
    } else {
      console.log('please provide an argument')
    }
}

function appendToFile(toAppend) {
    fs.appendFile('log.txt', toAppend + '\n', 'utf-8' , (err) => {
    console.log(toAppend)
    if(err) throw err;
        console.log('data appended')
    })
}

doProcess(arg, arg3)
/*
x.artists[0].name = artist name 
x.name = song name
x.preview_url = song preview
x.album.name = album name





*/
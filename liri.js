require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var divider = "--------------------------";
var action = process.argv[2];

switch (action) {
  case "concert-this":
    concert();
    break;
  case "spotify-this-song":
    song();
    break;
  case "movie-this":
    movie();
    break;
  case "do-what-it-says":
    whatever();
    break;
}

function concert() {
  var artist = process.argv.slice(3).join(" ");

  var queryURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  axios.get(queryURL).then(function(response) {
    for (var j = 0; j < response.data.length; j++) {
      console.log(divider);
      console.log("");
      console.log("Venue: " + response.data[j].venue.name);
      console.log("");
      console.log(
        "Location: " +
          response.data[j].venue.city +
          ", " +
          response.data[j].venue.region +
          ", " +
          response.data[j].venue.country
      );
      console.log("");
      var datetime = response.data[j].datetime.split("T");
      var date = moment(`${datetime[0]}`, "YYYY-MM-DD");
      console.log("Date: " + date.format("L"));
      console.log("");
      console.log(divider);
    }
  });
}

function song() {
  var songName = process.argv.slice(3).join(" ");

  if (songName === "") {
    songName = "The Sign";
  }

  spotify
    .search({
      type: "track",
      query: songName
    })
    .then(function(response) {
      console.log(divider);
      console.log("Artist: " + response.tracks.items[0].artists[0].name);
      console.log("");
      console.log("Song: " + response.tracks.items[0].name);
      console.log("");
      console.log("Link: " + response.tracks.items[0].external_urls.spotify);
      console.log("");
      console.log("Album: " + response.tracks.items[0].album.name);
      console.log(divider);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function movie() {
  var movieName = process.argv.slice(3).join(" ");

  if (movieName === "") {
    movieName = "Mr.Nobody";
  }

  var queryURL =
    "http://www.omdbapi.com/?t=" +
    movieName +
    "&imbdRating=&Ratings=&Title=&Actors=&Country=&Language=&y=&plot=short&apikey=trilogy";

  axios.get(queryURL).then(function(response) {
    console.log(divider);
    console.log("Movie Title: " + response.data.Title);
    console.log("");
    console.log("Release Year: " + response.data.Year);
    console.log("");
    console.log("IMBD Rating: " + response.data.imbdRating);
    console.log("");
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[2].Value);
    console.log("");
    console.log("Country Produced In: " + response.data.Country);
    console.log("");
    console.log("Original Language: " + response.data.Language);
    console.log("");
    console.log("Movie Plot: " + response.data.Plot);
    console.log("");
    console.log("Actors: " + response.data.Actors);
    console.log("");
    console.log(divider);
  });
}

function whatever() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) throw err;
    var random = data.split(",")[0];
    var rand = [data.split(",")[1].replace(/^"(.*)"$/, "$1")];

    switch (random) {
      case "concert-this":
        concert1();
        break;
      case "spotify-this-song":
        song1();
        break;
      case "movie-this":
        movie1();
        break;
    }

    function concert1() {
      var artist = rand;

      var queryURL =
        "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp";
      axios.get(queryURL).then(function(response) {
        for (var j = 0; j < response.data.length; j++) {
          console.log(divider);
          console.log("");
          console.log("Venue: " + response.data[j].venue.name);
          console.log("");
          console.log(
            "Location: " +
              response.data[j].venue.city +
              ", " +
              response.data[j].venue.region +
              ", " +
              response.data[j].venue.country
          );
          console.log("");
          var datetime = response.data[j].datetime.split("T");
          var date = moment(`${datetime[0]}`, "YYYY-MM-DD");
          console.log("Date: " + date.format("L"));
          console.log("");
          console.log(divider);
        }
      });
    }

    function song1() {
      var songName = rand;

      if (songName === "") {
        songName = "The Sign";
      }

      spotify
        .search({
          type: "track",
          query: songName
        })
        .then(function(response) {
          console.log(divider);
          console.log("Artist: " + response.tracks.items[0].artists[0].name);
          console.log("");
          console.log("Song: " + response.tracks.items[0].name);
          console.log("");
          console.log(
            "Link: " + response.tracks.items[0].external_urls.spotify
          );
          console.log("");
          console.log("Album: " + response.tracks.items[0].album.name);
          console.log(divider);
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function movie1() {
      var movieName = rand;

      if (movieName === "") {
        movieName = "Mr.Nobody";
      }

      var queryURL =
        "http://www.omdbapi.com/?t=" +
        movieName +
        "&imbdRating=&Ratings=&Title=&Actors=&Country=&Language=&y=&plot=short&apikey=trilogy";

      axios.get(queryURL).then(function(response) {
        console.log(divider);
        console.log("Movie Title: " + response.data.Title);
        console.log("");
        console.log("Release Year: " + response.data.Year);
        console.log("");
        console.log("IMBD Rating: " + response.data.imbdRating);
        console.log("");
        console.log(
          "Rotten Tomatoes Rating: " + response.data.Ratings[2].Value
        );
        console.log("");
        console.log("Country Produced In: " + response.data.Country);
        console.log("");
        console.log("Original Language: " + response.data.Language);
        console.log("");
        console.log("Movie Plot: " + response.data.Plot);
        console.log("");
        console.log("Actors: " + response.data.Actors);
        console.log("");
        console.log(divider);
      });
    }
  });
}

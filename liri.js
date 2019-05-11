require("dotenv").config();

//var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
//var spotify = new Spotify(keys.spotify);

var nodeArgs = process.argv;
var action = process.argv[2];

switch(action){
case "concert-this":
    concert();
    break;
case "spotify-this-song":
    spotify();
    break;
case "movie-this":
    movie();
    break;
case "do-what-it-says":
    whatever();
    break;
};

function concert(){
    var artist = "";
    var divider = "--------------------------";
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
          artist = artist + "+" + nodeArgs[i];
        }
        else {
          artist += nodeArgs[i];      
        }
      }

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(
        function(response){
            for(var j = 0; j < response.data.length; j++){
                console.log(response.data[j].venue.name);
                console.log(response.data[j].venue.city + ", " + response.data[j].venue.region + ", " + response.data[j].venue.country);
                var datetime = response.data[j].datetime.split("T");
                var date = moment(`${datetime[0]}`, "YYYY-MM-DD")
                console.log("Date:" + date.format("L"));
                console.log(divider);
            }
        }
    )

};

function spotify(){
    var songName = "";
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
          songName = songName + "+" + nodeArgs[i];
        }
        else {
          songName += nodeArgs[i];      
        }
    }

    if (songName === ""){
        songName = "The Sign";
    }

};

function movie(){ 
    var movieName = "";
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
          movieName = movieName + "+" + nodeArgs[i];
        }
        else {
          movieName += nodeArgs[i];      
        }
    }

      if(movieName ===""){
        movieName = "Mr.Nobody";
        };

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&imbdRating=&Ratings=&Title=&Actors=&Country=&Language=&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response) {
            console.log("Movie Title: " + response.data.Title)
            console.log("Release Year: " + response.data.Year);
            console.log("IMBD Rating: " + response.data.imbdRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[2].Value);
            console.log("Country Produced In: " + response.data.Country)
            console.log("Original Language: " + response.data.Language)
            console.log("Movie Plot: " + response.data.Plot)
            console.log("Actors: " + response.data.Actors)
        }
      );
};

function whatever(){

};
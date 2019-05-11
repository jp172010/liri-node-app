require("dotenv").config();

//var keys = require("./keys.js");
var axios = require("axios");
//var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var value = process.argv[3];

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
    
};

function spotify(){

};

function movie(){
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&imbdRating=&Ratings=&Title=&Actors=&Country=&Language=&y=&plot=short&apikey=trilogy";
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
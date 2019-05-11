require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

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

};

function whatever(){

};
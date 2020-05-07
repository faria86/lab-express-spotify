require("dotenv").config();

const apikey = process.env.SPOTIFYWEBAPI_API_KEY;
const express = require("express");
const hbs = require("hbs");

// require spotify-web-api-node package here:
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );

// Our routes go here:
app.get("/", (request, response) => {
  response.render("home");
});

app.get("/artist-search", (request, response) => {
  const term = request.query.artistName;
  console.log(term);
  spotifyApi
    .searchArtists(term)
    .then((data) => {
      const dataForFrontEnd = data.body.artists.items;
      console.log("The received data from the API: ", dataForFrontEnd);
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});



app.get('/albums/:artistId', (req, res, next) => {
  const term = resquest.query.artistAlbum;
  spotifyApi
    .searchAlbums(term)
    .then((data) => {
      const dataForFrontEnd = data.body.artists.searchAlbums;
      console.log("The received data from the API: ", dataForFrontEnd);
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});

app.listen(3000, () =>
  console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊")
);

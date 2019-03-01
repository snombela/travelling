// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Movieshow = require("../models/Movieshow");
const Location = require("../models/Location");
const axios = require("axios");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/travellingdb', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

// Drop table
Movieshow.collection.drop();
Location.collection.drop();

const movieShowUrl = "https://api.sheety.co/f151f64a-0a21-4cb6-ada0-4211bb5c9ccf"
const locationsUrl = "https://api.sheety.co/2158d939-007c-4996-b64e-066c5f69f05c"


addLocations(locationsUrl)
  .then(locations => {
    addMovies(movieShowUrl)
      .then(movies => {
        console.log("");
        movies.filter(movie => movie.internalLocationIds != null)
          .forEach(movie => {
            showLocation = locations
              .filter(location => movie.internalLocationIds.split(',').includes(location.internalId))
              .map(location => location._id)
            console.log("La serie " + movie.title + " se ha vinculado con " + showLocation.length + " localizaciones")
            Movieshow.findByIdAndUpdate(movie._id,
              { $push: { locations: { $each: showLocation } } })
              .then(response => {
                return Location.collection.update({},
                  { $unset: { internalId: false } },
                  { multi: true, safe: true }
                ).then(r => {
                  return Movieshow.collection.update({},
                    { $unset: { internalLocationIds: false } },
                    { multi: false, safe: true }
                  ).then(r => mongoose.disconnect())
                }).catch(err => {
                  console.log(err);
                  mongoose.disconnect();
                });
              })
          })
      })
  });




/// functions

function addMovies(movieShowUrl) {
  return axios.get(movieShowUrl)
    .then(response => {
      movieshows = response.data
        .map(movieshow => {
          return {
            internalLocationIds: movieshow.locations,
            title: movieshow.title,
            backgroundUrl: movieshow.backgroundUrl,
            posterUrl: movieshow.posterUrl
          }
        })
      return Movieshow.create(movieshows)
        .then(movies => {
          console.log(`Created ${movies.length} movies and shows`);
          return movies
        }).catch(err => {
          console.log(err);
          mongoose.disconnect();
        })

    }).catch(err => {
      console.log("The error has occurred", err);
      mongoose.disconnect();
    });
}

function addLocations(locationsUrl) {
  return axios.get(locationsUrl)
    .then(response => {
      locations = response.data
        .filter(location => location.id != null)
        .map(location => {
          return {
            internalId: location.id,
            name: location.name,
            address: location.address,
            latitude: location.latitude,
            longitude: location.longitude,
            description: location.description,
            images: location.photos.replace(/\s+/g, '').replace(/\r?\n|\r/g, '').split(',')
          }
        })
      return Location.create(locations)
        .then(locations => {
          console.log(`Created ${locations.length} locations`);
          return locations
        }).catch(err => {
          console.log(err);
          mongoose.disconnect();
        })
    }).catch(err => {
      console.log("The error has occurred", err);
      mongoose.disconnect();
    });
}
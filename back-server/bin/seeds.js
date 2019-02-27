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

const movieShowUrl = "https://api.sheety.co/451bca78-b78d-40bb-b2f1-4d62f3a9b787"
const locationsUrl = "https://api.sheety.co/2158d939-007c-4996-b64e-066c5f69f05c"

axios.get(movieShowUrl)
  .then(response => {
    Movieshow.create(response.data)
      .then(movies => {
        console.log(`Created ${movies.length} movies and shows`);
        mongoose.disconnect();
      }).catch(err => {
        console.log(err);
        mongoose.disconnect();
      })
  }).catch(err => {
    console.log("The error has occurred", err);
    mongoose.disconnect();
  });

axios.get(locationsUrl)
  .then(response => {
    locations = response.data
      .filter(location => location.id != null)
      .map(location => {
        return {
          name: location.name,
          address: location.address,
          latitude: location.latitude,
          longitude: location.longitude,
          description: location.description,
          images: location.photos.replace(/\s+/g, '').replace(/\r?\n|\r/g, '').split(',')
        }
      })
    Location.create(locations)
      .then(locations => {
        console.log(`Created ${locations.length} locations`);
        mongoose.disconnect();
      }).catch(err => {
        console.log(err);
        mongoose.disconnect();
      })
  }).catch(err => {
    console.log("The error has occurred", err);
    mongoose.disconnect();
  });
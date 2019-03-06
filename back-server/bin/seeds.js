// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Movieshow = require("../models/Movieshow");
const Location = require("../models/Location");
const User = require("../models/User");
const Comment = require("../models/Comment");
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


const movieShowUrl = "https://api.sheety.co/f151f64a-0a21-4cb6-ada0-4211bb5c9ccf"
const locationsUrl = "https://api.sheety.co/2158d939-007c-4996-b64e-066c5f69f05c"
const usersUrl = "https://api.sheety.co/40f9be1d-f395-4fb9-a338-10bd0e7a1e88"
const commentUrl = "https://api.sheety.co/e2391d32-be86-41fa-abf5-09d6a8637336"


// addLocationsAndMovies()

// addUsers().then(() => {
//   mongoose.disconnect();
// })

// addCommentWithUsersAndLocations()

/// functions
function addUsers() {
  User.collection.drop();
  return axios.get(usersUrl)
    .then(response => {
      users = response.data
        .map(user => {
          return {
            username: user.name,
            email: user.email,
            password: bcrypt.hashSync(user.password.toString(), bcrypt.genSaltSync(bcryptSalt)),
            imageUrl: user.imageUrl
          }
        })
      return User.create(users)
        .then(users => {
          console.log(`Created ${users.length} Users`);
          // mongoose.disconnect();
        }).catch(err => {
          console.log(err);
          // mongoose.disconnect();
        })

    }).catch(err => {
      console.log("The error has occurred", err);
      // mongoose.disconnect();
    });
}

function addLocationsAndMovies() {
  Movieshow.collection.drop();
  Location.collection.drop();
  return addLocations(locationsUrl)
    .then(locations => {
      return addMovies(movieShowUrl)
        .then(movies => {
          console.log("");
          linkMovieAndLocation()
        })
    });
}

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
          // mongoose.disconnect();
        })

    }).catch(err => {
      console.log("The error has occurred", err);
      // mongoose.disconnect();
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
          // mongoose.disconnect();
        })
    }).catch(err => {
      console.log("The error has occurred", err);
      // mongoose.disconnect();
    });
}

function linkMovieAndLocation() {
  return Location.find({})
    .then(locations => {
      return Movieshow.find({})
        .then(movies => {
          moviesPromise = movies.filter(movie => movie.internalLocationIds != null)
            .map(movie => {
              showLocation = locations
                .filter(location => movie.internalLocationIds.split(',').includes(location.internalId))
                .map(location => location._id)
              console.log("La serie " + movie.title + " se ha vinculado con " + showLocation.length + " localizaciones")
              return Movieshow.update({ _id: movie._id },
                { locations: showLocation })
                .then(response => {
                  return removeMovie()
                }).then(() => {
                  return removeLocation()
                }).then(r => {
                }).catch(err => {
                  console.log(err)
                });
            })
          Promise.all(moviesPromise).then(() => {
            mongoose.disconnect()
          });
        })
    })
}

function addCommentWithUsersAndLocations() {
  Comment.collection.drop();
  return Location.find({})
    .then(locations => {
      return locations.map(location => {
        return User.find({})
          .then(users => {
            users = getRandom(users)
            userPromise = users.map(user => {
              return addComment(user._id)
                .then(response => {
                  return Location.findByIdAndUpdate(location._id,
                    { $push: { comments: { $each: [response] } } })
                    .then(r => {
                      console.log("En la localización " + location.name + " se han creado " + response.length + " para el usuario " + user.username)
                    })
                })
            })
          })
      })
    })
}

function addComment(userId) {
  return axios.get(commentUrl)
    .then(response => {
      comments = response.data
      num = Math.floor(Math.random() * comments.length)
      comment = comments[num]

      newComment = {
        title: comment.title,
        content: comment.comment,
        userId: userId
      }
      return Comment.create(newComment)
    })
}


function removeLocation() {
  return Location.update({},
    { $unset: { internalId: false } },
    { multi: true, safe: true }
  ).then(() => {
  })
}

function removeMovie() {
  return Movieshow.update({},
    { $unset: { internalLocationIds: false } },
    { multi: true, safe: true }
  ).then(() => {
  })
}

function getRandom(array) {
  num = Math.floor(Math.random() * array.length)
  result = []
  for (i = 0; i < num; i++) {

    a = Math.floor(Math.random() * array.length)
    result.push(array[a])
  }
  return result
}


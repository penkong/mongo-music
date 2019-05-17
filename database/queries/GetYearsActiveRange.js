const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
  const minQuery = Artist
    .find({})
    .sort({ yearsActive: 1 })
    .limit(1) //after this is still bring {[]} must catch yearsActive from there.
    .then(artists => artists[0].yearsActive); //limit api for next time just bring us yearsActive

  const maxQuery = Artist
    .find({})
    .sort({ yearsActive: -1 })
    .limit(1) //after this is still bring {[]} must catch yearsActive from there.
    .then(artists => artists[0].yearsActive); //limit api for next time just bring us age

  return Promise.all([minQuery, maxQuery])
    .then(result => {
      return { min: result[0], max: result[1] };
    });
};

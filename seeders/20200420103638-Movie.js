'use strict';
let fs = require ('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync('./data/movies.json',"utf8"));
    let dataID = JSON.parse(fs.readFileSync('./data/productionhouseid.json',"utf8"));
    let dataRating = JSON.parse(fs.readFileSync('./data/rating.json',"utf8"));
    for(let i = 0 ; i < data.length ; i ++){
      data[i].createdAt = new Date()
      data[i].updatedAt = new Date()
      data[i].productionHouseId = dataID[i].productionHouseId
      data[i].rating = dataRating[i].rating
    } 
    return queryInterface.bulkInsert('Movies', data , {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Movies', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

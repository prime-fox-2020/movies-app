'use strict';
const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let moviesdata = JSON.parse(fs.readFileSync('./data/movies.json',"utf8"));
    for(let i = 0 ; i < moviesdata.length ; i ++){
      moviesdata[i].createdAt = new Date()
      moviesdata[i].updatedAt = new Date()
    } 
    return queryInterface.bulkInsert('Movies', moviesdata , {});
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

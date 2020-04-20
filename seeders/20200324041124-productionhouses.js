'use strict';
const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let PHdata = JSON.parse(fs.readFileSync('./data/productionhouses.json',"utf8"));
    for(let i = 0 ; i < PHdata.length ; i ++){
      PHdata[i].createdAt = new Date()
      PHdata[i].updatedAt = new Date()
    } 
    return queryInterface.bulkInsert('ProductionHouses', PHdata , {});
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
    return queryInterface.bulkDelete('ProductionHouses', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

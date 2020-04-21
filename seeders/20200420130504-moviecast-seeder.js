'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Casts', [{
    first_name: 'John',
    last_name: 'Doe',
    phone_number:'081234542321',
    birth_year:1980,
    gender:'male',
    createdAt:new Date(),
    updatedAt:new Date()
  },{
    first_name: 'Kurt',
    last_name: 'Angel',
    phone_number:'08123451111',
    birth_year:1985,
    gender:'male',
    createdAt:new Date(),
    updatedAt:new Date()
  },{
    first_name: 'Selena',
    last_name: 'Gomez',
    phone_number:'081234514212',
    birth_year:1990,
    gender:'female',
    createdAt:new Date(),
    updatedAt:new Date()
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Casts', null, {});
  }
};

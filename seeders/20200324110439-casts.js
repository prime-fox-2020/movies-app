'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Casts', 
    [
      {
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '08123456789',
        birth_year: 1972,
        gender : 'male',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Ken',
        last_name: 'Watanabe',
        phone_number: '08459612021',
        birth_year: 1972,
        gender : 'male',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Keanu',
        last_name: 'Reeves',
        phone_number: '08347125711',
        birth_year: 1972,
        gender : 'male',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],{});
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
    return queryInterface.bulkDelete('Casts', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

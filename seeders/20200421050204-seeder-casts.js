'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Casts', 
    [
      {
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '08012345',
        birth_year: 1950,
        gender: 'Male',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Brad',
        last_name: 'Pritt',
        phone_number: '08543210',
        birth_year: 1960,
        gender: 'Male',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Dian',
        last_name: 'Sastro',
        phone_number: '08888777',
        birth_year: 1970,
        gender: 'Female',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
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

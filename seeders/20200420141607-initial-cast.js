'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Casts', [
      {
        first_name: "James",
        last_name: "Bond",
        phone_number: "08987654321",
        birth_year: 1777,
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: "Jenny",
        last_name: "Lin",
        phone_number: "08123456789",
        birth_year: 1945,
        gender: "female",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: "Aditya",
        last_name: "Christo",
        phone_number: "08192837465",
        birth_year: 1990,
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Casts', null, {});
  }
};

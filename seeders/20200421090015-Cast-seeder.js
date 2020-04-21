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
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      birth_year: DataTypes.INTEGER,
      gender: DataTypes.STRING
    */
    return queryInterface.bulkInsert('Casts', [
      {
        first_name: 'Keanu',
        last_name:'Reeves',
        phone_number: '081313139999',
        birth_year: 1964,
        gender: 'male',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Laurence',
        last_name:'Fishburne',
        phone_number: '081313188999',
        birth_year: 1961,
        gender: 'male',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Agent',
        last_name:'Smith',
        phone_number: '081313139666',
        birth_year: 1960,
        gender: 'male',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Carrie-Anne',
        last_name:'Moss',
        phone_number: '081355139955',
        birth_year: 1967,
        gender: 'female',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Oracle',
        last_name: 'Postgres',
        phone_number: '081317779999',
        birth_year: 1933,
        gender: 'female',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

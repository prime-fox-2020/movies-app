'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Casts', [
    {
      first_name: 'Risky',
      last_name: 'Nugraha',
      phone_number: '0812345678',
      birth_year: 2010,
      gender: 'male',
      createdAt: new Date(),    
      updatedAt: new Date()    
    },
    {
      first_name: 'Arief',
      last_name: 'Rohman',
      phone_number: '0812357278',
      birth_year: 2011,
      gender: 'male',
      createdAt: new Date(),    
      updatedAt: new Date()    
    },
    {
      first_name: 'Fredie',
      last_name: 'Mercury',
      phone_number: '0812231278',
      birth_year: 2012,
      gender: 'male',
      createdAt: new Date(),    
      updatedAt: new Date()    
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Casts', null, {});
  }
};

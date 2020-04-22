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
    first_name:'Azis',
    last_name: 'Gagap',
    phone_number: '081125874458',
    birth_year: 1990,
    gender: 'Male',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    first_name:'Andre',
    last_name: 'Taulany',
    phone_number: '081125874458',
    birth_year: 1989,
    gender: 'Male',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    first_name:'Nunung',
    last_name: 'Aja',
    phone_number: '081125874458',
    birth_year: 1999,
    gender: 'Female',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
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

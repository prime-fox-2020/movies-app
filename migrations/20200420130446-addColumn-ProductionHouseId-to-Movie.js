'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Movies', 'ProductionHouseId', Sequelize.INTEGER );
    
    
    /*
    Add altering commands here.
    Return a promise to correctly handle asynchronicity.
    
    Example:
    return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    return queryInterface.addColumn('Movies', 'ProductionHouseId', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Movies', 'ProductionHouseId');

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

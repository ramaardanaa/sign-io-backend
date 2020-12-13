'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint ('Members', {
      fields: ['RoomId'],
      type: 'foreign key',
      name: 'fkey_RoomIdToMember',
      references: {
        table: 'Rooms',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint ('Members', 'fkey_RoomIdToMember')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

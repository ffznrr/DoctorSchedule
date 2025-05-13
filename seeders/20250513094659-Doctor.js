"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Doctors", [
      {
        name: "Dr. Fauzan Ramadhana",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ridwan Maulana S.Ked",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Doctors", null, {});
  },
};

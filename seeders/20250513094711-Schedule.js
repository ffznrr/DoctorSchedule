"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Schedules", [
      {
        day: "senin",
        time_start: "13:00",
        time_finish: "14:00",
        quota: 10,
        date: new Date(),
        status: true,
        doctorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        day: "selasa",
        time_start: "12:00",
        time_finish: "13:00",
        quota: 10,
        date: new Date(),
        status: true,
        doctorId: 2,
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
    await queryInterface.bulkDelete("Schedules", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};

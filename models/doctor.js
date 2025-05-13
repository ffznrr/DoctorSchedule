"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.hasMany(models.Schedule, {
        foreignKey: "doctorId",
      });
    }
  }
  Doctor.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "name is already to use",
        },
        validate: {
          notEmpty: {
            msg: "name Is Required",
          },
          is: {
            args: /^[A-Za-z\s]+$/i,
            msg: "name must not contain any symbols and numbers",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  return Doctor;
};

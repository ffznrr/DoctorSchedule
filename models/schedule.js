"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.Doctor, {
        foreignKey: "doctorId",
      });
    }
  }
  Schedule.init(
    {
      day: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Day Is Required",
          },
          notNull: {
            msg: "Day Is Required",
          },
        },
      },
      time_start: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Start Time Is Required",
          },
          notNull: {
            msg: "Start Time Is Required",
          },
        },
      },
      time_finish: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "End Time Is Required",
          },
          notNull: {
            msg: "End Time Is Required",
          },
        },
      },
      quota: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "End Time Is Required",
          },
          notNull: {
            msg: "End Time Is Required",
          },
        },
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Doctor Is Required",
          },
          notNull: {
            msg: "Doctor Is Required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );
  return Schedule;
};

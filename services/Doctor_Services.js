const { Doctor } = require("../models");

class DoctorServices {
  static async GetData(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const result = await Doctor.findAll({
      limit: limit,
      offset: offset,
    });
    const totalCount = await Doctor.count();
    return {
      result,
      totalCount,
    };
  }
}

module.exports = DoctorServices;

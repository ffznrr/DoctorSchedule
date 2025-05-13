const { Schedule, Doctor } = require("../models");

class ScheduleServices {
  static async GetData(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const [result, totalCount] = await Promise.all([
      Schedule.findAll({
        include: [
          {
            model: Doctor,
            required: true,
          },
        ],
        limit: limit,
        offset: offset,
      }),

      Schedule.count(),
    ]);

    return {
      result,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    };
  }
}

module.exports = ScheduleServices;

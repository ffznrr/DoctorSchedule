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

  static async CreateData(
    day,
    time_start,
    time_finish,
    quota = 10,
    date,
    doctorId,
    transaction
  ) {
    await Schedule.create(
      {
        day,
        time_start,
        time_finish,
        quota,
        date,
        doctorId,
      },
      {
        transaction: transaction,
      }
    );
  }

  static GetDatesInRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];

    let currentDate = start;

    while (currentDate <= end) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }
}

module.exports = ScheduleServices;

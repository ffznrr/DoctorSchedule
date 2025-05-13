const { Schedule, Doctor } = require("../models");

class ScheduleServices {
  static async GetData(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const [output, totalCount] = await Promise.all([
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

    const result = output.map((schedule) => ({
      id: schedule.id,
      doctor_id: schedule.doctorId,
      day: schedule.day,
      time_start: schedule.time_start,
      time_finish: schedule.time_finish,
      quota: schedule.quota,
      status: schedule.status,
      doctor_name: schedule.Doctor.name,
      date: schedule.date,
    }));

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
    status,
    doctorId,
    transaction
  ) {
    let thestats = status;
    await Schedule.create(
      {
        day,
        time_start,
        time_finish,
        quota,
        date,
        doctorId,
        status: thestats,
      },
      {
        transaction: transaction,
      }
    );
  }

  static ValidateTime(StartTime, EndTime, Range) {
    let start = Number(StartTime.split(":")[0]);
    let end = Number(EndTime.split(":")[0]);

    if (end <= start) {
      return false;
    }

    if (Range[1] < Range[0]) {
      return false;
    }
    return true;
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

const { sequelize } = require("../models");
const ScheduleServices = require("../services/Schedule_Services");

class Schedule {
  static async GetDataSchedule(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { result, totalCount, totalPages } = await ScheduleServices.GetData(
      page,
      limit
    );
    return res.status(200).json({
      message: "Success Fetch Data",
      data: result,
      totalCount: totalCount,
      totalPages: totalPages,
      currentPage: page,
      limit: limit,
    });
  }

  static async CreateDataSchedule(req, res, next) {
    const { time_start, time_finish, quota, date_range, doctorId, status } =
      req.body;

    const validation = ScheduleServices.ValidateTime(
      time_start,
      time_finish,
      date_range
    );

    if (!validation) throw { name: "Kesalahan Terdapat Di Pemilihan Waktu" };

    let result = ScheduleServices.GetDatesInRange(date_range[0], date_range[1]);
    const t = await sequelize.transaction();
    for (let i = 0; i < result.length; i++) {
      let day = new Date(result[i]).toLocaleDateString("id-ID", {
        weekday: "long",
      });
      let date = result[i];
      await ScheduleServices.CreateData(
        day,
        time_start,
        time_finish,
        quota,
        date,
        status,
        doctorId,
        t
      );
    }

    await t.commit();

    return res.status(200).json({
      message: "Jadwal berhasil dibuat untuk rentang tanggal yang diberikan.",
    });
  }
}

module.exports = Schedule;

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
}

module.exports = Schedule;

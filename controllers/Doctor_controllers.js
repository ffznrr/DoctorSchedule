const DoctorServices = require("../services/Doctor_Services");

class DoctorControllers {
  static async GetDataDoctor(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { result, totalCount } = await DoctorServices.GetData(page, limit);
      const totalPages = Math.ceil(totalCount / limit);
      return res.status(200).json({
        message: "Success Fetch Data",
        data: result,
        totalCount: totalCount,
        totalPages: totalPages,
        currentPage: page,
        limit: limit,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DoctorControllers;

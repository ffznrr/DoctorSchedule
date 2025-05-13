const DoctorServices = require("../services/Doctor_Services");

class DoctorControllers {
  static async GetDataDoctor(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { result, totalCount, totalPages } = await DoctorServices.GetData(
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
    } catch (error) {
      next(error);
    }
  }

  static async CreateDataDoctor(req, res, next) {
    try {
      const { name } = req.body;

      await DoctorServices.CreateData(name);
      return res.status(200).json({
        message: `Success Create Data New Doctor, ${name}`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DoctorControllers;

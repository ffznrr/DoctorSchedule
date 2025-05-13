const AuthServices = require("../services/Auth_Services");

class Authentication {
  static async Register(req, res, next) {
    try {
      const { username, password } = req.body;
      const Register = await AuthServices.RegisterServices(username, password);
      if (!Register) {
        return res.status(400).json({
          Message: `Create Account Failed`,
        });
      }
      return res.status(200).json({
        Message: `Success Create Acount`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async Login(req, res, next) {
    try {
      const { username, password } = req.body;
      const token = await AuthServices.LoginServices(username, password);
      return res.status(200).json({
        token,
        Message: "Login Success",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Authentication;

const { comparePass } = require("../helper/bcrypt");
const { sign } = require("../helper/jwt");
const { User } = require("../models");

class AuthServices {
  static async RegisterServices(username, password) {
    const findOne = await User.findOne({ where: { username } });
    if (findOne)
      return res.status(403).json({
        Message: "Username Sudah Ada",
      });

    const result = await User.create({
      username,
      password,
    });
    return result;
  }

  static async LoginServices(username, password) {
    const findOne = await User.findOne({ where: { username } });
    if (!findOne) {
      return res.status(403).json({
        Message: "Username/Password Salah",
      });
    }
    if (!comparePass(password, findOne.password)) {
      return res.status(403).json({
        Message: "Username/Password Salah",
      });
    }
    const payload = {
      id: findOne.id,
      name: findOne.username,
      role: findOne.role,
    };

    const token = sign(payload);
    return token;
  }
}

module.exports = AuthServices;

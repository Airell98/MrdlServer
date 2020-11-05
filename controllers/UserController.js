const { User } = require("../models");
const jwt = require("../helper/jwt");
const hashPass = require("../helper/hashPass");
const compareSync = require("../helper/compareBcrypt");
const { Op } = require("sequelize");
class UserController {
  static getAllUsers(req, res, next) {
    User.findAll({ order: [["id", "DESC"]] })
    .then((data) => {
      res.status(200).json({
        users: data,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  }

  static getUsersByRole(req, res, next) {
    const { role } = req.params;
    User.findAll({
      where: {
        role,
      },
      order: [["id", "DESC"]],
    })
      .then((data) => {
        res.status(200).json({
          users: data,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  //  mymail: {
  //   [Op.substring]: req.params.mymail
  // },
  static getOneUserByEmail(req, res, next) {
    User.findAll({
      where: {
        [Op.or]: [
          {
            mymail: {
              [Op.substring]: req.params.mymail,
            },
          },
          {
            firstname: {
              [Op.substring]: req.params.mymail,
            },
          },
        ],

        role: req.params.role,
      },
    })
      .then((data) => {
        res.status(200).json({
          user: data,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static findOneUser(req, res, next) {
    User.findOne({
      where: {
        id: Number(req.params.id),
      },
    })
      .then((user) => {
        res.status(200).json({
          user,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static userRegister(req, res, next) {
    const { firstname, lastname, mymail, mobile, domisili, batch } = req.body;
    // res.status(200).json(firstname);
    var result = "";
    var characters =
      "abcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    User.create({
      firstname,
      lastname,
      mymail,
      mobile,
      domisili,
      batch,
      role: "student",
      password: result,
      sts: "false",
      backup_password: result,
    })
      .then((data) => {
        res.status(201).json({
          user: data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  // static userRegister(req, res, next) {
  //   const {
  //     firstname,
  //     lastname,
  //     mymail,
  //     mobile,
  //     domisili,
  //     batch,
  //     password,
  //   } = req.body;

  //   User.create({
  //     firstname,
  //     lastname,
  //     mymail,
  //     mobile,
  //     domisili,
  //     sts,
  //     batch,
  //     role: "student",
  //     password,
  //     sts: "false",
  //   })
  //     .then((data) => {
  //       res.status(201).json({
  //         user: data,
  //       });
  //     })
  //     .catch((err) => {
  //       next(err);
  //     });
  // }

  static loginAdmin(req, res, next) {
   
    const { mymail, password } = req.body;

    User.findOne({
      where: {
        mymail:mymail.toLowerCase(),
      },
    })
      .then((user) => {
        if (
          !user ||
          !compareSync(password, user.password) ||
          user.role !== "SuperAdmin"
        ) {
          next({ name: "Admin Unrecognized" });
        } else {
          const token = jwt(user);
          res.status(200).json({
            access_token: token,
            user,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static loginUser(req, res, next) {
    const { mymail, password } = req.body;
    User.findOne({
      where: {
        mymail:mymail.toLowerCase(),
      },
    })
      .then((user) => {
        
        if (!user || !compareSync(password, user.password)) {
          next({ name: "Login Error" });
        } else {
          const token = jwt(user);
          res.status(200).json({
            access_token: token,
            user,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static changePassword(req, res, next) {
    const { id, password } = req.body;
    let hashPassword = hashPass(password);
    User.update(
      {
        backup_password: password,
        password: hashPassword,
      },
      {
        where: {
          id,
        },
      }
    )
      .then((data) => {
        return User.findOne({
          where: {
            id,
          },
        });
      })
      .then((userData) => {
        const token = jwt(userData);
        res.status(200).json({
          user: userData,
          access_token: token,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static edituserNameByID(req, res, next) {
    const { id, firstname } = req.body;
    User.update(
      {
        firstname,
      },
      {
        where: {
          id,
        },
      }
    )
      .then((data) => {
        res.status(200).json({
          msg: "berhasil mengupdate firstname user",
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static edituserStsByID(req, res, next) {
    const { id, sts } = req.body;
    User.update(
      {
        sts,
      },
      {
        where: {
          id,
        },
      }
    )
      .then((data) => {
        res.status(200).json({
          msg: "berhasil mengupdate sts user",
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static edituserEmailByID(req, res, next) {
    const { id, mymail } = req.body;
    User.update(
      {
        mymail,
      },
      {
        where: {
          id,
        },
      }
    )
      .then((data) => {
        res.status(200).json({
          msg: "berhasil mengupdate Email user",
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static edituserDomisiliByID(req, res, next) {
    const { id, domisili } = req.body;
    User.update(
      {
        domisili,
      },
      {
        where: {
          id,
        },
      }
    )
      .then((data) => {
        res.status(200).json({
          msg: "berhasil mengupdate domisili user",
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static edituserBatchByID(req, res, next) {
    const { id, batch } = req.body;
    User.update(
      {
        batch,
      },
      {
        where: {
          id,
        },
      }
    )
      .then((data) => {
        res.status(200).json({
          msg: "berhasil mengupdate batch user",
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static edituserPasswordByID(req, res, next) {
    const { id, backup_password } = req.body;
    User.update(
      {
        backup_password,
      },
      {
        where: {
          id,
        },
      }
    )
      .then((data) => {
        res.status(200).json({
          msg: "berhasil mengupdate sts user",
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteUser(req, res, next) {
    const { userID } = req.params;
    User.destroy({
      where: {
        id: userID,
      },
    })
      .then((data) => {
        res.status(200).json({
          user: data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;

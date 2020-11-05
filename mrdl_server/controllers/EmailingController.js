const { User, Video, Module } = require("../models");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const jwtSign = require("../helper/jwt");
const bcrypt = require("../helper/hashPass");
const nodemailer = require("nodemailer");
const hashPass = require("../helper/hashPass");
class EmailingController {
  static daftarManual(req, res, next) {
    const { fullName, email, domisili, batch, mobile } = req.body;
    var password = "";
    var characters = "abcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var j = 0; j < 10; j++) {
      password += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    User.create({
      firstname: fullName,
      domisili,
      mobile,
      mymail: email,
      sts: false,
      role: "student",
      password,
      batch:2,
      backup_password: password,
    })
      .then((data) => {
        return axios({
          url: "https://api.merryriana.com/api/mrdl/mail/youtube_register",
          method: "POST",
          data,
        });
      })
      .then((data) => {
        res.status(200).json({
          msg: "berhasil cuy",
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static emailRegister(req, res, next) {
    const { fullName, email, domisili, batch, mobile } = req.body;

    let splitFullname = fullName.split(", ");
    let splitEmail = email.split(", ");
    console.log(splitFullname);
    let counter = 0;
    for (let i = 0; i < splitFullname.length - 1; i++) {
      if (counter == splitFullname.length - 1) {
        break;
      } else {
        var password = "";
        var characters = "abcdefghijklmnopqrstuvwxyz";
        var charactersLength = characters.length;
        for (var j = 0; j < 10; j++) {
          password += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        User.create({
          firstname: splitFullname[i],
          domisili,
          mobile,
          mymail: splitEmail[i],
          sts: false,
          role: "student",
          password,
          batch:2,
          backup_password: password,
        })
          .then((data) => {
            return axios({
              url: "https://api.merryriana.com/api/mrdl/mail/youtube_register",
              method: "POST",
              data,
            });
          })
          .then((data) => {
            counter++;

            if (counter == splitFullname.length - 1) {
              res.status(200).json({
                msg: "berhasil cuy",
              });
              return;
            }
          })
          .catch((err) => {
            console.log("error dari emailing++++++");
            next(err);
          });
      }
    }
  }

  static async sendEmailRecoverPassword(req, res, next) {
    // console.log(process.env.EMAIL)

    try {
      let user = await User.findOne({ where: { mymail: req.body.mymail } });
      // let update = await User.update({password: hashPass(password)},{ where: { mymail: req.body.mymail } });

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: "myguitarworld", // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from:
          '"Merry Riana Youtube Academy" <mrdl.merryrianadigitallearning@gmail.com>', // sender address
        to: `${user.mymail}`, // list of receivers
        subject: "Recover Password", // Subject line
        text: "Merry Riana Youtube Academy", // plain text body
        html: `
          <div class="card mb-3" style="max-width: 540px; margin-left: auto; margin-right: auto; border: 5px solid #ae0001; border-radius:5%;">
          <div class="row no-gutters" style="text-align: center;">
              <div class="col-md-4" style="text-align: center;">
              <img src="http://m1salesforce.com/assets/img/mrdl/MRDL-Logo.jpg" class="logo-footer" style="height: 250px;">
              </div>
              <div class="col-md-8" style="text-align: center;">
                  <div class="card-body" style="text-align: center;">
                    <h4>Please click the link below to make a new password</h4>
                            <hr>
                            <a href="http://merryrianadigitallearning.com/#/new-password?access_token=${jwt.sign(
                              { id: user.id, mymail: user.mymail },
                              "MAMA"
                            )}">http://merryrianadigitallearning.com/#/new-password?access_token=${jwt.sign(
          { id: user.id, mymail: user.mymail },
          "MAMA"
        )}</a>
                   
                  </div>
              </div>
          </div>
      </div>
      <h6 style="color: grey; text-align: center;">© Merry Riana Digital Learning 2020. All rights reserved.</h6>
  `,
      });
      return res.status(200).json({
        msg: "berhasil",
      });
    } catch (err) {
      next(err);
    }
  }
  static sendPasswordFromAdmin(req, res, next) {
    var user = "";
    var password = "";
    var characters = "abcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var j = 0; j < 10; j++) {
      password += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }

    User.findOne({
      where: {
        id: Number(req.body.id),
      },
    })
      .then((data) => {
        user = data;
        return User.update(
          { password: hashPass(password) },
          { where: { id: data.id } }
        )
     
      }).then(response=>{
         return axios({
          url: "https://api.merryriana.com/api/mrdl/mail/youtube_register",
          method: "POST",
          data:{
            backup_password: password,
            mymail: user.mymail,
            firstname: user.firstname,
            lastname:user.lastname,
            mobile:user.mobile,
            batch:user.batch

          }
        });
      })
      .then((response) => {
        res.status(200).json({
          msg: "berhasil send email",
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  // static findOneUserEmail(req, res, next) {
  //   console.log(req.body, "+++++++++++++++++++++++++++++++");
  //   User.findOne({
  //     where: {
  //       mymail: req.body.mymail,
  //     },
  //   })
  //     .then((user) => {
  //       return axios({
  //         url: "https://merryriana-3616.restdb.io/mail",
  //         method: "post",
  //         headers: {
  //           "x-apikey": "f750eb10a3391081588f7b69b1189c57798c4",
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //         data: {
  //           // 'to': `${req.userData.email}`,
  //           sendername: "Merry Riana Youtube Academy",
  //           // company: "Merry Riana Digital Learning",
  //           to: user.mymail,
  //           subject: `Recover password`,
  //           html: `

  //                 <div class="card mb-3" style="max-width: 540px; margin-left: auto; margin-right: auto; border: 5px solid #ae0001; border-radius:5%;">
  //                     <div class="row no-gutters" style="text-align: center;">
  //                         <div class="col-md-4" style="text-align: center;">
  //                         <img src="http://m1salesforce.com/assets/img/mrdl/MRDL-Logo.jpg" class="logo-footer" style="height: 250px;">
  //                         </div>
  //                         <div class="col-md-8" style="text-align: center;">
  //                             <div class="card-body" style="text-align: center;">
  //                               <h4>Please click the link below to make a new password</h4>
  //                                       <hr>
  //                                       <a href="http://merryrianadigitallearning.com/#/new-password?access_token=${jwt.sign(
  //                                         { id: user.id, mymail: user.mymail },
  //                                         "MAMA"
  //                                       )}">http://merryrianadigitallearning.com/#/new-password?access_token=${jwt.sign(
  //             { id: user.id, mymail: user.mymail },
  //             "MAMA"
  //           )}</a>

  //                             </div>
  //                         </div>
  //                     </div>
  //                 </div>
  //                 <h6 style="color: grey; text-align: center;">© Merry Riana Digital Learning 2020. All rights reserved.</h6>
  //             `,
  //         },
  //       });
  //     })
  //     .then((data) => {
  //       res.status(200).json({
  //         msg: "berhasil",
  //       });
  //     })
  //     .catch((err) => {
  //       next(err);
  //     });
  // }

  static updatePassword(req, res, next) {
    let { password, access_token } = req.body;
    let userData = jwt.verify(access_token, "MAMA");
    const hash = bcrypt(password);

    User.update(
      {
        password: hash,
        backup_password: password,
      },
      {
        where: {
          id: userData.id,
        },
      }
    )
      .then((data) => {
        return User.findOne({
          where: {
            id: userData.id,
          },
        });
      })
      .then((dataUser) => {
        let api_token = jwtSign(dataUser);
        res.status(200).json({
          access_token: api_token,
          user: dataUser,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = EmailingController;

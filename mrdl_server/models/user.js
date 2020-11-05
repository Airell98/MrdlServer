"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const bcrypt = require("../helper/hashPass");
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Video, { through: models.SudahKah });
      User.hasMany(models.Record);
    }
  }
  User.init(
    {
      user_id: DataTypes.INTEGER,
      fighter_id: DataTypes.STRING,
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Firstname tidak boleh kosong",
          },
          notEmpty: {
            args: true,
            msg: "Firstname tidak boleh kosong",
          },
        },
      },
      lastname: {
        type: DataTypes.STRING,
        // allowNull: false,
        // validate:{
        //   notNull: {
        //     msg: "Lastname tidak boleh kosong",
        //   },
        //   notEmpty: {
        //     args: true,
        //     msg: "Lastname tidak boleh kosong",
        //   },
        // }
      },
      mymail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email tidak boleh kosong",
          },
          notEmpty: {
            args: true,
            msg: "Email tidak boleh kosong",
          },
          // emailanjing(mymail) {
          //   User.findAll({
          //     where: {
          //       mymail
          //     },
          //   })
          //     .then((data) => {
          //       if (data.length!=0) {
          //         throw new Error('Either both latitude and longitude, or neither!');
          //       }
          //     })
            
          // },
        },
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // notNull: {
          //   msg: "Nomor handphone tidak boleh kosong",
          // },
          // notEmpty: {
          //   args: true,
          //   msg: "Nomor handphone tidak boleh kosong",
          // },
          // duplicateMobile(mymail){
          //     User.findOne({where:{
          //       mymail
          //     }}).then(data=>{
          //       if(data){
          //         throw error("Nomor handphone ini sudah terpakai. Mohon coba dengan nomor handphone yang berbeda")
          //       }
          //     })
          // }
        },
      },
      email_verified: DataTypes.STRING,
      backup_password: DataTypes.STRING,
      tgl_member: DataTypes.DATE,
      tanggal_valid: DataTypes.DATE,
      img: DataTypes.TEXT,
      nama_toko: DataTypes.STRING,
      img_toko: DataTypes.TEXT,
      bank: DataTypes.STRING,
      no_rekening: DataTypes.STRING,
      nama_pemilik_rekening: DataTypes.STRING,
      img_verifikasi_number: DataTypes.TEXT,
      img_verifikasi_image: DataTypes.TEXT,
      no_identitas: DataTypes.STRING,
      domisili: DataTypes.STRING,
      referror: DataTypes.STRING,
      verifikasi: DataTypes.STRING,
      keterangan_penolakan_verifikasi: DataTypes.STRING,
      credit: DataTypes.STRING,
      level: DataTypes.STRING,
      sts: DataTypes.STRING,
      type: DataTypes.STRING,
      payment_status: DataTypes.STRING,
      kode_midtrans: DataTypes.STRING,
      voucher: DataTypes.STRING,
      api_token: DataTypes.TEXT,
      role: DataTypes.STRING,
      batch: DataTypes.INTEGER,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password tidak boleh kosong",
          },
          notEmpty: {
            args: true,
            msg: "Password tidak boleh kosong",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((instance, option) => {
    // let coba = new Date().toString();

    // let str = "";
    // counter = 0;
    // for (let i = 0; i < coba.length; i++) {
    //   if (counter == 4 && coba[i] == " ") {
    //     break;
    //   } else if (coba[i] == " ") {
    //     counter++;
    //     str += coba[i];
    //   } else {
    //     str += coba[i];
    //   }
    // }
    const hash = bcrypt(instance.password);
    instance.password = hash;
    // instance.tgl_member = str;
  });
  return User;
};

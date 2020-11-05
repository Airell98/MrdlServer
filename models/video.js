'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Video.hasMany(models.Record)
      Video.belongsTo(models.Module)
      Video.belongsToMany(models.User, { through: models.SudahKah });
    }
  };
  Video.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "name tidak boleh kosong",
        },
        notEmpty: {
          args: true,
          msg: "name tidak boleh kosong",
        },
      }
    },
    sts:  {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate:{
        notNull: {
          msg: "status tidak boleh kosong",
        },
        notEmpty: {
          args: true,
          msg: "status tidak boleh kosong",
        },
      }
    },
    ModuleId: DataTypes.INTEGER,
    video_link:  {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Link video tidak boleh kosong",
        },
        notEmpty: {
          args: true,
          msg: "Link video tidak boleh kosong",
        },
      }
    },
    part:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Part video tidak boleh kosong",
        },
        notEmpty: {
          args: true,
          msg: "Part video tidak boleh kosong",
        },
      }
    },
    desc:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Deskripsi video tidak boleh kosong",
        },
        notEmpty: {
          args: true,
          msg: "Deskripsi video tidak boleh kosong",
        },
      }
    },
    type: DataTypes.STRING,
    ppt_link: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};
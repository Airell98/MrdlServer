'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SudahKah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SudahKah.belongsTo(models.User, { sourceKey: 'id', foreignKey: "UserId" })
      SudahKah.belongsTo(models.Video, { sourceKey: 'id', foreignKey: "VideoId" })

    }
  };
  SudahKah.init({
    UserId: DataTypes.INTEGER,
    VideoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SudahKah',
  });
  return SudahKah;
};
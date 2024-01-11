'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rsvp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rsvp.belongsTo(models.Show, {
        foreignKey: 'showId',
      }),
      Rsvp.belongsTo(models.User, {
        foreignKey: 'userId',
      })
    }
  }
  Rsvp.init({
    showId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Rsvp',
  });
  return Rsvp;
};
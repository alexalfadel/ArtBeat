'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Show extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Show.belongsTo(models.User, {
        foreignKey: 'userId'
      }),
      Show.hasMany(models.ShowImage, {
        foreignKey: 'showId',
        onDelete: 'CASCADE',
        hooks: true
      })

    }
  }
  Show.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 100]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [24, 256]
      }
    },
    type: DataTypes.STRING,
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 256],
        isValid(address) {
          const splitAddress = address.split(' ');
          if (typeof Number(splitAddress[0]) !== 'number' || splitAddress.length < 2) {
            throw new Error ('Please enter a valid address');
          } 
        },
      }
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 100000
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Show',
  });
  return Show;
};
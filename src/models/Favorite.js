import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// A simple Favorite model to store userId and movieId.
const Favorite = sequelize.define(
  'Favorite',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'favorites',
    timestamps: true,
  }
);

export default Favorite;

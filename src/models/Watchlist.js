import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Watchlist = sequelize.define(
  'Watchlist',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id', // Maps model field userId to column user_id
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'movie_id', // Maps model field movieId to column movie_id
    },
  },
  {
    tableName: 'watchlist',
    timestamps: false,
    underscored: true, // If you prefer snake_case for auto-generated fields
  }
);

export default Watchlist;

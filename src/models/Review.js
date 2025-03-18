import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Review = sequelize.define(
  'Review',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id', // maps to column "user_id"
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'movie_id', // maps to column "movie_id"
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'reviews',
    timestamps: true, // adds created_at and updated_at
    underscored: true,
  }
);

export default Review;

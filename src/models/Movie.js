import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Movie = sequelize.define(
  'Movie',
  {
    title: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    year: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    rating: { 
      type: DataTypes.FLOAT, 
      allowNull: false 
    },
    bakedscale: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
  },
  {
    tableName: 'movies',
    timestamps: false,
  }
);

export default Movie;

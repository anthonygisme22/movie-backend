import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER
  },
  rating: {
    type: DataTypes.REAL
  },
  bakedscale: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'movies',
  timestamps: false
});

export default Movie;

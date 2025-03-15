// src/models/Watchlist.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Movie from './Movie.js';

const Watchlist = sequelize.define('Watchlist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  movieTitle: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'watchlist',
  timestamps: false
});

export default Watchlist;

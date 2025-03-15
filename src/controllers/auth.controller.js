// src/controllers/auth.controller.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Email already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Logged in', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getProfile(req, res) {
  try {
    const user = await User.findByPk(req.userId, { attributes: { exclude: ['password'] } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = req.userId;
    const { username, email } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();
    res.json({ message: 'Profile updated', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile' });
  }
}

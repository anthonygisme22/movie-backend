import User from '../models/User.js';

export async function getProfile(req, res) {
  try {
    // The token's payload only has req.user.id, so we fetch from DB
    const userId = req.user.id;
    // Grab just the fields you need, excluding the password
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email'],
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = req.user.id;
    const { username, email } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    await user.save();

    // Return updated fields
    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
}

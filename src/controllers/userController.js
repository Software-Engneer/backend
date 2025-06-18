import { store } from '../data/store.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = store.users.getAll();
    res.json({ data: users });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = store.users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = store.users.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await store.users.create(req.body);
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await store.users.update(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const success = await store.users.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
}; 
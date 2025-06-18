import bcrypt from 'bcrypt';

// In-memory data store
let users = [
  {
    id: '1',
    firstname: 'Admin',
    lastname: 'User',
    email: 'admin@example.com',
    password: '$2b$10$EpK0aMPT7jC2cqwkxHJIj.OgJqD1T1UEe4DxGpg1FHfnhXCqgC2Hy', // admin123
    role: 'admin',
    created_at: new Date().toISOString()
  }
];

export const store = {
  users: {
    getAll: () => [...users],
    findByEmail: (email) => users.find(u => u.email === email),
    findById: (id) => users.find(u => u.id === id),
    create: async (userData) => {
      const id = (users.length + 1).toString();
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = {
        id,
        ...userData,
        password: hashedPassword,
        role: userData.role || 'user',
        created_at: new Date().toISOString()
      };
      users.push(newUser);
      const { password, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    },
    update: (id, userData) => {
      const index = users.findIndex(u => u.id === id);
      if (index === -1) return null;
      
      // If password is being updated, hash it
      if (userData.password) {
        userData.password = bcrypt.hashSync(userData.password, 10);
      }
      
      users[index] = { ...users[index], ...userData };
      const { password, ...userWithoutPassword } = users[index];
      return userWithoutPassword;
    },
    delete: (id) => {
      const index = users.findIndex(u => u.id === id);
      if (index === -1) return false;
      users.splice(index, 1);
      return true;
    },
    validatePassword: async (user, password) => {
      return bcrypt.compare(password, user.password);
    }
  }
}; 
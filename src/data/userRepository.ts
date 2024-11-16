export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  createdAt?: Date;
}

// Mock user data
const users: User[] = [
  {
    id: 1,
    username: "admin",
    password: "HASH-123456",
    email: "admin@acme.com",
    createdAt: new Date("1995-12-17T03:24:00"),
  },
  {
    id: 2,
    username: "user",
    password: "HASH-password",
    email: "user@acme.com",
    createdAt: new Date("2022-11-14T03:11:00"),
  },
];

export const getUserByUsername = async (username: string) => {
  // TODO: This is hardcoded as an example.
  //  In a real application, you should check the credentials against a database.
  // Simulate a database lookup
  return users.find((user) => user.username === username) || null;
};

export const saveUser = async (user: User): Promise<User> => {
  // TODO: This is hardcoded as an example.
  // mock save user to database

  return await {
    id: users.length + 1,
    password: user.password,
    username: user.username,
    email: user.email,
    createdAt: new Date(Date.now()),
  };
};

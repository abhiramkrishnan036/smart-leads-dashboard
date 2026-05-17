import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

// Temporary user storage
const users: any[] = [];

export const registerUser = async (data: RegisterData) => {
  const { name, email, password } = data;

  const existingUser = users.find(
    (user) => user.email === email
  );

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id },
    process.env.JWT_SECRET || "secretkey",
    {
      expiresIn: "7d",
    }
  );

  return {
    success: true,
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  };
};

export const loginUser = async (
  data: LoginData
) => {
  const { email, password } = data;

  const user = users.find(
    (user) => user.email === email
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordMatch) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || "secretkey",
    {
      expiresIn: "7d",
    }
  );

  return {
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};
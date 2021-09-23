import { JsonWebTokenError } from "jsonwebtoken";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

export const signup = async (): Promise<string[]> => {
  const user = {
    email: "test@test.dev",
    password: "password",
  };
  const response = await request(app)
    .post("/api/users/signup")
    .send(user)
    .expect(201);
  const cookie = response.get("Set-Cookie");
  return cookie;
};

interface signinInterface {
  userId?: string
}
export const signin = (userId = 'userId1'): string[] => {
  const user = {
    id: userId,
    email: "test@test.dev",
    password: "password",
  };
  const token = jwt.sign(user, process.env.JWT_KEY!);
  const session = {jwt: token}
  const sessionJSON = JSON.stringify(session)
  const base64 = Buffer.from(sessionJSON).toString('base64')
  
  return [`session=${base64}`]
};
import request from "supertest";
import { app } from "../app";

export const signup = async () => {
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

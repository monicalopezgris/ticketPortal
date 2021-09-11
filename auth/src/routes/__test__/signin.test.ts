import request from "supertest";
import { app } from "../../app";
import { signup } from "../../test/authHelper";

it("should return 400 if the user doesn't exist", () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.dev",
      password: "password",
    })
    .expect(400);
});

it("should return 200 if correct signin", async () => {
  await signup();
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.dev",
      password: "password",
    })
    .expect(200);
});

it("should set cookie", async () => {
  await signup();
  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.dev",
      password: "password",
    })
    .expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
});

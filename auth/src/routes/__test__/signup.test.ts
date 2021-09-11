import request from "supertest";
import { app } from "../../app";

it("should return 201 if correct signup", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.dev",
      password: "password",
    })
    .expect(201);
});

it("should return 400 if incorrect email", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.dev",
      password: "password",
    })
    .expect(400);
});

it("should return 400 if incorrect password", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.dev",
      password: "pas",
    })
    .expect(400);
});

it("should return 400 if missing data", async () => {
  await request(app).post("/api/users/signup").send({}).expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.dev" })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({ password: "password" })
    .expect(400);
});

it("should return 400 if duplicated emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.dev",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.dev",
      password: "password2",
    })
    .expect(400);
});

it("should set cookie", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.dev",
      password: "password",
    })
    .expect(201);
  expect(response.get("Set-Cookie")).toBeDefined();
});

import request from "supertest";
import { app } from "../../app";
import { signup } from "../../test/authHelper";

it("should return null current user", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);
  expect(response.body.currentUser).toBeNull;
});

it("should get the email form current user", async () => {
  const cookie = await signup();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual("test@test.dev");
});

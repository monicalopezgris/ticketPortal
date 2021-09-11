import request from "supertest";
import { app } from "../../app";
import { signup } from "../../test/authHelper";

it("should delete cookie after signout", async () => {
  await signup();
  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);
  expect(response.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});

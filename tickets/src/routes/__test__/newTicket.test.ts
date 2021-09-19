import request from "supertest";
import { app } from "../../app";

describe("Tickets", () => {
  it("should not response with a 404 error", async () => {
    const res = await request(app).post("/api/tickets").send({});
    expect(res.status).not.toEqual(404);
  });
  it("should be accessible only if you are logged in", async () => {});
  it("should creat a new ticket", async () => {});
});

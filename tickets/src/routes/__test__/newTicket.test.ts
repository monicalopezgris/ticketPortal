import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/authHelper";

describe("Tickets", () => {
  it("should not response with a 404 error", async () => {
    const res = await request(app).post("/api/tickets").send({});
    expect(res.status).not.toEqual(404);
  });
  it("should be accessible only if you are logged in", async () => {
    const res = await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({});
    console.log(res.body);
    expect(res.status).not.toEqual(404);
  });
  it("should return error if title is not provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
        title: "",
        price: 20,
      })
      .expect(400);
    await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
        price: 20,
      })
      .expect(400);
  });
  it("should return error if price is not provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
        title: "titleTicket",
      })
      .expect(400);
    await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
        title: "titleTicket",
        price: -20,
      })
      .expect(400);
  });
  it("should creat a new ticket", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
        title: "TicketTitle",
        price: 20,
      })
      .expect(200);
  });
});

import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import mongoose from 'mongoose';
import { signin } from "../../test/authHelper";

describe("Get ticket", () => {
  it("should not response with a 404 error", async () => {
  const id = 'testid'
    const res = await request(app).get(`/api/tickets/${id}`).send({});
    expect(res.status).not.toEqual(404);
  });
  it("should return 400 if there is no ticket", async () => {
const id = 'testid'

    await request(app)
      .get(`/api/tickets/${id}`)
      .set("Cookie", signin())
      .expect(400);
  });
  it("should return the ticket", async () => {
    
    const ticket ={
      title: 'title',
      price:15
    }

    const res = await request(app)
      .post('/api/tickets')
      .set('Cookie', signin())
      .send(ticket)
      .expect(201);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${res.body.id}`)
      .expect(200);

    expect(ticketResponse.body.title).toEqual(ticket.title);
    expect(ticketResponse.body.price).toEqual(ticket.price);
  });
});

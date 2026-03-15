import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080");

describe("Adoptions Router Test", () => {

  it("GET /api/adoptions debe devolver adopciones", async () => {

    const response = await request.get("/api/adoptions");

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("payload");
    expect(response.body.payload).to.be.an("array");

  });

  it("POST /api/adoptions debe responder", async () => {

    const response = await request
      .post("/api/adoptions")
      .send({});

    expect(response.status).to.be.oneOf([200,400,500]);

  });

  it("GET /api/adoptions/:id debe responder", async () => {

    const response = await request.get("/api/adoptions/123456789012");

    expect(response.status).to.be.oneOf([200,400,404,500]);

  });

});
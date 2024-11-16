import request from "supertest";
import app from "../app";
import { config } from "../config";
import { apiRoutes } from "../routes/apiRoutes";
import { generateToken } from "../utils/jwtUtils";

const validToken = "Bearer " + generateToken({ username: "admin" });

describe("API: Notify", () => {
  it("should respond to POST  with status code 403 forbidden if no authorization send", async () => {
    await request(app)
      .post(config.apiEntryPoint + apiRoutes.notify)
      .expect(401);
  });

  it("should respond to POST  with status code 200  if valid authorization is used", async () => {
    await request(app)
      .post(config.apiEntryPoint + apiRoutes.notify)
      .set("Authorization", validToken)
      .expect(200);
  });
});

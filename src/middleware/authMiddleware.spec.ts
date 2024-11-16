import request from "supertest";
import { describe, it, expect, vi } from "vitest";
import { verifyToken, messages } from "./authMiddleware";
import app from "../app";
import jwt from "jsonwebtoken";

// Mock environment variable for the JWT secret
vi.mock("jsonwebtoken");

describe("authenticateJWT Middleware", () => {
  // Protected route for testing
  app.get("/protected", verifyToken, (req, res) => {
    res.status(200).json({ message: "Protected content", user: req.user });
  });

  it("should return 403 if no Authorization header is provided", async () => {
    const response = await request(app).get("/protected");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(messages.tokenRequired);
  });

  it("should return 401 if the Authorization header is malformed", async () => {
    const response = await request(app)
      .get("/protected")
      .set("Authorization", "invalid-token");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(messages.authMalformed);
  });

  it("should return 403 if the token is invalid or has expired", async () => {
    // Mock jwt.verify to throw an error for invalid tokens
    vi.spyOn(jwt, "verify").mockImplementation(() => {
      throw new Error("Invalid token");
    });

    const response = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(403);
    expect(response.body.message).toBe(messages.invalidCredentials);

    // Restore the original implementation
    vi.restoreAllMocks();
  });

  it("should pass the middleware and return protected content if token is valid", async () => {
    const mockUser = { id: 1, name: "John Doe" };
    // Mock jwt.verify to return a decoded token
    vi.spyOn(jwt, "verify").mockImplementation(() => mockUser);
    const token = "valid-token";

    const response = await request(app)
      .get("/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Protected content",
      user: mockUser,
    });

    // Restore the original implementation
    vi.restoreAllMocks();
  });
});

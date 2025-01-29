import request from "supertest";
import express from "express";
import router from "../routes/authentification";  
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jest } from "@jest/globals";
import { verifyToken } from "../routes/authentification";  

const app = express();
app.use(express.json());
app.use("/", router);

describe("Auth Routes and Helpers", () => {

  describe("Auth Routes", () => {
    it("should register a new user", async () => {
      const res = await request(app)
        .post("/register")
        .send({ name: 'DariaTest', password: 'password123' });
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Account created successfully!");
    });

    it("should return error for existing user registration", async () => {
      const res = await request(app)
        .post("/register")
        .send({ name: "testuser", password: "password123" });
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("User with this name already exists.");
    });

    it("should reject login with incorrect credentials", async () => {
      const res = await request(app)
        .post("/login")
        .send({ name: "TestUser", password: "WrongPassword" });
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Invalid credentials.");
    });
  });

  describe("Auth Helpers", () => {
    const mockUser = { id: 1, name: "TestUser" };
    const secret = "testsecret";

    it("should generate a valid access token", () => {
      const token = jwt.sign(mockUser, secret, { expiresIn: "15m" });
      const decoded = jwt.verify(token, secret);
      expect(decoded.name).toBe(mockUser.name);
    });

    it("should hash and verify passwords correctly", async () => {
      const password = "TestPassword123";
      const hashedPassword = await bcrypt.hash(password, 10);
      const isMatch = await bcrypt.compare(password, hashedPassword);
      expect(isMatch).toBe(true);
    });

    it("should reject invalid tokens in verifyToken", () => {
      const req = { headers: { authorization: "Bearer invalidToken" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid credentials."
      });

      expect(next).not.toHaveBeenCalled();
    });
  });
});

import { Router } from "express";
import { createUser, getUser, updateUser, deleteUser } from "./Controller.js";

const router = Router();

// Create User
router.post("/data", createUser);

// Get User by Email
router.get("/data/:email", getUser);

// Update User by Email
router.put("/data/:email", updateUser);

// Delete User by Email
router.delete("/data/:email", deleteUser);

export default router;

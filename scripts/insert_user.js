#!/usr/bin/env node
import bcrypt from "bcryptjs";
import { AuthRepository } from "../models/AuthRepository.js";
import { userPool } from "../config/db.js";

async function run() {
  const username = process.argv[2] || "user";
  const password = process.argv[3] || "password";

  try {
    const existing = await AuthRepository.getUserByUsername(userPool, username);
    if (existing) {
      console.log("User already exists:", existing.username);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(password, 10);
    const id = await AuthRepository.createUser(userPool, {
      username,
      password: hashed,
      role_id: 1,
    });
    console.log("Inserted user", username, "id:", id);
    process.exit(0);
  } catch (err) {
    console.error("Error inserting user:", err);
    process.exit(1);
  }
}

run();

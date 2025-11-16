// scripts/ensure-env.cjs
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env");
const examplePath = path.join(__dirname, "..", ".env.example");

// If .env already exists, nothing to do
if (fs.existsSync(envPath)) {
  console.log("[ensure-env] .env already exists, skipping.");
  process.exit(0);
}

// Make sure .env.example exists
if (!fs.existsSync(examplePath)) {
  console.error("[ensure-env] .env.example is missing. Cannot create .env.");
  process.exit(1);
}

// Read .env.example
let content = fs.readFileSync(examplePath, "utf8");

// If PAYLOAD_SECRET is still the placeholder, replace it with a dev secret
if (content.includes("PAYLOAD_SECRET=YOUR_SECRET_HERE")) {
  const crypto = require("crypto");
  const secret = crypto.randomBytes(24).toString("hex");
  content = content.replace(
    "PAYLOAD_SECRET=YOUR_SECRET_HERE",
    `PAYLOAD_SECRET=${secret}`
  );
}

// Write .env
fs.writeFileSync(envPath, content);
console.log("[ensure-env] Created .env from .env.example");
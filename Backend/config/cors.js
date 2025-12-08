import cors from "cors";

export function createCorsConfig() {
  // Allow all origins (all IPs / all domains)
  const options = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };

  return cors(options);
}

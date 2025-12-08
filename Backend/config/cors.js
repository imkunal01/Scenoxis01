import cors from "cors";

export function createCorsConfig() {
  return cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  });
}

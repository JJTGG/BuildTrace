import type { HealthResponse } from "@buildtrace/contracts";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/health", (context) => {
  const response: HealthResponse = {
    status: "ok",
    service: "buildtrace-api",
    timestamp: new Date().toISOString(),
  };

  return context.json(response);
});

const portValue = process.env.PORT ?? "3001";
const port = Number(portValue);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`Invalid PORT value: ${portValue}`);
}

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`BuildTrace API listening on port ${info.port}`);
  },
);

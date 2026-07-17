import { logError } from "./logger";
import { errorResponse } from "./api-errors";

export function handleServerError(
  endpoint: string,
  operation: string,
  error: unknown
) {
  logError(endpoint, operation, error);

  return errorResponse(
    500,
    "INTERNAL_SERVER_ERROR",
    "An unexpected error occurred."
  );
}
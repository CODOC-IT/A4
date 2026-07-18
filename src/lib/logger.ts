export function logError(
  endpoint: string,
  operation: string,
  error: unknown
) {
  console.error({
    timestamp: new Date().toISOString(),
    endpoint,
    operation,
    error: error instanceof Error ? error.message : String(error),
  });
}
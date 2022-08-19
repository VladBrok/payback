export class PaybackError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = "PaybackError";
    this.cause = cause;
  }
}

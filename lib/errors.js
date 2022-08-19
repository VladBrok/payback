export class PaybackError extends Error {
  constructor(message) {
    super(message);
    this.name = "PaybackError";
  }
}

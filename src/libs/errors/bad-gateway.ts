export class BadGatewayError extends Error {
  code: number;

  constructor(message: string) {
    super(message);
    this.code = 502;
  }
}
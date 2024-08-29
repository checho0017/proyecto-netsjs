export class HttpBusinessError extends Error {
  code: number;
  detail: string;

  constructor(message: string, detail: string) {
    super(message);
    this.code = 409;
  }
}
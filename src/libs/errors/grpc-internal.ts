export class GrpcInternalError extends Error {
  code: number;

  constructor(message: string) {
    super(message);
    this.code = 13;
  }
}
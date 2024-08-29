export class GrpcNotFoundEntityError extends Error {
  code: number;

  constructor(message: string) {
    super(message);
    this.code = 5;
  }
}
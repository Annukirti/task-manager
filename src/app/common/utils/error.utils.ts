export class ResponseError extends Error {
  override name = "ResponseError";
  constructor(
    public status: number,
    message: string,
    public errorCode?: number
  ) {
    super(message);
  }
}

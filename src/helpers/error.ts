// SWRで取得したエラーの型付け処理
export class HttpError extends Error {
  public readonly status: number;
  constructor(props: { status: number; message: string }) {
    super(props.message);
    this.status = props.status;
  }
}

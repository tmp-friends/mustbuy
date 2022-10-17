export class ExtractedTweet {
  public readonly id: string;

  public constructor(props: { id: string }) {
    const { id } = props;

    this.id = id;
  }
}

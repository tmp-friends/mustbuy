export class LikedTweets {
  public readonly id: string
  public readonly text: string

  public constructor(props: { id: string, text: string }) {
    const {id, text} = props

    this.id = id
    this.text = text
  }
}

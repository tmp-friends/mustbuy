import Twitter, { TweetV2UserLikedTweetsPaginator } from "twitter-api-v2";
import type { NextApiRequest, NextApiResponse } from "next";
import { LikedTweets } from '../../domain/liked-tweets'

const searchConditions1 = "#芸カ27"
const searchConditions2 = "#芸カ27お品書き"

const token = process.env.TWITTER_APP_USER_TOKEN ?? ""
const twitterClient = new Twitter(token)

const hundler = async (
  req: NextApiRequest,
  res: NextApiResponse
  ) => {
    const userId = await getUserId()
    const tweets = await getLikedTweetsByUserId(userId)

    console.log(tweets)
    res.status(200).json(tweets)
}

const getUserId = async (): Promise<string> => {
  const userData = await twitterClient.v2.userByUsername("temple_circle")
  const userId = userData.data.id

  return userId
}

const getLikedTweetsByUserId = async (userId: string): Promise<LikedTweets[]> => {
  const likedTweetsData = await twitterClient.v2.userLikedTweets(userId)
  const likedTweets = likedTweetsData._realData.data

  return extractTweets(likedTweets)
}

const extractTweets = (tweets: any): LikedTweets[] => {
  const extractedTweets = tweets.filter((tweet: any) => {
    if (tweet.text.includes(searchConditions1) || tweet.text.includes(searchConditions2)) {
      return new LikedTweets({
        id: tweet.id,
        text: tweet.text
      })
    }
  })

  return extractedTweets
}

export default hundler

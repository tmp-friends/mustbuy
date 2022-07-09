import Twitter, { TweetV2UserLikedTweetsPaginator } from "twitter-api-v2";
import type { NextApiRequest, NextApiResponse } from "next";

const token = process.env.TWITTER_APP_USER_TOKEN ?? "";
const twitterClient = new Twitter(token);

const hundler = async (
  req: NextApiRequest,
  res: NextApiResponse
  ) => {
    const userId = await getUserId()
    const tweets = await getLikedTweetsByUserId(userId)

    // TODO: 取得したツイートのtextに"芸カ27" or "芸カ27お品書き"が含まれているものを抽出

    res.status(200).json({name: tweets})
}

const getUserId = async (): Promise<string> => {
  const userData = await twitterClient.v2.userByUsername("temple_circle")
  const userId = userData.data.id

  return userId
}

const getLikedTweetsByUserId = async (userId: string): Promise<TweetV2UserLikedTweetsPaginator> => {
  const likedTweets = await twitterClient.v2.userLikedTweets(userId)

  return likedTweets
}

export default hundler

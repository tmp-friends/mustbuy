import Twitter, { TweetV2UserLikedTweetsPaginator } from "twitter-api-v2";
import type { NextApiRequest, NextApiResponse } from "next";
import { LikedTweets } from "../../domain/liked-tweets";

const searchConditions1 = "#芸カ27";
const searchConditions2 = "#芸カ27お品書き";

const token = process.env.TWITTER_APP_USER_TOKEN ?? "";
const twitterClient = new Twitter(token).readOnly;

const hundler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;
  try {
    const userId = await getUserId(name);
    const tweets = await getLikedTweets(userId);

    console.log(tweets);

    res.status(200).json({
      tweets: tweets,
    });
  } catch (error: any) {
    // Custom error - 短時間で頻繁にアクセスしたとき
    if (error.code === 429 || error.status === 429) {
      return error.status(404).json({ message: error.message });
    }
    res.json({
      tweets: [],
    });
  }
};

const getUserId = async (
  name: string | string[] | undefined
): Promise<string> => {
  if (typeof name !== "string") {
    throw new Error("User not found");
  }
  const userData = await twitterClient.v2.userByUsername(name);
  const userId = userData.data.id;

  return userId;
};

const getLikedTweets = async (userId: string): Promise<LikedTweets[]> => {
  const likedTweets = await twitterClient.v2.userLikedTweets(userId);

  return extractTweets(likedTweets);
};

const extractTweets = (
  tweets: TweetV2UserLikedTweetsPaginator
): LikedTweets[] => {
  const extractedTweets = tweets._realData.data.filter(
    (tweet: TweetV2UserLikedTweetsPaginator) => {
      if (
        tweet.text.includes(searchConditions1) ||
        tweet.text.includes(searchConditions2)
      ) {
        return new LikedTweets({
          id: tweet.id,
        });
      }
    }
  );

  return extractedTweets;
};

export default hundler;

import Twitter, { TweetV2UserLikedTweetsPaginator } from "twitter-api-v2";
import type { NextApiRequest, NextApiResponse } from "next";
import { FetchedTweet } from "./types/fetched-tweet";
import { ExtractedTweet } from "../../domain/extracted-tweet";

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
      tweets,
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

const getLikedTweets = async (userId: string): Promise<ExtractedTweet[]> => {
  const fetchedTweets = await twitterClient.v2.userLikedTweets(userId);

  return extractTweets(fetchedTweets);
};

const extractTweets = (
  fetchedTweets: TweetV2UserLikedTweetsPaginator
): ExtractedTweet[] => {
  if (!fetchedTweets) {
    throw new Error("LikedTweet not found");
  }

  const extractedTweets = fetchedTweets._realData.data.filter(
    (tweet: FetchedTweet) =>
      tweet.text.includes(searchConditions1) ||
      tweet.text.includes(searchConditions2)
  );

  return extractedTweets.map((tweet: FetchedTweet) => {
    return new ExtractedTweet({ id: tweet.id });
  });
};

export default hundler;

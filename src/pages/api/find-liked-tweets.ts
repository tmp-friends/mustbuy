import { TwitterApi, TweetV2UserLikedTweetsPaginator } from "twitter-api-v2";
import type { NextApiRequest, NextApiResponse } from "next";
import { FetchedTweet } from "./types/fetched-tweet";
import { ExtractedTweet } from "../../domain/extracted-tweet";

const searchConditions1 = "#芸カ27";
const searchConditions2 = "#芸カ27お品書き";

const token = process.env.TWITTER_APP_USER_TOKEN ?? "";
const twitterClient = new TwitterApi(token).readOnly;

/**
 * @remarks
 * ユーザ名から直近100件のいいねしたツイートを取得し、
 * 取得したツイートの中から検索語の含むツイートを返す処理
 *
 * @param req - APIRoutesへのRequest情報
 * @returns res - APIRoutesからのResponse情報
 */
const hundler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;
  try {
    const userId = await getUserId(name);
    const fetchedTweets = await findLikedTweets(userId);
    const tweets = extractTweets(fetchedTweets);

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

/**
 * @remarks
 * ユーザ名からユーザIDを取得する処理
 *
 * @param name - ユーザ名 ex.temple_circle
 * @returns userId - ユーザID
 */
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

/**
 * @remarks
 * ユーザIDからいいねツイート(直近100件)を取得する処理
 *
 * @param userId - ユーザID
 * @returns fetchedTweets - いいねツイート
 */
const findLikedTweets = async (
  userId: string
): Promise<TweetV2UserLikedTweetsPaginator> => {
  const fetchedTweets = await twitterClient.v2.userLikedTweets(userId);

  return fetchedTweets;
};

/**
 * @remarks
 * 特定の検索語にマッチするいいねツイートのみに絞り込む処理
 *
 * @param fetchedTweets - いいねツイート
 * @returns 絞り込んだいいねツイート
 */
// TODO:
// fetchedTweetsをTweetV2UserLikedTweetsPaginator型にすると、
// _realDataがPrivateなためbuildエラーとなる
const extractTweets = (fetchedTweets: any): ExtractedTweet[] => {
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

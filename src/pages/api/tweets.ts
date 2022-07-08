import Twitter, { UserV2Result } from "twitter-api-v2";
import type { NextApiRequest, NextApiResponse } from "next";

const token = process.env.TWITTER_APP_USER_TOKEN ?? "";
const twitterClient = new Twitter(token);

const hundler = async (
  req: NextApiRequest,
  res: NextApiResponse
  ) => {
    const tweet = await test()

    res.status(200).json({name: tweet})
}

const test = async (): Promise<UserV2Result> => {
  const name = await twitterClient.v2.userByUsername("temple_circle")

  return name
}

export default hundler

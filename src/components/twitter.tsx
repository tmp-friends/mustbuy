import { FC } from "react";
import { SimpleGrid, Text } from "@chakra-ui/react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { ExtractedTweet } from "../domain/extracted-tweet";

export const tweets: FC<ExtractedTweet[]> = (tweets: ExtractedTweet[]) => {
  if (!tweets.length) {
    return (
      <Text fontWeight="semibold" align="center">
        LikedTweets not found
      </Text>
    );
  }
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={4}>
      {tweets.map((tweet: any, key: number) => (
        <TwitterTweetEmbed key={key} tweetId={tweet.id} />
      ))}
    </SimpleGrid>
  );
};

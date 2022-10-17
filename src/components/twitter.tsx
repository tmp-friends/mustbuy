import { FC } from "react";
import { SimpleGrid, Text } from "@chakra-ui/react";
import { TwitterTweetEmbed } from "react-twitter-embed";

export const tweets: FC = (tweets?) => {
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

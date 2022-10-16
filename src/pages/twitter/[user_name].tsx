import { Box, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { TwitterTweetEmbed } from "react-twitter-embed";

const TwitterUserName: NextPage = () => {
  const router = useRouter();
  const name = router.query.user_name ?? "";

  const fetcher = (url: string): Promise<any> =>
    fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`/api/tweets?name=${name}`, fetcher);

  if (error) return <Box>Failed to load</Box>;
  if (!data) return <Box>Now Loading...</Box>;

  return (
    <>
      <Text fontSize="md" pb={4}>
        @{name} さんの いいねしたツイート
      </Text>
      {/* useEffectはレンダリングされたタイミングで実行されるので初期値がnullだとエラー */}
      {/* TODO: dataに型付けする */}
      {data.tweets.length ? (
        data.tweets.map((value: any, index: number) => {
          return <TwitterTweetEmbed key={index} tweetId={`${value.id}`} />;
        })
      ) : (
        <Box>LikedTweets not found</Box>
      )}
    </>
  );
};

export default TwitterUserName;
